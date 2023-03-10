import { DBModule } from '@@infra/db/db.infra.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: false,
        cli: {
          migrationsDir: 'src/infra/db/migrations'
        }
      }),
      inject: [ConfigService]
    }),
    DBModule
  ],
  controllers: [],
  providers: []
})
export class InfraModule {}
