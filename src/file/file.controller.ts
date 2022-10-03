import { Controller, HttpCode, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService){}

    @Post('upload')
    @ApiTags('files')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file'))

    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: { // 👈 this property
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    
    async uploadFile(
      @UploadedFile() file: Express.Multer.File,
      @Query('folder') folder?: string,
    ) {
      return this.fileService.saveFiles([file], folder)
    }
  }
  
