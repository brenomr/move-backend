import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';
import { UserModel } from 'src/infra/models/user.model';
import { UserRepository } from 'src/infra/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule { }
