import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {
  }

  @Get()
  async getAvailableCountries() {
    return await this.countriesService.getAvailableCountries();
  }

  @Get(':countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    return await this.countriesService.getCountryByCode(countryCode);
  }
}
