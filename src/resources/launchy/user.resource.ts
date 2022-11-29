import { Injectable } from '@nestjs/common';
import { FeatureType, ResourceOptions } from 'adminjs';

import { DisableActionsFeature } from '../../features/disable-actions.feature';
import { EnableActionsByRoleFeature } from '../../features/enable-actions-by-role.feature';
import { AbstractResource } from '../../interfaces/AbstractResource';
import { Action, Granting } from '../../interfaces/resource.interface';
import { createLaunchyNavigation } from '../../navigations/launchy.navigation';
import { PrismaLaunchyService } from '../../prisma/prisma-launchy.service';

@Injectable()
export class UserResource extends AbstractResource {
  constructor(
    prisma: PrismaLaunchyService,
    disableActionsFeature: DisableActionsFeature,
    enableActionsByRole: EnableActionsByRoleFeature,
  ) {
    super(prisma, disableActionsFeature, enableActionsByRole);
  }

  get dbName(): string {
    return 'User';
  }

  public get resourceName() {
    return 'User';
  }

  public getGrantings(): Granting[] {
    return [
      { action: Action.READ, attributes: '*', grant: false, id: -1 },
      { action: Action.UPDATE, attributes: '*', grant: false, id: -1 },
    ];
  }

  buildOptions(): ResourceOptions {
    return {
      navigation: createLaunchyNavigation(),
      editProperties: ['kycLevel'],
      properties: {
        id: {
          position: 1,
        },
        name: {
          position: 2,
        },
        email: {
          position: 3,
        },
        kycLevel: {
          position: 4,
          availableValues: [
            { value: 0, label: '0' },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
          ],
        },
        phoneNumber: {
          position: 5,
        },
        phoneNumberVerifiedAt: {
          position: 6,
        },
      },
      listProperties: [
        'id',
        'name',
        'email',
        'isRegisteredWithGoogle',
        'kycLevel',
        'phoneNumber',
        'phoneNumberVerifiedAt',
      ],
      actions: {
        new: { isAccessible: false },
        delete: { isAccessible: false },
        bulkDelete: { isAccessible: false },
      },
    };
  }

  getFeatureList(): FeatureType[] {
    return [];
  }
}
