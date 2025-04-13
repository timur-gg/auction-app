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
  private readonly bucketName = 'auction';

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
    // For development environments, disable SSL verification
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');


    console.log(`Supabase URL: ${supabaseUrl}`, `Supabase Key: ${supabaseKey}`);

    // Create client with simpler configuration
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.logger.log(`Supabase client initialized for bucket: ${this.bucketName}`);

    // Test bucket access immediately
    this.testBucketAccess();
  }

  private async testBucketAccess() {
    try {
      const { data, error } = await this.supabase.storage.getBucket(this.bucketName);
      if (error) {
        this.logger.error(`Cannot access bucket "${this.bucketName}": ${error.message}`);
      } else {
        this.logger.log(`Successfully connected to bucket "${this.bucketName}"`);
      }
    } catch (err) {
      this.logger.error(`Error testing bucket access: ${err.message}`);
    }
  }

  async uploadAndAssociateFiles(
    files: Express.Multer.File[],
    entityId: string,
    entityType: 'project' | 'unit' | 'user'
  ): Promise<FileUploadResult[]> {
    const entity = await this.verifyEntityExists(entityId, entityType);
    const path = `${entityType}/${entityId}`;

    try {
      const uploadedFiles = await this.uploadFiles(files, path);

      return Promise.all(
        uploadedFiles.map(async (uploadedFile) => {
          const file = new File();
          file.name = uploadedFile.name;
          file.url = uploadedFile.url;
          file.mimeType = files.find(f => uploadedFile.name.includes(f.originalname))?.mimetype || 'application/octet-stream';
          file.size = files.find(f => uploadedFile.name.includes(f.originalname))?.size || 0;

          const savedFile = await this.fileRepository.save(file);
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
    } catch (error) {
      this.logger.error(`Upload process failed: ${error.message}`);
      throw error;
    }
  }

  private async uploadFiles(
    files: Express.Multer.File[],
    path: string
  ): Promise<Array<{ name: string; url: string }>> {
    return Promise.all(
      files.map(async (file) => {
        try {
          const fileName = `${path}/${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;

          // Log before upload attempt
          this.logger.log(`Attempting to upload ${fileName} to ${this.bucketName}`);

          const { data, error } = await this.supabase.storage
            .from(this.bucketName)
            .upload(fileName, file.buffer, {
              contentType: file.mimetype,
              upsert: true,
            });

          if (error) {
            this.logger.error(`Upload failed: ${error.message}`);
            throw new Error(`Supabase upload error: ${error.message}`);
          }

          this.logger.log(`File uploaded successfully: ${fileName}`);

          // Get public URL for the file
          const { data: urlData } = this.supabase.storage
            .from(this.bucketName)
            .getPublicUrl(fileName);

          return {
            name: fileName,
            url: urlData.publicUrl,
          };
        } catch (err) {
          this.logger.error(`Error in file upload: ${err.message}`);
          throw err;
        }
      })
    );
  }

  private async verifyEntityExists(
    entityId: string,
    entityType: 'project' | 'unit' | 'user'
  ): Promise<User | Project | Unit> {
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
  }

  private async associateFileWithEntity(
    file: File,
    entity: User | Project | Unit,
    entityType: 'project' | 'unit' | 'user'
  ): Promise<void> {
    switch (entityType) {
      case 'project':
        const project = entity as Project;
        if (!project.documents) project.documents = [];
        project.documents.push(file.url);
        await this.projectRepository.save(project);
        break;
      case 'unit':
        const unit = entity as Unit;
        if (!unit.documents) unit.documents = [];
        unit.documents.push(file.url);
        await this.unitRepository.save(unit);
        break;
      case 'user':
        const user = entity as User;
        if (!user.documents) user.documents = [];
        user.documents.push(file.url);
        await this.userRepository.save(user);
        break;
    }
  }
}
