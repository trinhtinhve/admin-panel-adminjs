import { Injectable } from '@nestjs/common';
import { Permission } from 'accesscontrol';
import { ActionContext, buildFeature } from 'adminjs';
import { RollbarLogger } from 'nestjs-rollbar';
import { UtilService } from 'src/util/util.service';

import { AccessControlService } from '../accesscontrol/accesscontrol.service';

@Injectable()
export class EnableActionsByRoleFeature {
  constructor(
    private acService: AccessControlService,
    private rollbarLogger: RollbarLogger,
    private utilService: UtilService,
  ) {}

  public createFeature(resourceName: string) {
    return buildFeature({
      actions: {
        edit: { isAccessible: this.canUpdate(resourceName) },
        delete: { isAccessible: this.canDelete(resourceName) },
        bulkDelete: { isAccessible: this.canDelete(resourceName) },
        new: { isAccessible: this.canCreate(resourceName) },
        list: { isAccessible: this.canRead(resourceName) },
      },
    });
  }

  private canCreate(resourceName: string) {
    return (context: ActionContext) => {
      const { currentAdmin } = context;

      if (!currentAdmin.role) {
        return false;
      }

      try {
        const permission: Permission = this.acService.ac
          .can(currentAdmin.role)
          .createAny(resourceName);
        return permission.granted;
      } catch (error) {
        // this.rollbarLogger.error(error, 'EnableActionsByRoleFeature - CreateAny');
        return false;
      }
    };
  }

  private canDelete(resourceName: string) {
    return (context: ActionContext) => {
      const { currentAdmin } = context;

      if (!currentAdmin.role) {
        return false;
      }

      try {
        const permission: Permission = this.acService.ac
          .can(currentAdmin.role)
          .deleteAny(resourceName);
        return permission.granted;
      } catch (error) {
        // this.rollbarLogger.error(error, 'EnableActionsByRoleFeature - CanDelete');
        return false;
      }
    };
  }

  private canRead(resourceName: string) {
    return (context: ActionContext) => {
      const { currentAdmin } = context;

      if (!currentAdmin.role) {
        return false;
      }

      const isSuperAdmin = this.utilService.isSuperAdmin(
        context.currentAdmin.role,
      );
      if (isSuperAdmin) {
        return true;
      }

      try {
        const permission: Permission = this.acService.ac
          .can(currentAdmin.role)
          .readAny(resourceName);
        return permission.granted;
      } catch (error) {
        // this.rollbarLogger.error(error, 'EnableActionsByRoleFeature - CanRead');
        return false;
      }
    };
  }

  private canUpdate(resourceName: string) {
    return (context: ActionContext) => {
      const { currentAdmin, record } = context;

      if (!currentAdmin.role) {
        return false;
      }

      const isSuperAdmin = this.utilService.isSuperAdmin(currentAdmin.role);
      if (isSuperAdmin) {
        return true;
      }

      // if (currentAdmin.email === record?.params.email) {
      //   return true;
      // }

      try {
        const permission: Permission = this.acService.ac
          .can(currentAdmin.role)
          .updateAny(resourceName);
        return permission.granted;
      } catch (error) {
        // this.rollbarLogger.error(error, 'EnableActionsByRoleFeature - CanUpdate');
        return false;
      }
    };
  }
}
