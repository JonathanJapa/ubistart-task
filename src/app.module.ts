import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

import { db_config_env } from './_configs/env/db.config.env';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
  TypeOrmModule.forRoot(db_config_env[process.env.NODE_ENV || 'test']),
  TasksModule,
  AuthModule,
  ],
})
export class AppModule {}
