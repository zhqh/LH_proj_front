import request from '/@/utils/request';

export function useApiKeyApi() {
  return {
    listByUserId: () => {
      return request({
        url: 'api/trade/api/listByUserId',
        method: 'get',
        params: {},
      });
    },
    add: (params) => {
      return request({
        url: 'api/trade/api/save',
        method: 'post',
        data: params,
      });
    },
    update: (params) => {
      return request({
        url: 'api/trade/api/update',
        method: 'post',
        data: params,
      });
    },
    delete: (params) => {
      return request({
        url: 'api/trade/api/delete',
        method: 'post',
        data: params,
      });
    },
  };
}

export function useExchangeApi() {
  return {
    balance: (params) => {
      return request({
        url: 'api/trade/exchange/account/balance',
        method: 'get',
        params,
      });
    },
    lever: (params) => {
      return request({
        url: 'api/trade/exchange/lever',
        method: 'get',
        params,
      });
    },
    price: (params) => {
      return request({
        url: `api/trade/exchange/price`,
        method: 'get',
        params,
      });
    },
    instrument: (params) => {
      return request({
        url: `api/trade/exchange/instrument`,
        method: 'get',
        params,
      });
    },
    getConvertContractCoin: (params) => {
      return request({
        url: `api/trade/exchange/convert-contract-coin`,
        method: 'get',
        params,
      });
    }
  };
}
export function useStrategyApi() {
  return {
    checkBacktestData: (params) => {
      return request({
        url: 'api/trade/strategy/check-backtest-data',
        method: 'get',
        params,
      });
    },
    listCurrent: (params) => {
      return request({
        url: 'api/trade/strategy/current/list',
        method: 'get',
        params,
      });
    },
    listHistory: (params) => {
      return request({
        url: 'api/trade/strategy/history/list',
        method: 'get',
        params,
      });
    },
    getTotalFloatFL: () => {
      return request({
        url: 'api/trade/strategy/floatFL/total',
        method: 'get'
      });
    },
    add: (params) => {
      return request({
        url: 'api/trade/strategy/save',
        method: 'post',
        data: params,
      });
    },
    update: (params) => {
      return request({
        url: 'api/trade/strategy/update',
        method: 'post',
        data: params,
      });
    },
    delete: (params) => {
      return request({
        url: 'api/trade/strategy/delete',
        method: 'post',
        data: params,
      });
    },
    openWS: (params) => {
      return request({
        url: 'api/trade/strategy/openWS',
        method: 'get',
        params,
      });
    },
    subscribe: (params) => {
      return request({
        url: 'api/trade/strategy/subscribe',
        method: 'get',
        params,
      });
    },
    unsubscribe: (params) => {
      return request({
        url: 'api/trade/strategy/unsubscribe',
        method: 'get',
        params,
      });
    },
    closeWS: (params) => {
      return request({
        url: 'api/trade/strategy/closeWS',
        method: 'get',
        params,
      });
    },
    getMessage: (params) => {
      return request({
        url: 'api/trade/strategy/getMessage',
        method: 'get',
        params,
      });
    },
    oneKeyStart: (params) => {
      return request({
        url: 'api/trade/strategy/onkey-start',
        method: 'post',
        data: params,
      });
    },
    start: (params) => {
      return request({
        url: 'api/trade/strategy/start',
        method: 'get',
        params,
      });
    },
    stop: (params) => {
      return request({
        url: 'api/trade/strategy/stop',
        method: 'get',
        params,
      });
    },
    pause: (params) => {
      return request({
        url: 'api/trade/strategy/pause',
        method: 'get',
        params,
      });
    },
    proceed: (params) => {
      return request({
        url: 'api/trade/strategy/proceed',
        method: 'get',
        params,
      });
    },
    dcstate: (params) => {
      return request({
        url: 'api/trade/strategy/dcstate',
        method: 'get',
        params,
      });
    },
    statistics: (params) => {
      return request({
        url: 'api/trade/strategy/statistics',
        method: 'get',
        params,
      });
    },
  };
}
export function useReportApi() {
  return {
    getAllOrdersByUserId: (params) => {
      return request({
        url: 'api/trade/report/orders/list',
        method: 'get',
        params,
      });
    },
    listInstIds: (params) => {
      return request({
        url: 'api/trade/report/instIds',
        method: 'get',
        params
      });
    }
  }
}
export function useStrategyParamApi() {
  return {
    list: (strategyParamId) => {
      return request({
        url: `api/trade/strategy_param/${strategyParamId}`,
        method: 'get',
      });
    },
  };
}

export function useOrderApi() {
  return {
    listCurrent: (params) => {
      return request({
        url: `api/trade/hold_order/list`,
        method: 'get',
        params,
      });
    },
    listHistory: (params) => {
      return request({
        url: `api/trade/his_order/list`,
        method: 'get',
        params,
      });
    },
  };
}

export function useProfitApi() {
  return {
    getProfit: (params) => {
      return request({
        url: 'api/trade/profit/current',
        method: 'get',
        params,
      });
    },
    add: (params) => {
      return request({
        url: 'api/trade/profit/save',
        method: 'post',
        data: params,
      });
    },
    update: (params) => {
      return request({
        url: 'api/trade/profit/update',
        method: 'post',
        data: params,
      });
    },
    delete: (params) => {
      return request({
        url: 'api/trade/profit/delete',
        method: 'post',
        data: params,
      });
    },
  };
}

export function useWalletApi() {
  return {
    getWallet: (params) => {
      return request({
        url: 'api/trade/wallet/current',
        method: 'get',
        params,
      });
    },
  };
}
export function useWalletFlowApi() {
  return {
    list: (params) => {
      return request({
        url: 'api/trade/walletflow/list',
        method: 'get',
        params,
      });
    },
    add: (params) => {
      return request({
        url: 'api/trade/walletflow/save',
        method: 'post',
        data: params,
      });
    },
    update: (params) => {
      return request({
        url: 'api/trade/walletflow/update',
        method: 'post',
        data: params,
      });
    },
    delete: (params) => {
      return request({
        url: 'api/trade/walletflow/delete',
        method: 'post',
        data: params,
      });
    },
  };
}
export function useOpsApi() {
  return {
    refreshHoldPrice: (params) => {
      return request({
        url: 'api/trade/ops/hold/price/refresh',
        method: 'get',
        params,
      });
    },
    refreshStrategies: (params) => {
      return request({
        url: 'api/trade/ops/strategy/refresh',
        method: 'get',
        params,
      });
    }
  }
}

