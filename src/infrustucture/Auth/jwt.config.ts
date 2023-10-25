import { ConfigFactory, registerAs } from '@nestjs/config';

export interface IJwtConfig {
    jwtSecret: string;
}

export const JWT_CONFIG_TOKEN = 'jwt-config-token';

export const jwtConfig = registerAs<IJwtConfig, ConfigFactory<IJwtConfig>>(
    JWT_CONFIG_TOKEN,
    () => {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET not provided.');
        }

        return {
            jwtSecret: process.env.JWT_SECRET,
        };
    },
);
