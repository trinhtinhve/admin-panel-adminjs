import passwordsFeature from '@adminjs/passwords';
import { Injectable } from '@nestjs/common';
import { ActionContext, FeatureType, ResourceOptions } from 'adminjs';
import { hash } from 'argon2';

import { DisableActionsFeature } from '../../features/disable-actions.feature';
import { EnableActionsByRoleFeature } from '../../features/enable-actions-by-role.feature';
import { AbstractResource } from '../../interfaces/AbstractResource';
import { Granting } from '../../interfaces/resource.interface';
import { createSettingNavigation } from '../../navigations/setting.navigation';
import { PrismaService } from '../../prisma/prisma.service';
import { UtilService } from '../../util/util.service';

@Injectable()
export class UserAdminResource extends AbstractResource {
  constructor(
    prisma: PrismaService,
    disableActionsFeature: DisableActionsFeature,
    enableActionsByRole: EnableActionsByRoleFeature,
    private utilService: UtilService,
  ) {
    super(prisma, disableActionsFeature, enableActionsByRole);
  }

  get dbName(): string {
    return 'User';
  }

  get resourceName(): string {
    return 'AdminUser';
  }

  public getGrantings(): Granting[] {
    return [];
  }

  public async buildOptions(): Promise<ResourceOptions> {
    const availableRoles = await (this.prisma as PrismaService).role.findMany({
      select: {
        name: true,
      },
    });

    return {
      id: 'Admin User',
      navigation: createSettingNavigation(),
      properties: {
        id: { position: 0 },
        email: { position: 1 },
        hashedPassword: { isVisible: false },
        password: {
          type: 'string',
          isVisible: { edit: true, list: false, filter: false, show: false },
        },
        role: {
          availableValues: availableRoles.map((role) => ({
            label: role.name,
            value: role.name,
          })),
        },
      },
      // editProperties: ['password'],
      actions: {
        new: { isAccessible: this.canNew.bind(this) },
        delete: { isAccessible: this.canDelete.bind(this) },
        bulkDelete: { isAccessible: this.canDelete.bind(this) },
      },
    };
  }

  getFeatureList(): FeatureType[] {
    return [
      passwordsFeature({
        properties: { encryptedPassword: 'hashedPassword' },
        hash,
      }),
    ];
  }

  private canNew(context: ActionContext) {
    return this.utilService.isSuperAdmin(context.currentAdmin?.role);
  }

  private canDelete(context: ActionContext) {
    return this.utilService.isSuperAdmin(context.currentAdmin?.role);
  }

  // private canEditRole(context: ActionContext) {
  //   return this.ultiService.isSuperAdmin(context.currentAdmin?.role);
  // }
}
