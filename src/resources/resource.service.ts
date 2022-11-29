import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ResourceWithOptions } from 'adminjs';
import { AbstractResource } from 'src/interfaces/AbstractResource';

import { UserAdminResource } from './admin/admin.resource';
import { GrantResource } from './admin/grant.resource';
import { FundingAbnormalActionsResource } from './launchy/abnormal-action.resource';
// import { RoleResource } from './admin/role.resource';
import { FundingFiatDepositHistoryResource } from './launchy/deposit-history.resource';
import { FundingFiatDepositResource } from './launchy/deposit.resource';
import { UserResource } from './launchy/user.resource';
import { FundingFiatWithdrawalHistoryResource } from './launchy/withdrawal-history.resource';
import { FundingFiatWithdrawalResource } from './launchy/withdrawal.resource';

@Injectable()
export class ResourceService {
  constructor(
    private userResource: UserResource,
    private userAdminResource: UserAdminResource,
    // private roleResource: RoleResource,
    @Inject(forwardRef(() => GrantResource))
    private grantResource: GrantResource,
    private fundingFiatDepositResource: FundingFiatDepositResource,
    private fundingFiatDepositHistoryResource: FundingFiatDepositHistoryResource,
    private fundingFiatWithdrawalResource: FundingFiatWithdrawalResource,
    private fundingFiatWithdrawalHisotryResource: FundingFiatWithdrawalHistoryResource,
    private functionAbnormalActionsResource: FundingAbnormalActionsResource,
  ) {}

  public buildResources(): Promise<ResourceWithOptions[]> {
    return Promise.all([
      this.userResource.createResource(),
      this.fundingFiatDepositResource.createResource(),
      this.fundingFiatDepositHistoryResource.createResource(),
      this.fundingFiatWithdrawalResource.createResource(),
      this.fundingFiatWithdrawalHisotryResource.createResource(),
      this.functionAbnormalActionsResource.createResource(),
      this.userAdminResource.createResource(),
      // this.roleResource.createResource(),
      // this.grantResource.createResource(),
    ]);
  }

  public getAllResourceNames(): string[] {
    return this.getResourceList().reduce((result, rs) => {
      result.push(rs.resourceName);
      return result;
    }, [] as string[]);
  }

  public getResourceList(): AbstractResource[] {
    return Object.values(this) as AbstractResource[];
  }

  public convertToObject() {
    return this as unknown as { [resourceName: string]: AbstractResource };
  }

  public getResourceByName(resourceName: string): AbstractResource {
    const rsList = this.getResourceList();
    return rsList.find((rs) => rs.resourceName === resourceName);
  }
}
