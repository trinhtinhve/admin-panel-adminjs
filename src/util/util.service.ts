import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  public isSuperAdmin(role: string) {
    return role === 'superadmin';
  }

  public getAvailableActions() {
    return [
      { label: 'create', value: 'create:any' },
      { label: 'read', value: 'read:any' },
      { label: 'update', value: 'update:any' },
      { label: 'delete', value: 'delete:any' },
    ];
  }
}
