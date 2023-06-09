import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('/api')

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://wordskills-courses-frontend.vercel.app',
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  });
  
  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Item API')
      .setDescription('The api docs for the web-application')
      .addBearerAuth({ in: 'header', type: 'http' })
      .build());

    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(4001)

}
bootstrap();
