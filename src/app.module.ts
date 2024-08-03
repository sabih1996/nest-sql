import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { exec } from 'child_process';
import { promisify } from 'util';
// import { TypeOrmModule } from '@nestjs/typeorm';

const execAsync = promisify(exec);

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      uri: process.env.SQL_DATABASE_URL,
      autoLoadModels: true,
      synchronize: false,
      models: [], // Add your MySQL models here,
    }),
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   uri: process.env.PG_DATABASE_URL,
    //   autoLoadModels: true,
    //   synchronize: false,
    //   models: [], // Add your PostgreSQL models here
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: process.env.PG_DATABASE_URL,
    //   entities: [], // Add your TypeORM entities here,
    //   synchronize: false,
    //   autoLoadEntities: true,
    //   migrationsRun: true,
    //   migrations: [], // Add your TypeORM migra
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor() {}

  async onModuleInit() {
    try {
      console.log('Running migrations...');
      await execAsync('npx sequelize-cli db:migrate');
      console.log('Migrations completed.');
    } catch (error) {
      console.error('Error running migrations:', error);
    }
  }
}
