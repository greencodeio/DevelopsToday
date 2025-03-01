import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from '../entities/calendar.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CalendarRepository {
  constructor(
    @InjectRepository(Calendar)
    private readonly calendarRepo: Repository<Calendar>,
  ) {
  }

  async createEvents(events: Partial<Calendar>[]): Promise<Calendar[]> {
    const calendarEvents = this.calendarRepo.create(events);

    return await this.calendarRepo.save(calendarEvents);
  }

  async getEventsByUserId(userId: string): Promise<Calendar[]> {
    return await this.calendarRepo.findBy({ userId });
  }
}