export interface IUserInfo {
  balance: number,
  id: number,
  loginId: string,
  password: string,
  pokerChips: number,
  tenantId: number,
  winChips: number,
}

export interface ILotteryResult {
  cardGroup: string[];
  cardGroupType : string;
  chipInValue: number;
  win: number;
  triggerCard: string;
}
