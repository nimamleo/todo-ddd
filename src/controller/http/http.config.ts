import { ConfigFactory, registerAs } from '@nestjs/config';

export interface IHttpConfig {
  port: number;
}

export const HTTP_CONFIG_TOKEN = 'http-config-token';

export const httpConfig = registerAs<IHttpConfig, ConfigFactory<IHttpConfig>>(
  HTTP_CONFIG_TOKEN,
  () => {
    if (
      !process.env.HTTP_PORT ||
      isNaN(Number(process.env.HTTP_PORT))
    ) {
      throw new Error('HTTP_CONFIG_PORT not provided');
    }

    return {
      port: Number(process.env.HTTP_PORT),
    };
  },
);
