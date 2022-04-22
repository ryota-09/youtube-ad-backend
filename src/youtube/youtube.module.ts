import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping/scraping.service';
import { ApiService } from './api/api.service';
import { DbService } from './db/db.service';
import { DomainService } from './domain/domain.service';
import { ScheduleService } from './schedule/schedule.service';
import { PrismaService } from '@/prisma.service';

@Module({
  providers: [
    ScrapingService,
    ApiService,
    DbService,
    DomainService,
    ScheduleService,
    PrismaService,
  ],
})
export class YoutubeModule {}
