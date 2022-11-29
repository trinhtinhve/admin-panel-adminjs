import { Action, RecordActionResponse } from 'adminjs';

export const DEFAULT_RECORD_EDIT_ACTION: Record<
  string,
  Partial<Action<RecordActionResponse>>
> = {
  new: {
    isVisible: false,
  },
  delete: {
    isVisible: false,
  },
  bulkDelete: {
    isVisible: false,
  },
  edit: {
    guard: 'EditRecordConfirm',
    actionType: 'record',
  },
};

export const DEFAULT_RECORD_READ_ACTION: Record<
  string,
  Partial<Action<RecordActionResponse>>
> = {
  new: {
    isVisible: false,
  },
  delete: {
    isVisible: false,
  },
  bulkDelete: {
    isVisible: false,
  },
  edit: {
    isVisible: false,
  },
};
