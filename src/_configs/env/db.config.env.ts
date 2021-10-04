import { User } from "src/auth/user.entity";
import { Task } from "../../tasks/tasks.entity";

const entities = [Task, User]

export const db_config_env = {
  test: {
    type: 'sqlite',
    database: 'wa_db',
    entities,
    synchronize: true,
    cli: {
      migrationsDir: 'src/migration',
    },
    migrations: ['src/migration/*{.ts,.js}'],
  },
  development: {
    type: process.env.DATABASE_TYPE || 'mysql',
    host: parseInt(process.env.DATABASE_HOST) || 'db',
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME || 'wa_db',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'root',
    entities,
    synchronize: true,
    cli: {
      migrationsDir: 'src/migration',
    },
    migrations: ['src/migration/*{.ts,.js}'],
  },
  
};
