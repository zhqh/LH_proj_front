import moment from 'moment';
export const instIds = [
  { text: 'BTC-USDT', value: 'BTC-USDT' },
  { text: 'ETH-USDT', value: 'ETH-USDT' },
  { text: 'ETC-USDT', value: 'ETC-USDT' },
  { text: 'LTC-USDT', value: 'LTC-USDT' },
  { text: 'DOGE-USDT', value: 'DOGE-USDT' },
  { text: 'SHIB-USDT', value: 'SHIB-USDT' },
  { text: 'FIL-USDT', value: 'FIL-USDT' },
  { text: 'NFT-USDT', value: 'NFT-USDT' },
  { text: 'OMG-USDT', value: 'OMG-USDT' },
  { text: 'USDT-USDC', value: 'USDT-USDC' },
  { text: 'OKB-USDT', value: 'OKB-USDT' },
  { text: 'OKT-USDT', value: 'OKT-USDT' },
  { text: 'DOT-USDT', value: 'DOT-USDT' },
  { text: 'SOL-USDT', value: 'SOL-USDT' },
  { text: 'CORE-USDT', value: 'CORE-USDT' },
  { text: 'ALGO-USDT', value: 'ALGO-USDT' },
  { text: 'TRX-USDT', value: 'TRX-USDT' },
  { text: 'BNB-USDT', value: 'BNB-USDT' },
  { text: 'USDC-USDT', value: 'USDC-USDT' },
  { text: 'COMP-USDT', value: 'COMP-USDT' },
  { text: 'XCH-USDT', value: 'XCH-USDT' },
  { text: 'XMR-USDT', value: 'XMR-USDT' },
  { text: 'XPR-USDT', value: 'XPR-USDT' },
  { text: 'DAO-USDT', value: 'DAO-USDT' },
  { text: 'DASH-USDT', value: 'DASH-USDT' },
  { text: 'EOS-USDT', value: 'EOS-USDT' },
  { text: 'LINK-USDT', value: 'LINK-USDT' },
  { text: 'LUNC-USDT', value: 'LUNC-USDT' },
  { text: 'LUNA-USDT', value: 'LUNA-USDT' },
  { text: 'MATIC-USDT', value: 'MATIC-USDT' },
];

export function test(n) {
  const day = moment(new Date()).subtract(n, 'days');
  return day;
}
