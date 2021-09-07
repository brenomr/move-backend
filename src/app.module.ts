import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      entities: [join(__dirname, '**', '*.entity*{.ts,.js}')],
      migrations: [join(__dirname, '**', '/migrations/*{.ts,.js}')],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
