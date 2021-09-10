import { Injectable } from '@nestjs/common';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { UserDTO } from 'src/dtos/user.dto';
import { UserResponseDTO } from 'src/dtos/user.response.dto';
import { UserUpdateDTO } from 'src/dtos/user.update.dto';
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

  async findAll(
    pagination: PaginationDTO,
    name: string,
    email: string,
    phone: string,
  ) {
    
    const limit = Number(pagination.limit) > 10 ? 10 : Number(pagination.limit);
    const page = Number(pagination.page)

    const skip = (page - 1) * limit;
    const orderBy = pagination.orderBy ? pagination.orderBy : 'name';
    const order = pagination.order.toLocaleUpperCase()

    const { users, total } = await this.userRepository.findAll(
      limit,
      skip,
      orderBy,
      order,
      name,
      email,
      phone,
    );

    const data = autoMapper(UserResponseDTO, users);
    
    return { data, total };
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
