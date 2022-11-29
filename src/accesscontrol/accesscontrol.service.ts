import { Injectable } from '@nestjs/common';
import { AccessControl } from 'accesscontrol';
import { groupBy } from 'lodash';

import { Grant, ResourcesWithGrants } from '../interfaces/resource.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccessControlService {
  private _ac: AccessControl;
  private _grantList: Grant[];
  private _resourcesWithGrants: ResourcesWithGrants;

  constructor(private prismaService: PrismaService) {}

  public get ac(): AccessControl {
    return this._ac;
  }

  public get grantList(): Grant[] {
    return this._grantList;
  }

  public get resourcesWithGrants() {
    return this._resourcesWithGrants;
  }

  public async buildAccessControl() {
    this._grantList = await this.prismaService.grant.findMany();
    this._resourcesWithGrants = groupBy(this._grantList, (i) =>
      this.resourcePattern(i.role, i.resource),
    );

    console.log('grantList', this._grantList);
    console.log('resourcesWithGrants', this._resourcesWithGrants);

    this._ac = new AccessControl(this._grantList);
  }

  public setGrants(grantList: Grant[]) {
    this._ac.setGrants(grantList);
    this._grantList = grantList;
  }

  public getGrants(role: string, resource: string): Grant[] {
    return this.resourcesWithGrants[this.resourcePattern(role, resource)];
  }

  public getGrant(role: string, resource: string, action: string): Grant {
    const grants = this.getGrants(role, resource);
    return grants.find((grant) => grant.action === action);
  }

  private resourcePattern(role: string, resource: string): string {
    return `${role}.${resource}`;
  }
}
