import { Module } from '@nestjs/common';

import { AccessControlService } from './accesscontrol.service';

@Module({
  providers: [AccessControlService],
  exports: [AccessControlService],
})
export class AccessControlModule {}
