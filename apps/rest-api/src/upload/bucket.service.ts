import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class BucketService {
  private readonly logger = new Logger(BucketService.name);
  private readonly bucketName = 'auction';
  private bucket: AWS.S3;

  constructor(private configService: ConfigService) {
    this.bucket = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
      endpoint: this.configService.get('AWS_ENDPOINT'),
      s3ForcePathStyle: true, // Required for local S3 (like s3rver)
    });
  }

  async uploadFile(
    file: Buffer,
    path: string,
    fileName: string,
    contentType: string,
  ): Promise<{ name: string; url: string }> {
    const fullPath = `${path}/${fileName}`;
    try {
      await this.bucket
        .putObject({
          Bucket: this.bucketName,
          Key: fullPath,
          Body: file,
          ContentType: contentType,
        })
        .promise();

      const url = `${this.configService.get('AWS_ENDPOINT')}/${
        this.bucketName
      }/${fullPath}`;
      this.logger.log(`File uploaded successfully: ${url}`);
      return { name: fileName, url };
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
      throw error;
    }
  }

  async deleteFile(path: string): Promise<void> {
    try {
      await this.bucket
        .deleteObject({
          Bucket: this.bucketName,
          Key: path,
        })
        .promise();

      this.logger.log(`File deleted successfully: ${path}`);
    } catch (error) {
      this.logger.error(`Failed to delete file: ${error.message}`);
      throw error;
    }
  }
}
