import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

interface DatabaseConfig {
  dbHost: string;
  dbPort: number;
  dbUrl: string;
  dbName: string;
  username: string;
  password: string;
}

@Injectable()
export class DatabaseConfigProvider {
  constructor(private readonly configService: ConfigService) { }

  async createDatabaseConfig(): Promise<DatabaseConfig> {
    const dbHost = await this.configService.get<string>('DATABASE_HOST');
    const dbPort = await this.configService.get<number>('DATABASE_PORT');
    const dbUrl = await this.configService.get<string>('DATABASE_URL');
    const dbName = await this.configService.get<string>('DATABASE_NAME');
    const username = await this.configService.get<string>('DATABASE_USERNAME');
    const password = await this.configService.get<string>('DATABASE_PASSWORD');

    return {
      dbHost,
      dbPort,
      dbUrl,
      dbName,
      username,
      password,
    };
  }
}
