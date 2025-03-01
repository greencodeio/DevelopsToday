import { Injectable } from '@nestjs/common';
import { CalendarRepository } from '../repositories/calendar.repository';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Calendar } from '../entities/calendar.entity';

@Injectable()
export class CalendarService {
  nagerBaseUrl = this.configService.get<string>('nagerApiBaseUrl');

  constructor(private readonly configService: ConfigService, private readonly calendarRepo: CalendarRepository) {
  }

  async createEventInCalendar(userId: string, countryCode: string, year: number, eventsToFilter?: string[]) {
    const eventUrl = `${this.nagerBaseUrl}/PublicHolidays/${year}/${countryCode}`;
    const { data: holidays } = await axios.get(eventUrl);

    const filteredEvents = !eventsToFilter
      ? holidays
      : this.filterEvents(eventsToFilter, holidays)

    const eventsData: Partial<Calendar>[] = filteredEvents.map((holiday: any) => ({
      userId,
      date: holiday.date,
      localName: holiday.localName,
      name: holiday.name,
      countryCode,
    }));


    await this.calendarRepo.createEvents(eventsData);

    const calendar = await this.calendarRepo.getEventsByUserId(userId);
    return { userId, savedHolidays: filteredEvents, calendar };
  }

  private filterEvents (eventsToFilter: string[], holidays: string[]) {
    const filterSet = new Set(eventsToFilter);
    return holidays.filter(({ localName, name }: any) => filterSet.has(localName) || filterSet.has(name));
  }
}
