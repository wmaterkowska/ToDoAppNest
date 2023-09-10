import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfigProvider } from "./DatabaseConfigProvider";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: async (configService: DatabaseConfigProvider) => {
        const dbConfig = await configService.createDatabaseConfig();
        return {
          type: 'postgres',
          host: dbConfig.dbUrl,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.dbName,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [DatabaseConfigProvider],
    }),
  ],
})

export class DatabaseModule { }