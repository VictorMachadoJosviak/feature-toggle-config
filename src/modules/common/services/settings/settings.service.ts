import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

const configSchema = z.object({
  REDIS_HOST: z.string({
    required_error: 'env REDIS_HOST is missing check your .env file',
  }),
});

type ConfigType = z.infer<typeof configSchema>;

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.getConfig();
  }

  private getConfig() {
    const config: ConfigType = {
      REDIS_HOST: this.configService.get<string>('REDIS_HOST'),
    };

    const parsedConfig = configSchema.safeParse(config);

    if (!parsedConfig.success) {
      parsedConfig.error.errors.forEach((error) => {
        console.error(error);
      });
    }

    return parsedConfig.data;
  }

  get(key: keyof ConfigType) {
    const config = this.getConfig();
    return config[key];
  }
}
