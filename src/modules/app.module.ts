import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ActivityModule } from './activity.module';
import { AssessmentModule } from './assessment.module';
import { ExerciseModule } from './exercise.module';
import { StudentModule } from './student.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [join(__dirname, '..', '**', '*.model*{.ts,.js}')],
      migrations: [join(__dirname, '..', '**', '/migrations/*{.ts,.js}')],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
    }),
    ActivityModule,
    AssessmentModule,
    ExerciseModule,
    StudentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
