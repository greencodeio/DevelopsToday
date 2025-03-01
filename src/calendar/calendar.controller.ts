import { Body, Controller, Param, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('users')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {
  }

  @Post(':userId/calendar/holidays')
  async addHolidaysToCalendar(
    @Param('userId') userId: string,
    @Body() body: { countryCode: string; year: number; holidays?: string[] },
  ) {
    const { countryCode, year, holidays } = body;
    return this.calendarService.createEventInCalendar(userId, countryCode, year, holidays);
  }
}
