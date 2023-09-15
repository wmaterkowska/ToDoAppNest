import { Module } from "@nestjs/common";
import { DatabaseConfigProvider } from "./DatabaseConfigProvider";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IsUniqueContraint } from "src/shared/UniqueValidation";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: async (configService: DatabaseConfigProvider) => {
        const dbConfig = await configService.createDatabaseConfig();
        return {
          type: 'postgres',
          host: dbConfig.dbHost,
          port: dbConfig.dbPort,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.dbName,
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        };
      },
      inject: [DatabaseConfigProvider],
    }),
  ],
  exports: [DatabaseModule, DatabaseConfigProvider],
  providers: [DatabaseConfigProvider, IsUniqueContraint],
})

export class DatabaseModule { }