// apps/rest-api/src/upload/upload.controller.ts
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import 'multer';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('files')
  @ApiOperation({ summary: 'Upload files for projects, units, or users' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Files to upload (max 10 files, 5MB each)',
        },
        entityId: {
          type: 'string',
          description: 'ID of the project, unit or user',
        },
        entityType: {
          type: 'string',
          enum: ['project', 'unit', 'user'],
          description: 'The type of entity the files belong to',
        },
      },
      required: ['files', 'entityId', 'entityType'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Files uploaded and associated successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'The file ID in database' },
          name: { type: 'string', description: 'The file name in storage' },
          url: { type: 'string', description: 'The public URL of the file' },
          entityId: {
            type: 'string',
            description: 'ID of the associated entity',
          },
          entityType: {
            type: 'string',
            description: 'Type of the associated entity',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file format, size or entity',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Upload failed' })
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB max
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|pdf|doc|docx|xls|xlsx)$/,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Body() body: { entityId: string; entityType: 'project' | 'unit' | 'user' },
  ) {
    const { entityId, entityType } = body;
    return this.uploadService.uploadAndAssociateFiles(
      files,
      entityId,
      entityType,
    );
  }
}
