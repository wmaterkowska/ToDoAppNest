import { ConfigService } from '@nestjs/config';
interface DatabaseConfig {
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
