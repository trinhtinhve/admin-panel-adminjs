import { Navigation } from '../interfaces/navigation.interface';

export const createDepositWithdrawNavigation = (): Navigation => {
  return {
    icon: 'ShoppingCart',
    name: 'Funding Fiat',
  };
};
