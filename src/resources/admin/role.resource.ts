import { Injectable } from '@nestjs/common';
import { ActionContext, FeatureType, ResourceOptions } from 'adminjs';

import { DisableActionsFeature } from '../../features/disable-actions.feature';
import { EnableActionsByRoleFeature } from '../../features/enable-actions-by-role.feature';
import { AbstractResource } from '../../interfaces/AbstractResource';
import { Action, Granting } from '../../interfaces/resource.interface';
import { createSettingNavigation } from '../../navigations/setting.navigation';
import { PrismaService } from '../../prisma/prisma.service';
import { UtilService } from '../../util/util.service';

@Injectable()
export class RoleResource extends AbstractResource {
  constructor(
    prisma: PrismaService,
    disableActionsFeature: DisableActionsFeature,
    enableActionsByRole: EnableActionsByRoleFeature,
    private utilService: UtilService,
  ) {
    super(prisma, disableActionsFeature, enableActionsByRole);
  }

  get dbName(): string {
    return 'Role';
  }

  get resourceName(): string {
    return 'Role';
  }

  public getGrantings(): Granting[] {
    return [
      { action: Action.READ, attributes: '*', grant: false, id: -1 },
      { action: Action.UPDATE, attributes: '*', grant: false, id: -1 },
    ];
  }

  buildOptions(): ResourceOptions {
    return {
      properties: {
        id: { position: 0 },
        name: { position: 1 },
      },
      navigation: createSettingNavigation(),
      actions: {
        new: { isAccessible: this.canNew.bind(this) },
        delete: { isAccessible: this.canDelete.bind(this) },
        bulkDelete: { isAccessible: this.canDelete.bind(this) },
      },
    };
  }

  getFeatureList(): FeatureType[] {
    return [];
  }

  private canNew(context: ActionContext) {
    return this.utilService.isSuperAdmin(context.currentAdmin?.role);
  }

  private canDelete(context: ActionContext) {
    return this.utilService.isSuperAdmin(context.currentAdmin?.role);
  }
}
