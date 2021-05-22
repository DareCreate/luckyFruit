import http from './http';
export default {
  drawLottery(params: {
    chipInQOS: { signType: string, value: number }[],
  }) {
    return http.post(`/core/drawLottery`, params);
  },
  comparePoint(params: {
    comparePointType: 'BIGGER' | 'LOWER' | 'TIED',
  }) {
    return http.post(`/core/comparePoint`, params);
  },
  insertCoins(params: {
    coins: number,
  }) {
    return http.put(`/core/insertCoins`, params);
  },
  outCoins() {
    return http.put(`/core/outCoins`, null);
  },
  winChipsChangePokerChips(params: { winChips: number }) {
    return http.put(`/core/winChipsChangePokerChips`, params);
  },
  drawLotteryTestLogin(params: {
    cardGroupType: string,
    chipInQOS: { signType: string, value: number }[],
  }) {
    return http.post(`/core/drawLotteryTestLogin`, params);
  },
  getGiftCode(params: { balance: number }) {
    return http.post(`/giftCode/getGiftCode`, params);
  },
  getGiftCodeVOS() {
    return http.post(`/giftCode/getGiftCodeVOS`, null);
  },
};
