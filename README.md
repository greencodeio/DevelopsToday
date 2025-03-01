# Country Info App
This project is a back-end solution for the Country Info App test assessment. It provides endpoints to retrieve country data and add national holidays to a user's calendar. The project is built using NestJS, TypeScript, and TypeORM for PostgreSQL. PostgreSQL is deployed via Docker Compose.

# Installation
Clone the Repository:

git clone <repository-url>
cd DevelopsToday

# Install Dependencies:

npm install

# Configure Environment Variables:

Create a .env file in the project root. See Environment Variables below.

# Environment Variables
Create a .env file in the project root with the following content:

## Application
* PORT=3000

## External API URLs
* NAGER_API_BASE_URL=https://date.nager.at/api/v3
* COUNTRIESNOW_API_BASE_URL=https://countriesnow.space/api/v0.1

## Database (PostgreSQL)
* DB_HOST=localhost
* DB_PORT=5432
* DB_USERNAME=your_db_user
* DB_PASSWORD=your_db_password
* DB_DATABASE=country_info_db

# Database Migrations
This project uses TypeORM for database management. Migrations are managed via a static configuration file (ormconfig.js) used by the TypeORM CLI.

## Create a Migration:

### To generate a migration based on changes in your entities, run:

`npm run db:make:migration ./migrations/name`

### Run Migrations:

`npm run db:run:migrations`

### Revert a Migration:

`npm run db:make:rollback`

# Running the Application
## Start PostgreSQL via Docker Compose:

* Ensure Docker is running, then start the PostgreSQL container: `docker-compose up -d`
* Start the NestJS Application: `npm run start:dev`

The application will start on the port defined in your .env file (default is 3000).

# API Endpoints
1. Get Available Countries
   Endpoint: GET /countries
   Description: Returns a list of available countries fetched from the Nager API.
2. Get Country Info
   Endpoint: GET /countries/:countryCode
   Description: Returns detailed information for the specified country, including border countries, population data, and flag URL.
3. Add National Holidays to Calendar
   Endpoint: POST /users/:userId/calendar/holidays

## Request Body Example:

`{
"countryCode": "US",
"year": 2025,
"holidays": ["New Year's Day", "Independence Day"]
}`

**Description:** Fetches public holidays for the specified country and year from the Nager API, filters them if needed, and saves them in the user's calendar in the database.
