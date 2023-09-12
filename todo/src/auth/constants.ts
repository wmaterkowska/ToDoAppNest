import { ConfigService } from "@nestjs/config"

const config: ConfigService = new ConfigService();

export const jwtConstants = {
  secret: config.get('SECRET')
}