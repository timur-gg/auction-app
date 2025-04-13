// apps/rest-api/src/upload/upload.service.ts
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Unit } from '../units/entities/unit.entity';
import { File } from './entities/file.entity';

interface FileUploadResult {
  id: string;
  name: string;
  url: string;
  entityId: string;
  entityType: string;
}

@Injectable()
export class UploadService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(UploadService.name);

  constructor(
    private configService: ConfigService,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {
    // Initialize Supabase client with credentials from environment variables
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_KEY')
    );
  }

  /**
   * Upload files to Supabase Storage and associate them with an entity
   */
  async uploadAndAssociateFiles(
    files: Express.Multer.File[],
    entityId: string,
    entityType: 'project' | 'unit' | 'user'
  ): Promise<FileUploadResult[]> {
    try {
      // Verify entity exists
      const entity = await this.verifyEntityExists(entityId, entityType);

      const bucket = 'files';
      const path = `${entityType}/${entityId}`;

      // Upload files to Supabase
      const uploadedFiles = await this.uploadFiles(files, bucket, path);

      // Store file references in database
      const results = await Promise.all(
        uploadedFiles.map(async (uploadedFile) => {
          // Create file record
          const file = new File();
          file.name = uploadedFile.name;
          file.url = uploadedFile.url;
          file.mimeType = files.find(f => uploadedFile.name.includes(f.originalname))?.mimetype || 'application/octet-stream';
          file.size = files.find(f => uploadedFile.name.includes(f.originalname))?.size || 0;

          // Save file entity
          const savedFile = await this.fileRepository.save(file);

          // Associate file with entity
          await this.associateFileWithEntity(savedFile, entity, entityType);

          return {
            id: savedFile.id,
            name: savedFile.name,
            url: savedFile.url,
            entityId,
            entityType,
          };
        })
      );

      return results;
    } catch (error) {
      this.logger.error('Error uploading and associating files:', error);
      throw error;
    }
  }

  /**
   * Upload files to Supabase Storage
   */
  private async uploadFiles(
    files: Express.Multer.File[],
    bucket: string,
    path: string
  ): Promise<Array<{ name: string; url: string }>> {
    try {
      const uploadResults = await Promise.all(
        files.map(async (file) => {
          const fileName = `${path}/${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;

          const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(fileName, file.buffer, {
              contentType: file.mimetype,
              upsert: true,
            });

          if (error) {
            this.logger.error(`Upload failed for ${fileName}:`, error);
            throw error;
          }

          // Get public URL for the file
          const { data: urlData } = this.supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

          return {
            name: fileName,
            url: urlData.publicUrl,
          };
        })
      );

      return uploadResults;
    } catch (error) {
      this.logger.error('Error uploading files:', error);
      throw error;
    }
  }

  /**
   * Verify that the entity exists in the database
   */
  private async verifyEntityExists(
    entityId: string,
    entityType: 'project' | 'unit' | 'user'
  ): Promise<User | Project | Unit> {
    try {
      let entity;

      switch (entityType) {
        case 'project':
          entity = await this.projectRepository.findOne({ where: { id: entityId } });
          break;
        case 'unit':
          entity = await this.unitRepository.findOne({ where: { id: entityId } });
          break;
        case 'user':
          entity = await this.userRepository.findOne({ where: { id: entityId } });
          break;
      }

      if (!entity) {
        throw new BadRequestException(`${entityType} with ID ${entityId} not found`);
      }

      return entity;
    } catch (error) {
      this.logger.error(`Error verifying entity ${entityType} with ID ${entityId}:`, error);
      throw error;
    }
  }

  /**
   * Associate a file with an entity and update entity's files array
   */
  private async associateFileWithEntity(
    file: File,
    entity: User | Project | Unit,
    entityType: 'project' | 'unit' | 'user'
  ): Promise<void> {
    try {
      switch (entityType) {
        case 'project':
          const project = entity as Project;
          if (!project.documents) {
            project.documents = [];
          }
          project.documents.push(file.url);
          await this.projectRepository.save(project);
          break;
        case 'unit':
          const unit = entity as Unit;
          if (!unit.documents) {
            unit.documents = [];
          }
          unit.documents.push(file.url);
          await this.unitRepository.save(unit);
          break;
        case 'user':
          const user = entity as User;
          if (!user.documents) {
            user.documents = [];
          }
          user.documents.push(file.url);
          await this.userRepository.save(user);
          break;
      }
    } catch (error) {
      this.logger.error(`Error associating file ${file.id} with ${entityType} ${entity.id}:`, error);
      throw error;
    }
  }
}
