import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresenceController } from 'src/controllers/presence.controller';
import { PresenceModel } from 'src/infra/models/presence.model';
import { PresenceRepository } from 'src/infra/repositories/presence.repository';
import { PresenceService } from 'src/services/presence.service';


@Module({
  imports: [TypeOrmModule.forFeature([PresenceModel])],
  controllers: [PresenceController],
  providers: [PresenceService, PresenceRepository]
})
export class PresenceModule { }
