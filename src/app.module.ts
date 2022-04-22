import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), YoutubeModule],
})
export class AppModule {}
