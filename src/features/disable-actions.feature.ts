import { Injectable } from '@nestjs/common';
import { buildFeature } from 'adminjs';

@Injectable()
export class DisableActionsFeature {
  public createFeature() {
    return buildFeature({
      actions: {
        edit: { isAccessible: false },
        delete: { isAccessible: false },
        bulkDelete: { isAccessible: false },
        new: { isAccessible: false },
      },
    });
  }
}
