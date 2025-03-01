import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendar } from '../entities/calendar.entity';
import { CalendarRepository } from '../repositories/calendar.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Calendar])],
  controllers: [CalendarController],
  providers: [CalendarService, CalendarRepository],
  exports: [CalendarService],
})
export class CalendarModule {}
