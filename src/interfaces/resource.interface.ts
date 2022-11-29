import { PrismaClient as PrismaClientLaunchy } from '@internal/launchy/prisma/client';
import { PrismaClient } from '@prisma/client';

export interface Resource {
  model: any;
  client: PrismaClient | PrismaClientLaunchy;
}

export interface Grant {
  id: number;
  role: string;
  resource: string;
  action: string;
  attributes: string;
}

export interface ResourcesWithGrants {
  [roleResourceName: string]: Grant[];
}

export interface Granting {
  id: number;
  action: string;
  attributes: string;
  grant: boolean;
}
export interface ResourcesWithGrantings {
  [resourceName: string]: Granting[];
}

export enum Action {
  CREATE = 'create:any',
  READ = 'read:any',
  UPDATE = 'update:any',
  DELETE = 'delete:any',
}
