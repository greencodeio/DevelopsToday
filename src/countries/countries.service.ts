import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CountriesService {
  nagerBaseUrl = this.configService.get<string>('nagerApiBaseUrl');
  countriesNowBaseUrl = this.configService.get<string>('countriesNowApiBaseUrl');

  constructor(private readonly configService: ConfigService) {
  }

  async getAvailableCountries() {
    const url = `${this.nagerBaseUrl}/AvailableCountries`;

    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCountryByCode(countryCode: string) {
    try {
      const countryInfoUrl = `${this.nagerBaseUrl}/CountryInfo/${countryCode}`;
      const { data: countryInfo } = await axios.get(countryInfoUrl);

      const countryPopulationUrl = `${this.countriesNowBaseUrl}/countries/population`;
      const { data: populationData } = await axios.post(countryPopulationUrl, { country: countryInfo.commonName });

      const countryFlagUrl = `${this.countriesNowBaseUrl}/countries/flag/images`;
      const { data: flagData } = await axios.post(countryFlagUrl, { country: countryInfo.commonName });

      return {
        name: countryInfo.name,
        population: populationData,
        flag: flagData,
      };
    } catch (error) {
      throw error;
    }
  };
}
