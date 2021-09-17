import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PresenceModel } from "../models/presence.model";


@Injectable()
export class PresenceRepository {

  constructor(
    @InjectRepository(PresenceModel)
    private presenceRepository: Repository<PresenceModel>
  ) { }

  async create(data: PresenceModel): Promise<PresenceModel> {
    try {
      const newPresence = this.presenceRepository.create(data);

      await this.presenceRepository.save(newPresence);
      const createdPresence = await this.presenceRepository.findOneOrFail(newPresence.id);

      return createdPresence;
    } catch {
      throw new Error(`Wasn't possible to create a new presence`)
    }
  }

  async findAll(
    limit: number,
    skip: number,
    orderBy: string,
    order: string,
    presencedate: string,
  ): Promise<{ presences: PresenceModel[], total: number }> {
    try {
      const where = [];

      where.push({
        ...(presencedate ? { presencedate: presencedate } : {}),
      });

      const result = await this.presenceRepository.findAndCount({
        take: limit,
        skip,
        order: {
          [orderBy]: order
        },
        where,
        relations: ["course"],
      });
      return { presences: result[0], total: result[1] };
    } catch {
      throw new Error(`Wasn't possible to list presences`);
    }
  }

  async findOne(id: string): Promise<PresenceModel> {
    try {
      return await this.presenceRepository.findOneOrFail(id, {
        relations: ["course"],
      });
    } catch {
      throw new NotFoundException(
        `Wasn't possible to find a presence with the given id`
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.presenceRepository.delete(id);
      return;
    } catch {
      throw new Error(`Wasn't possible remove the presence with the given id`);
    }
  }
}