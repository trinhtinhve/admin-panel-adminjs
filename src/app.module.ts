import { AdminModule } from '@adminjs/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-rollbar';

import { LaunchyAdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { AppController } from './app.controller';
import { configValidationSchema } from './config-validation-schema';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    PrismaModule,
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        accessToken: config.get<string>('ROLLBAR_TOKEN'),
      }),
    }),
    LaunchyAdminModule,
    AdminModule.createAdminAsync({
      inject: [AdminService],
      useFactory: (adminService: AdminService) => {
        return adminService.buildAdminConfiguration();
      },
      imports: [LaunchyAdminModule],
    }),
  ],
})
export class AppModule {}
