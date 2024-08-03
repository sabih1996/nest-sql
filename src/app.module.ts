import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './models/user.model';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      uri: process.env.SQL_DATABASE_URL,
      autoLoadModels: true,
      synchronize: true,
      models: [User], // Add your MySQL models here,
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
export class AppModule {}
