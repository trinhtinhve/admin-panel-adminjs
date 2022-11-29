import { Injectable } from '@nestjs/common';
import { FeatureType, ResourceOptions } from 'adminjs';

import { DisableActionsFeature } from '../../features/disable-actions.feature';
import { EnableActionsByRoleFeature } from '../../features/enable-actions-by-role.feature';
import { AbstractResource } from '../../interfaces/AbstractResource';
import { Action, Granting } from '../../interfaces/resource.interface';
import { createDepositWithdrawNavigation } from '../../navigations/deposit-withdraw.navigation';
import { PrismaLaunchyService } from '../../prisma/prisma-launchy.service';

@Injectable()
export class FundingAbnormalActionsResource extends AbstractResource {
  constructor(
    prisma: PrismaLaunchyService,
    disableActionsFeature: DisableActionsFeature,
    enableActionsByRole: EnableActionsByRoleFeature,
  ) {
    super(prisma, disableActionsFeature, enableActionsByRole);
  }

  get dbName(): string {
    return 'FundingAbnormalAction';
  }

  get resourceName(): string {
    return 'FundingAbnormalAction';
  }

  public getGrantings(): Granting[] {
    return [{ action: Action.READ, attributes: '*', grant: false, id: -1 }];
  }

  buildOptions(): ResourceOptions {
    return {
      id: 'Abnormal Actions',
      navigation: createDepositWithdrawNavigation(),
      actions: {
        edit: { isAccessible: false },
        delete: { isAccessible: false },
        bulkDelete: { isAccessible: false },
      },
    };
  }

  getFeatureList(): FeatureType[] {
    return [];
  }
}
