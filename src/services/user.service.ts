import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';
import { UserResponseDTO } from 'src/dtos/user.response.dto';
import { UserUpdateDTO } from 'src/dtos/usuario.update.dto';
import { UserModel } from 'src/infra/models/user.model';
import { UserRepository } from 'src/infra/repositories/user.repository';
import { autoMapper } from 'src/utils/autoMapper';


@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async create(userDTO: UserDTO) {
    const newUser = autoMapper(UserModel, userDTO, false);
    
    const savedUser = await this.userRepository.create(newUser);

    return autoMapper(UserResponseDTO, savedUser);
  }

  async findAll() {
    // Adicionar paginação
    return await this.userRepository.findAll();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, userUpdateDTO: UserUpdateDTO) {
    await this.findOne(id);

    const userToUpdate = autoMapper(UserModel, userUpdateDTO, false);

    const updatedUser = await this.userRepository.update(id, userToUpdate);

    return updatedUser;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.userRepository.remove(id);

    return;
  }
}
