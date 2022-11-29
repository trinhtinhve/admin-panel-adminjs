import { Module } from '@nestjs/common';

import { AccessControlModule } from '../accesscontrol/accesscontrol.module';
import { UtilModule } from '../util/util.module';
import { DisableActionsFeature } from './disable-actions.feature';
import { EnableActionsByRoleFeature } from './enable-actions-by-role.feature';

@Module({
  imports: [UtilModule, AccessControlModule],
  providers: [DisableActionsFeature, EnableActionsByRoleFeature],
  exports: [DisableActionsFeature, EnableActionsByRoleFeature],
})
export class FeatureModule {}
