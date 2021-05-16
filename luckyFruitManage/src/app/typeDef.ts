export enum sex {
    GIRL = 'GIRL',
    BOY = 'BOY',
}

export enum guessGameValueType {
  BALANCE = 'BALANCE',
  BONUS_POINT = 'BONUS_POINT',
}
export enum guessGameValueTypeLabMap {
  BALANCE = '余额',
  BONUS_POINT = '积分',
}
export enum gameWinner {
  HEAD = 'HEAD',
  TAIL = 'TAIL',
}
export enum gameWinnerLabMap {
  HEAD = '正方',
  TAIL = '反正',
}
/** 全局事件 */
export enum globalEvent {
    NO_LOGIN = 'NO_LOGIN',
}
/** 权限菜单类型 */
export enum menuType {
    CATALOG = 'CATALOG',
    MENU = 'MENU',
    MODULE = 'MODULE',
    API = 'API',
}
/** 服务器返回code */
export enum serverCode {
  SUCCESS = 0,
  NO_LOGIN_ERROR_CODE = 401,
}

export const payType = {
  WECHAT: 'WECHAT',
  ALIPAY: 'ALIPAY',
};
export const uploadType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
};
export const payTypeLabMap: {[key: string]: string} = {
  WECHAT: '微信',
  ALIPAY: '支付宝',
};
export enum guessGameStatusType {
  UN_START = 'UN_START',
  DOING = 'DOING',
  STOP = 'STOP',
  END = 'END',
  CANCEL = 'CANCEL',
}
export enum guessGameStatusTypeLabMap {
  UN_START = '未开始',
  DOING = '开猜',
  STOP = '已封盘',
  END = '已结束',
  CANCEL = '已流局',
}
export enum guessBankerType {
  SYSTEM_BANKER = 'SYSTEM_BANKER',
  USER_BANKER = 'USER_BANKER',
}
export enum guessBankerTypeLabMap {
  SYSTEM_BANKER = '系统竞猜',
  USER_BANKER = '用户竞猜',
}
/**  系统类型 */
export enum systemType {
  ALL = 'ALL',
  ADMIN = 'ADMIN',
  ACCOUNT = 'ACCOUNT',
  LIVEAPP = 'LIVEAPP',
  SHIROPAY = 'SHIROPAY',
  BASKETBALL_AGENT = 'BASKETBALL_AGENT',
  GAME_ANIME_MUSIC = 'GAME_ANIME_MUSIC',
  GIFT_GAME = 'GIFT_GAME',
}

export const projectType = {
  COMMON: 'COMMON',
  QIDIANLIVE: 'QIDIANLIVE',
  QIUYUANJINGJI: 'QIUYUANJINGJI',
  GUESS_ANIME_MUSIC: 'GUESS_ANIME_MUSIC',
  GIFT_GAME: 'GIFT_GAME',
};
export enum projectTypeLabMap {
  COMMON = '公用',
  QIDIANLIVE = '奇点直播',
  QIUYUANJINGJI = '球员经济',
  GUESS_ANIME_MUSIC = '动漫猜歌',
  GIFT_GAME = '礼物游戏',
}

/** app */
