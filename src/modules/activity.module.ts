import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from 'src/controllers/activity.controller';
import { ActivityModel } from 'src/infra/models/activity.model';
import { ActivityRepository } from 'src/infra/repositories/activity.repository';
import { ActivityService } from 'src/services/activity.service';


@Module({
  imports: [TypeOrmModule.forFeature([ActivityModel])],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository]
})
export class ActivityModule { }
