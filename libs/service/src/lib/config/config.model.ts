export interface MicroServiceConfiguration {
  REVERSE_CONTEXT?: string;
  REVERSE_ADDRESS?: string;
  HTTP_PORT?: number,
  HTTP_HOST?: string,
  TCP_HOST?: string;
  TCP_PORT?: number,
  GLOBAL_API_PREFIX?: string;
  AUTH?: AuthConfig;
  I18N_LANG?: string;
  I18N_JSON_PATH?: string;
  PROTOCOL?: string;
  GROUP_ID?: string;
  KAFKA_PORT?: number;
  KAFKA_HOST?: string;
}

export interface GatewayConfiguration {
  HTTP_PORT?: number,
  CUSTOMER?: MicroServiceConfiguration;
  USER?: MicroServiceConfiguration;
  UAA?: MicroServiceConfiguration;
  AUTH?: AuthConfig;
  I18N_LANG?: string;
  I18N_JSON_PATH?: string;
  GLOBAL_API_PREFIX?: string;
}

export interface AuthConfig {
  SECRET?: string;
  EXPIRED_ON?: string;
  REFRESH_SECRET?: string;
  REFRESH_EXPIRED_ON?: string;
}

export interface OrmConfiguration {
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD: string;
  DATABASE: string;
  ENTITIES: string[];
  MODE: string;
  SYNC: boolean;
}
