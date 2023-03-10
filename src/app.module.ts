import { ApplicationModule } from '@@app/application.module';
import { DomainModule } from '@@domain/domain.module';
import { InfraModule } from '@@infra/infra.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ApplicationModule, InfraModule, DomainModule],
  controllers: [],
  providers: []
})
export class AppModule {}
