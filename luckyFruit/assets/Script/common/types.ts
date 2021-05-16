export interface IUserInfo {
  balance: number,
  userId: number,
  loginId: string,
  password: string,
  pokerChips: number,
  winChips: number,
}

export interface ILotteryResult {
  cardGroup: string[];
  cardGroupType : string;
  chipInValue: number;
  win: number;
  triggerCard: string;
}
