import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmAsyncConfig } from './config/typeorm.config';
// import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TasksModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
