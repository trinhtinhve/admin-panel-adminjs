import { PrismaClient as PrismaClientLaunchy } from '@internal/launchy/prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { FeatureType, ResourceOptions, ResourceWithOptions } from 'adminjs';
import { groupBy } from 'lodash';

import { DisableActionsFeature } from '../features/disable-actions.feature';
import { EnableActionsByRoleFeature } from '../features/enable-actions-by-role.feature';
import { Granting, Resource } from './resource.interface';

@Injectable()
export abstract class AbstractResource {
  constructor(
    protected prisma: PrismaClient | PrismaClientLaunchy,
    private disableActionsFeature: DisableActionsFeature,
    private enableActionsByRole: EnableActionsByRoleFeature,
  ) {}

  abstract get dbName(): string;
  abstract get resourceName(): string;
  abstract buildOptions(): Promise<ResourceOptions> | ResourceOptions;
  abstract getFeatureList(): Promise<FeatureType[]> | FeatureType[];
  abstract getGrantings(): Granting[];

  private buildResource(): Resource {
    const dmmf = (this.prisma as any)._baseDmmf as DMMFClass;
    return { model: dmmf.modelMap[this.dbName], client: this.prisma };
  }

  public async createResource(): Promise<ResourceWithOptions> {
    return {
      resource: this.buildResource(),
      options: await this.buildOptions(),
      features: [
        this.disableActionsFeature.createFeature(),
        this.enableActionsByRole.createFeature(this.resourceName),
        ...(await this.getFeatureList()),
      ],
    };
  }

  public validateGrantings(grantingList: Granting[]): void {
    const allowGrantingList = this.getGrantings();
    const groupByActions = groupBy(allowGrantingList, 'action');

    grantingList.forEach((i) => {
      if (!groupByActions[i.action]) {
        throw new Error(`Validate action error: action ${i.action} is invalid`);
      }
      //validate attributes.
    });
  }
}
