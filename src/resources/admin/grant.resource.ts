import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ActionContext, FeatureType, ResourceOptions } from 'adminjs';

import { DisableActionsFeature } from '../../features/disable-actions.feature';
import { EnableActionsByRoleFeature } from '../../features/enable-actions-by-role.feature';
import { AbstractResource } from '../../interfaces/AbstractResource';
import { Action, Granting } from '../../interfaces/resource.interface';
import { createSettingNavigation } from '../../navigations/setting.navigation';
import { PrismaService } from '../../prisma/prisma.service';
import { UtilService } from '../../util/util.service';
import { ResourceService } from '../resource.service';

@Injectable()
export class GrantResource extends AbstractResource {
  constructor(
    prisma: PrismaService,
    disableActionsFeature: DisableActionsFeature,
    enableActionsByRole: EnableActionsByRoleFeature,
    private utilService: UtilService,
    @Inject(forwardRef(() => ResourceService))
    private resourceService: ResourceService,
  ) {
    super(prisma, disableActionsFeature, enableActionsByRole);
  }

  get dbName(): string {
    return 'Grant';
  }

  get resourceName(): string {
    return 'Grant';
  }

  public getGrantings(): Granting[] {
    return [
      { action: Action.READ, attributes: '*', grant: false, id: -1 },
      { action: Action.UPDATE, attributes: '*', grant: false, id: -1 },
    ];
  }

  async buildOptions(): Promise<ResourceOptions> {
    const availableRoles = await (this.prisma as PrismaService).role.findMany({
      select: {
        name: true,
      },
    });

    return {
      navigation: createSettingNavigation(),
      editProperties: ['role', 'resource', 'action'],
      properties: {
        role: {
          availableValues: availableRoles.map((role) => ({
            label: role.name,
            value: role.name,
          })),
        },
        resource: {
          availableValues: this.resourceService
            .getAllResourceNames()
            .map((rsName) => ({ label: rsName, value: rsName })),
        },
        action: {
          availableValues: this.utilService.getAvailableActions(),
        },
      },
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
