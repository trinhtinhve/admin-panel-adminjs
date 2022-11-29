import { Injectable } from '@nestjs/common';
import { FeatureType, ResourceOptions } from 'adminjs';

import { DisableActionsFeature } from '../../features/disable-actions.feature';
import { EnableActionsByRoleFeature } from '../../features/enable-actions-by-role.feature';
import { AbstractResource } from '../../interfaces/AbstractResource';
import { Action, Granting } from '../../interfaces/resource.interface';
import { createDepositWithdrawNavigation } from '../../navigations/deposit-withdraw.navigation';
import { PrismaLaunchyService } from '../../prisma/prisma-launchy.service';

@Injectable()
export class FundingFiatDepositResource extends AbstractResource {
  constructor(
    prisma: PrismaLaunchyService,
    disableActionsFeature: DisableActionsFeature,
    enableActionsByRole: EnableActionsByRoleFeature,
  ) {
    super(prisma, disableActionsFeature, enableActionsByRole);
  }

  public get dbName() {
    return 'FundingFiatDeposit';
  }

  get resourceName(): string {
    return 'FundingFiatDeposit';
  }

  public getGrantings(): Granting[] {
    return [
      { action: Action.READ, attributes: '*', grant: false, id: -1 },
      { action: Action.UPDATE, attributes: '*', grant: false, id: -1 },
    ];
  }

  buildOptions(): ResourceOptions {
    return {
      id: 'Deposit',
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
            { value: 'FIAT_DEPOSIT_SENDING', label: 'FIAT_DEPOSIT_SENDING' },
            { value: 'FIAT_DEPOSIT_SENT', label: 'FIAT_DEPOSIT_SENT' },
            { value: 'FIAT_DEPOSIT_DONE', label: 'FIAT_DEPOSIT_DONE' },
            { value: 'FIAT_DEPOSIT_CANCEL', label: 'FIAT_DEPOSIT_CANCEL' },
            { value: 'FIAT_DEPOSIT_FAIL', label: 'FIAT_DEPOSIT_FAIL' },

            { value: 'AMM_SENDING', label: 'AMM_SENDING' },
            { value: 'AMM_SENT', label: 'AMM_SENT' },
            { value: 'AMM_DONE', label: 'AMM_DONE' },
            { value: 'AMM_CANCEL', label: 'AMM_CANCEL' },
            { value: 'AMM_FAIL', label: 'AMM_FAIL' },

            {
              value: 'COIN_WITHDRAW_SENDING',
              label: 'COIN_WITHDRAW_SENDING',
            },
            { value: 'COIN_WITHDRAW_SENT', label: 'COIN_WITHDRAW_SENT' },
            { value: 'COIN_WITHDRAW_DONE', label: 'COIN_WITHDRAW_DONE' },
            { value: 'COIN_WITHDRAW_FAIL', label: 'COIN_WITHDRAW_FAIL' },
          ],
        },
        fiatDepositStatus: {
          position: 6,
        },
        fiatDepositId: {
          position: 7,
        },
        fiatDepositRef: {
          position: 8,
        },
        fiatConfirmMoneySent: {
          position: 9,
        },
        ammOrderStatus: {
          position: 10,
        },
        ammOrderId: {
          position: 11,
        },
        ammOrderRef: {
          position: 12,
        },
        ammSourceCoin: {
          position: 13,
        },
        ammSourceAmount: {
          position: 14,
        },
        ammDestinationCoin: {
          position: 15,
        },
        ammDestAmountAfterFee: {
          position: 16,
        },
        withdrawId: {
          position: 17,
        },
        withdrawCoinAddress: {
          position: 18,
        },
        withdrawCoinAmount: {
          position: 19,
        },
        withdrawCoinCurrency: {
          position: 20,
        },
        withdrawStatus: {
          position: 21,
        },
        withdrawActionableId: {
          position: 22,
        },
        withdrawActionableStatus: {
          position: 23,
        },
        withdrawCoinLayer: {
          position: 24,
        },
        fiatDepositResult: {
          type: 'key-value',
        },
        fiatDepositRefResult: {
          type: 'mixed',
        },
        'fiatDepositRefResult.trade': {
          type: 'mixed',
        },
        'fiatDepositRefResult.trade.offer_data': {
          type: 'key-value',
        },
        'fiatDepositRefResult.trade.id': {
          type: 'number',
        },
        'fiatDepositRefResult.trade.qr_code': {
          type: 'string',
        },
        'fiatDepositRefResult.trade.fiat_amount': {
          type: 'number',
        },
        'fiatDepositRefResult.trade.fiat_currency': {
          type: 'string',
        },
        'fiatDepositRefResult.trade.status': {
          type: 'string',
        },
        'fiatDepositRefResult.partner': {
          type: 'key-value',
        },
        'fiatDepositRefResult.partner.volume': {
          type: 'key-value',
        },
        ammOrderResult: {
          type: 'key-value',
        },
        withdrawResult: {
          type: 'key-value',
        },
        withdrawActionableResult: {
          type: 'key-value',
        },
      },
      listProperties: [
        'id',
        'orderRef',
        'status',
        'orderStatus',
        'currency',
        'fiatAmount',
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
