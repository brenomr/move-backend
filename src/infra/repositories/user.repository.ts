import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Not, Repository } from "typeorm";
import { UserModel } from "../models/user.model";


@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>
  ) {}

  async create(data: UserModel): Promise<UserModel> {
    try {
      const newUser = this.userRepository.create(data);

      await this.userRepository.save(newUser);

      return newUser;
    } catch {
      throw new Error(`Wasn't possible to create a new user`)
    }
  }

  async findAll(
    limit: number,
    skip: number,
    orderBy: string,
    order: string,
    name: string,
    email: string,
    phone: string,
  ): Promise<{ users: UserModel[], total: number }> {
    try{
      const where = [];

      where.push({
        ...(name ? { name: ILike(`%${name}%`) } : {}),
        ...(email ? { email: ILike(`%${email}%`) } : {}),
        ...(phone ? { phone: ILike(`%${phone}%`) } : {}),
      });

      const result = await this.userRepository.findAndCount({
        take: limit,
        skip,
        order: {
          [orderBy]: order
        },
        where,
      });
      return { users: result[0], total: result[1] };
    } catch {
      throw new Error(`Wasn't possible to list users`);
    }
  }

  async findOne(id: string): Promise<UserModel> {
    try{
      return await this.userRepository.findOneOrFail(id);
    } catch {
      throw new NotFoundException(
        `Wasn't possible to find an user with the given id`
      );
    }
  }

  async update(id: string, data: UserModel): Promise<UserModel> {
    try {
      await this.userRepository.update(id, data);
      return this.userRepository.findOneOrFail(id);
    } catch {
      throw new Error(`Wasn't possible to update the given user`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
      return;
    } catch {
      throw new Error(`Wasn't possible remove the user with the given id`);
    }
  }

  async checkCref(cref: string, id?: string): Promise<number> {
    try {
      const where = [];

      where.push({
        ...(cref && id ? { id: Not(id), cref: cref } : { cref: cref }),
      })
      return await this.userRepository.count({ where });
    } catch {
      throw new Error(`Could not find a CREF`);
    }
  }
}