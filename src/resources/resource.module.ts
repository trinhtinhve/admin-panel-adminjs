import { Module } from '@nestjs/common';

import { FeatureModule } from '../features/feature.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UtilModule } from '../util/util.module';
import { UserAdminResource } from './admin/admin.resource';
import { GrantResource } from './admin/grant.resource';
import { RoleResource } from './admin/role.resource';
import { FundingAbnormalActionsResource } from './launchy/abnormal-action.resource';
import { FundingFiatDepositHistoryResource } from './launchy/deposit-history.resource';
import { FundingFiatDepositResource } from './launchy/deposit.resource';
import { UserResource } from './launchy/user.resource';
import { FundingFiatWithdrawalHistoryResource } from './launchy/withdrawal-history.resource';
import { FundingFiatWithdrawalResource } from './launchy/withdrawal.resource';
import { ResourceService } from './resource.service';

@Module({
  imports: [PrismaModule, FeatureModule, UtilModule],
  providers: [
    ResourceService,
    RoleResource,
    GrantResource,
    UserAdminResource,
    UserResource,
    FundingFiatDepositResource,
    FundingFiatDepositHistoryResource,
    FundingFiatWithdrawalResource,
    FundingFiatWithdrawalHistoryResource,
    FundingAbnormalActionsResource,
  ],
  exports: [ResourceService],
})
export class ResourceModule {}
