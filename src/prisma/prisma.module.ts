import { Global, Module } from '@nestjs/common';

import { PrismaLaunchyService } from './prisma-launchy.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, PrismaLaunchyService],
  exports: [PrismaService, PrismaLaunchyService],
})
export class PrismaModule {}
