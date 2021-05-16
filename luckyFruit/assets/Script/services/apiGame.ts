import http from './http';
export default {
  drawLottery(params: {
    chipInQOS: { signType: string, value: number }[],
  }) {
    return http.post(`/luckyFruit/drawLottery`, params);
  },
  comparePoint(params: {
    comparePointType: 'BIGGER' | 'LOWER' | 'TIED',
  }) {
    return http.post(`/luckyFruit/comparePoint`, params);
  },
  insertCoins(params: {
    coins: number,
  }) {
    return http.put(`/luckyFruit/insertCoins`, params);
  },
  outCoins() {
    return http.put(`/luckyFruit/outCoins`, null);
  },
  winChipsChangePokerChips(params: { winChips: number }) {
    return http.put(`/luckyFruit/winChipsChangePokerChips`, params);
  },
  drawLotteryTestLogin(params: {
    cardGroupType: string,
    chipInQOS: { signType: string, value: number }[],
  }) {
    return http.post(`/luckyFruit/drawLotteryTestLogin`, params);
  },
  getMyPlayLogs() {
    return http.get('/luckyFruit/getMyPlayLogs')
  }
};
