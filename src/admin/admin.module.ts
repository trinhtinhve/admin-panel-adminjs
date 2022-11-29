import { Module } from '@nestjs/common';

import { AccessControlModule } from '../accesscontrol/accesscontrol.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ResourceModule } from '../resources/resource.module';
import { AdminService } from './admin.service';

@Module({
  imports: [PrismaModule, AccessControlModule, ResourceModule],
  exports: [AdminService],
  providers: [AdminService],
})
export class LaunchyAdminModule {}
