import { AdminModuleOptions } from '@adminjs/nestjs';
import * as AdminJSPrisma from '@adminjs/prisma';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AdminJS, { AdminJSOptions, CurrentAdmin } from 'adminjs';
import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';
import { SessionOptions } from 'express-session';

import { AccessControlService } from '../accesscontrol/accesscontrol.service';
import { AbstractResource } from '../interfaces/AbstractResource';
import {
  Grant,
  Granting,
  ResourcesWithGrantings,
} from '../interfaces/resource.interface';
import { PrismaService } from '../prisma/prisma.service';
import { ResourceService } from '../resources/resource.service';

@Injectable()
export class AdminService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private acService: AccessControlService,
    private resourceService: ResourceService,
  ) {}

  public async buildAdminConfiguration(): Promise<AdminModuleOptions> {
    AdminJS.registerAdapter({
      Resource: AdminJSPrisma.Resource,
      Database: AdminJSPrisma.Database,
    });

    await this.acService.buildAccessControl();

    return {
      adminJsOptions: await this.buildAdminJsOptions(),
      auth: await this.buildAuth(),
      sessionOptions: this.buildSessionOptions(),
    };
  }

  private mapGrant(grantings: Granting[], grants: Grant[]): Granting[] {
    return grantings.map((i) => {
      const grant = grants?.find((g) => g.action === i.action);

      return {
        ...i,
        ...((grant && { grant: true, id: grant.id }) || {
          grant: false,
          id: -1,
        }),
      };
    });
  }

  public buildResourcesWithGranting(role: string): ResourcesWithGrantings {
    const resources = this.resourceService.getResourceList();

    return resources.reduce((result, rs) => {
      const resource = rs as unknown as AbstractResource;
      console.log(resource.resourceName);

      if (!resource.getGrantings) {
        return result;
      }

      const grants = this.acService.getGrants(role, resource.resourceName);
      const grantings: Granting[] = this.mapGrant(
        resource.getGrantings(),
        grants,
      );

      return {
        ...result,
        [resource.resourceName]: grantings,
      };
    }, {} as ResourcesWithGrantings);
  }

  private validateGranting(
    resourcesWithGrantings: ResourcesWithGrantings,
  ): void {
    Object.keys(resourcesWithGrantings).forEach((resourceName) => {
      const grantingList: Granting[] = resourcesWithGrantings[resourceName];
      const resource = this.resourceService.getResourceByName(resourceName);
      if (!resource) {
        throw new Error(
          `Validate granting error: resource ${resourceName} is invalid`,
        );
      }

      resource.validateGrantings(grantingList);
    });
  }

  private mapGrantingToGrant(
    role: string,
    resourcesWithGrantings: ResourcesWithGrantings,
  ): Grant[] {
    const resourceNames = Object.keys(resourcesWithGrantings);

    return resourceNames.reduce((grantList, resourceName) => {
      const grantingList: Granting[] = resourcesWithGrantings[resourceName];

      grantingList.forEach((granting) => {
        if (granting.grant) {
          const grant: Grant = {
            id: granting.id,
            role,
            resource: resourceName,
            action: granting.action,
            attributes: granting.attributes,
          };

          grantList.push(grant);
        }
      });

      return grantList;
    }, [] as Grant[]);
  }

  public async handleGrant(
    role: string,
    resourcesWithGrantings: ResourcesWithGrantings,
  ) {
    this.validateGranting(resourcesWithGrantings);
    const grantList = this.mapGrantingToGrant(role, resourcesWithGrantings);
    console.log('grantList handle', grantList);

    await this.prismaService.$transaction(
      grantList.map((grant) => {
        return this.prismaService.grant.upsert({
          where: {
            id: grant.id,
          },
          update: {
            resource: grant.resource,
            action: grant.action,
            attributes: grant.attributes,
          },
          create: {
            role: grant.role,
            resource: grant.resource,
            action: grant.action,
            attributes: grant.attributes,
          },
        });
      }),
    );

    await this.acService.buildAccessControl();
    console.log('getGrants again', this.acService.ac.getGrants());
    console.log('grantList again', this.acService.grantList);
  }

  private async buildAdminJsOptions(): Promise<AdminJSOptions> {
    return {
      rootPath: '/admin',
      resources: await this.resourceService.buildResources(),
      branding: {
        companyName: 'NFT5',
        logo: 'https://launchy-staging-storage.s3.ap-southeast-1.amazonaws.com/images/admin-logo/imota+logo+15455.png',
        favicon:
          'https://launchy-staging-storage.s3.ap-southeast-1.amazonaws.com/images/admin-logo/favicon+64.png',
      },
      locale: {
        language: 'en',
        translations: {
          messages: {
            loginWelcome: 'Imota Admin',
          },
          labels: {
            loginWelcome: 'Imota Admin',
          },
        },
      },
    };
  }

  private async buildAuth() {
    const cookiePassword = randomBytes(20).toString('hex');
    const superEmail = this.configService.get('ADMIN_EMAIL');

    const superUser = await this.prismaService.user.findFirst({
      where: {
        email: superEmail,
      },
    });

    if (!superUser) {
      await this.prismaService.user.create({
        data: {
          email: superEmail,
          hashedPassword: await hash(this.configService.get('ADMIN_PASSWORD')),
          role: 'superadmin',
        },
      });
    }

    return {
      authenticate: async (
        email: string,
        password: string,
      ): Promise<CurrentAdmin | null> => {
        const user = await this.prismaService.user.findUnique({
          where: {
            email,
          },
        });

        if (user && (await verify(user.hashedPassword, password))) {
          return {
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
      cookieName: 'nft5_admin',
      cookiePassword,
    };
  }

  private buildSessionOptions(): SessionOptions {
    return {
      resave: true,
      saveUninitialized: true,
      secret: this.configService.get('ADMIN_SESSION_SECRET'),
    };
  }
}
