import { Injectable } from '@nestjs/common';
import { FeatureType, ResourceOptions } from 'adminjs';

import { DisableActionsFeature } from '../../features/disable-actions.feature';
import { EnableActionsByRoleFeature } from '../../features/enable-actions-by-role.feature';
import { AbstractResource } from '../../interfaces/AbstractResource';
import { Action, Granting } from '../../interfaces/resource.interface';
import { createDepositWithdrawNavigation } from '../../navigations/deposit-withdraw.navigation';
import { PrismaLaunchyService } from '../../prisma/prisma-launchy.service';

@Injectable()
export class FundingFiatWithdrawalResource extends AbstractResource {
  constructor(
    prisma: PrismaLaunchyService,
    disableActionsFeature: DisableActionsFeature,
    enableActionsByRole: EnableActionsByRoleFeature,
  ) {
    super(prisma, disableActionsFeature, enableActionsByRole);
  }

  get dbName(): string {
    return 'FundingFiatWithdrawal';
  }

  public get resourceName() {
    return 'FundingFiatWithdrawal';
  }

  public getGrantings(): Granting[] {
    return [
      { action: Action.READ, attributes: '*', grant: false, id: -1 },
      { action: Action.UPDATE, attributes: '*', grant: false, id: -1 },
    ];
  }

  buildOptions(): ResourceOptions {
    return {
      id: 'Withdraw',
      navigation: createDepositWithdrawNavigation(),
      editProperties: ['status'],
      properties: {
        id: {
          position: 1,
        },
        userId: {
          position: 2,
        },
        orderRef: {
          position: 3,
        },
        orderStatus: {
          position: 4,
        },
        status: {
          position: 5,
          availableValues: [
            { value: 'CREATED', label: 'CREATED' },

            {
              value: 'COIN_DEPOSIT_REMI_DONE',
              label: 'COIN_DEPOSIT_REMI_DONE',
            },
            { value: 'COIN_DEPOSIT_DONE', label: 'COIN_DEPOSIT_DONE' },
            { value: 'COIN_DEPOSIT_FAIL', label: 'COIN_DEPOSIT_FAIL' },

            { value: 'AMM_SENDING', label: 'AMM_SENDING' },
            { value: 'AMM_SENT', label: 'AMM_SENT' },
            { value: 'AMM_DONE', label: 'AMM_DONE' },
            { value: 'AMM_CANCEL', label: 'AMM_CANCEL' },
            { value: 'AMM_FAIL', label: 'AMM_FAIL' },

            {
              value: 'FIAT_WITHDRAW_SENDING',
              label: 'FIAT_WITHDRAW_SENDING',
            },
            { value: 'FIAT_WITHDRAW_SENT', label: 'FIAT_WITHDRAW_SENT' },
            { value: 'FIAT_WITHDRAW_DONE', label: 'FIAT_WITHDRAW_DONE' },
            { value: 'FIAT_WITHDRAW_FAIL', label: 'FIAT_WITHDRAW_FAIL' },
          ],
        },
        currency: {
          position: 6,
        },
        busdAmount: {
          position: 7,
        },
        fiatWithdrawalDetailId: {
          position: 8,
        },
        txnHash: {
          position: 9,
        },
        withdrawalBankName: {
          position: 10,
        },
        withdrawalBankAccountName: {
          position: 11,
        },
        withdrawalBankAccountNumber: {
          position: 12,
        },
        coinDepositTxHash: {
          position: 13,
        },
        coinDepositStatus: {
          position: 14,
        },
        coinDepositId: {
          position: 15,
        },
        coinDepositCoinCurrency: {
          position: 16,
        },
        coinDepositCoinAmount: {
          position: 17,
        },
        coinDepositAddress: {
          position: 18,
        },
        coinDepositCoinLayer: {
          position: 19,
        },
        blockchainFromAddress: {
          position: 20,
        },
        blockchainToAddress: {
          position: 21,
        },
        blockchainCoinAmount: {
          position: 22,
        },
        ammOrderStatus: {
          position: 23,
        },
        ammOrderRef: {
          position: 24,
        },
        ammSourceCoin: {
          position: 25,
        },
        ammSourceAmount: {
          position: 26,
        },
        ammDestinationCoin: {
          position: 27,
        },
        ammDestAmountAfterFee: {
          position: 28,
        },
        fiatWithdrawalStatus: {
          position: 29,
        },
        fiatWithdrawalId: {
          position: 30,
        },
        fiatWithdrawalAmount: {
          position: 31,
        },
        fiatWithdrawalRef: {
          position: 32,
        },
        fiatWithdrawalActionableId: {
          position: 33,
        },
        fiatWithdrawalActionableStatus: {
          position: 34,
        },
        ammOrderResult: {
          type: 'key-value',
        },
        fiatWithdrawalResult: {
          type: 'key-value',
        },
        fiatWithdrawalActionableResult: {
          type: 'key-value',
        },
        blockchainCoinResult: {
          type: 'key-value',
        },
        coinDepositResult: {
          type: 'key-value',
        },
        blockchainCoinStatus: {
          isVisible: false,
        },
        blockchainCoinName: {
          isVisible: false,
        },
        withdrawalPaymentMethod: {
          isVisible: false,
        },
        withdrawalFiatAmount: {
          isVisible: false,
        },
        coinDepositPortalCoin: {
          isVisible: false,
        },
      },
      listProperties: [
        'id',
        'orderRef',
        'status',
        'orderStatus',
        'currency',
        'busdAmount',
        'userId',
      ],
      actions: {
        new: { isAccessible: false },
        delete: { isAccessible: false },
        bulkDelete: { isAccessible: false },
      },
    };
  }

  getFeatureList(): FeatureType[] {
    return [];
  }
}
