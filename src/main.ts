import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    validationError: {
      target: true,
      value: true
    }
  }));

  const config = new DocumentBuilder()
    .setTitle('Move API')
    .setDescription('API para aplicação Move, trabalho de conclusão da Fatec, 2º semestre 2021')
    .setVersion('1.0')
    .addTag('Move')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
