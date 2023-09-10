import { ConfigService } from '@nestjs/config';
interface DatabaseConfig {
    dbHost: string;
    dbPort: number;
    dbUrl: string;
    dbName: string;
    username: string;
    password: string;
}
export declare class DatabaseConfigProvider {
    private readonly configService;
    constructor(configService: ConfigService);
    createDatabaseConfig(): Promise<DatabaseConfig>;
}
export {};
