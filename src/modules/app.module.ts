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
import { CourseModule } from './course.module';
import { TrainingModule } from './training.module';
import { UserModule } from './user.module';
import { PresenceModule } from './presence.module';
import { AuthModule } from './auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      url: process.env.DATABASE_URL || process.env.TYPEORM_URL,
      entities: [join(__dirname, '..', '**', '*.model*{.ts,.js}')],
      migrations: [join(__dirname, '..', '**', '/migrations/*{.ts,.js}')],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
    }),
    ActivityModule,
    AssessmentModule,
    AuthModule,
    CourseModule,
    ExerciseModule,
    PresenceModule,
    StudentModule,
    TrainingModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ],
})
export class AppModule { }
