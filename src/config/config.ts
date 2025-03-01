export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nagerApiBaseUrl: process.env.NAGER_API_BASE_URL,
  countriesNowApiBaseUrl: process.env.COUNTRIESNOW_API_BASE_URL,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});
