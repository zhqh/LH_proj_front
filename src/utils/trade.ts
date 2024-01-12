export const tradeTypeMap = {
  SPOT: 'tradeType.SPOT',
  MARGIN: 'tradeType.MARGIN',
  SWAPUSDT: 'tradeType.SWAPUSDT',
  SWAPCOIN: 'tradeType.SWAPCOIN',
};
export const typeMap = {
  steady: 'type.steady',
  radical: 'type.radical',
};
export const nameDescMap = {
  SimpleGrid: 'strategy_name.SimpleGrid',
  CustomGrid: 'strategy_name.CustomGrid',
  LongShortHedgingGrid: 'strategy_name.LongShortHedgingGrid',
  TrendTrade: 'strategy_name.TrendTrade',
  ReboundTrade: 'strategy_name.ReboundTrade',
};
export const directionNameMap = {
  opposite: 'direction.opposite',
  trend: 'direction.trend',
};
export const profitModeNameMap = {
  single: 'profitMode.single',
  entire: 'profitMode.entire',
};
export const triggerConditionNameMap = {
  price: 'triggerCondition.price',
  immediately: 'triggerCondition.immediately',
};
export const loopModeNameMap = {
  loop: 'loopMode.loop',
  onetime: 'loopMode.onetime',
};
export const afterLossNameMap = {
  continue_: 'afterLoss.continue_',
  stop: 'afterLoss.stop',
};
export const targetProfitConditionNameMap = {
  rate: 'profitCondition.rate',
  gainThenFall: 'profitCondition.gainThenFall',
  // break5DaysAvg: '突破5日均线',
};
export const lossConditionNameMap = {
  none: 'lossCondition.none',
  rate: 'lossCondition.rate',
  // break5DaysAvg: '突破5日均线',
};
export function getTradeTypeNameDesc(type: string, globalProperties: object) {
  return type && globalProperties.$t(tradeTypeMap[type]);
}
export function getTypeNameDesc(type: string, globalProperties: object) {
  return type && globalProperties.$t(typeMap[type]);
}
export function getNameDesc(name: string, globalProperties: object) {
  return name && globalProperties.$t(nameDescMap[name]);
}
export function getDirectionNameDesc(name: string, globalProperties: object) {
  return name && globalProperties.$t(directionNameMap[name]);
}
export function getProfitModeNameDesc(name: string, globalProperties: object) {
  return name && globalProperties.$t(profitModeNameMap[name]);
}
export function gettriggerConditionNameDesc(name: string, globalProperties: object) {
  return name && globalProperties.$t(triggerConditionNameMap[name]);
}
export function getLoopModeNameDesc(name: string, globalProperties: object) {
  return name && globalProperties.$t(loopModeNameMap[name]);
}
export function getAfterLossNameDesc(name: string, globalProperties: object) {
  return name && globalProperties.$t(afterLossNameMap[name]);
}
export function getTargetProfitConditionNameDesc(name: string, globalProperties: object) {
  return name && globalProperties.$t(targetProfitConditionNameMap[name]);
}
export function getLossConditionNameDesc(name: string, globalProperties: object) {
  return name && globalProperties.$t(lossConditionNameMap[name]);
}

const pieceCoinMap = {};
pieceCoinMap['BTC'] = 0.001;
pieceCoinMap['ETH'] = 0.01;
pieceCoinMap['ETC'] = 10;
pieceCoinMap['LTC'] = 1;
pieceCoinMap['DOGE'] = 1000;
pieceCoinMap['SHIB'] = 1000000;
pieceCoinMap['FIL'] = 0.1;
pieceCoinMap['OMG'] = 1;
pieceCoinMap['DOT'] = 1;
pieceCoinMap['SOL'] = 1;
pieceCoinMap['ALGO'] = 10;
pieceCoinMap['TRX'] = 1000;
pieceCoinMap['BNB'] = 0.01;
pieceCoinMap['USDC'] = 10;
pieceCoinMap['COMP'] = 0.1;
pieceCoinMap['XCH'] = 0.01;
pieceCoinMap['XMR'] = 0.1;
pieceCoinMap['DASH'] = 0.1;
pieceCoinMap['EOS'] = 10;
pieceCoinMap['LINK'] = 1;
export function getCoinOfOnePiece(instId: string) {
  const coin = getCoin(instId);
  const coinQuantity = pieceCoinMap[coin];
  return coinQuantity || 0.01;
}
const pieceUSDTMap = {};
pieceUSDTMap['BTC'] = 100;
pieceUSDTMap['ETH'] = 10;
pieceUSDTMap['ETC'] = 10;
pieceUSDTMap['LTC'] = 10;
pieceUSDTMap['DOGE'] = 10;
pieceUSDTMap['FIL'] = 10;
pieceUSDTMap['DOT'] = 10;
pieceUSDTMap['ALGO'] = 10;
pieceUSDTMap['TRX'] = 10;
pieceUSDTMap['XMR'] = 10;
pieceUSDTMap['DASH'] = 10;
pieceUSDTMap['EOS'] = 10;
pieceUSDTMap['LINK'] = 10;
export function getUSDTOfOnePiece(instId: string) {
  const coin = getCoin(instId);
  const usdtQuantity = pieceUSDTMap[coin];
  return usdtQuantity || 10;
}
function getCoin(instId) {
  const index = instId.indexOf('-');
  return instId.substring(0, index);
}
export function map2List(map, globalProperties) {
  const list = [];
  for (const key in map) {
    list.push({ text: globalProperties.$t(map[key]), value: key });
  }
  return list;
}
