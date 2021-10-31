import { autoMapper } from 'src/utils/autoMapper';
import { Injectable } from '@nestjs/common';
import { PaginationDTO } from 'src/dtos/pagination.dto';
import { PresenceRepository } from 'src/infra/repositories/presence.repository';
import { PresenceDTO } from 'src/dtos/presence.dto';
import { PresenceModel } from 'src/infra/models/presence.model';
import { PresenceResponseDTO } from 'src/dtos/presence.response.dto';


@Injectable()
export class PresenceService {

  constructor(
    private readonly presenceRepository: PresenceRepository
  ) {}

  async create(presenceDTO: PresenceDTO) {
    const newPresence = autoMapper(PresenceModel, presenceDTO, false);
    
    const savedPresence = await this.presenceRepository.create(newPresence);

    return autoMapper(PresenceResponseDTO, savedPresence);
  }

  async findAll(
    pagination: PaginationDTO,
    presencedate: string,
  ) {
    
    // const limit = Number(pagination.limit) > 10 ? 10 : Number(pagination.limit);
    const limit = 200;
    const page = Number(pagination.page)

    const skip = (page - 1) * limit;
    const orderBy = pagination.orderBy ? pagination.orderBy : 'presencedate';
    const order = pagination.order.toLocaleUpperCase()

    const { presences, total } = await this.presenceRepository.findAll(
      limit,
      skip,
      orderBy,
      order,
      presencedate,
    );

    const data = autoMapper(PresenceResponseDTO, presences);
    
    return { data, total };
  }

  async findOne(id: string) {
    const presence = await this.presenceRepository.findOne(id);
    return autoMapper(PresenceResponseDTO, presence);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.presenceRepository.remove(id);

    return;
  }
}
