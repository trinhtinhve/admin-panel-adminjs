import { Injectable } from '@nestjs/common';
import { FeatureType, ResourceOptions } from 'adminjs';

import { DisableActionsFeature } from '../../features/disable-actions.feature';
import { EnableActionsByRoleFeature } from '../../features/enable-actions-by-role.feature';
import { AbstractResource } from '../../interfaces/AbstractResource';
import { Action, Granting } from '../../interfaces/resource.interface';
import { createDepositWithdrawNavigation } from '../../navigations/deposit-withdraw.navigation';
import { PrismaLaunchyService } from '../../prisma/prisma-launchy.service';

@Injectable()
export class FundingFiatWithdrawalHistoryResource extends AbstractResource {
  constructor(
    prisma: PrismaLaunchyService,
    disableActionsFeature: DisableActionsFeature,
    enableActionsByRole: EnableActionsByRoleFeature,
  ) {
    super(prisma, disableActionsFeature, enableActionsByRole);
  }

  get dbName(): string {
    return 'FundingFiatWithdrawalHistory';
  }

  public get resourceName() {
    return 'FundingFiatWithdrawalHistory';
  }

  public getGrantings(): Granting[] {
    return [{ action: Action.READ, attributes: '*', grant: false, id: -1 }];
  }

  buildOptions(): ResourceOptions {
    return {
      id: 'Withdraw History',
      navigation: createDepositWithdrawNavigation(),
      properties: {
        fundingFiatWithdrawal: {
          type: 'key-value',
        },
        remiRequest: {
          type: 'key-value',
        },
        remiResponse: {
          type: 'key-value',
        },
        error: {
          type: 'key-value',
        },
      },
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
