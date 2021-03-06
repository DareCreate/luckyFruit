/** 牌型 */
export const cardGroupType = {
  SINGLE: 'SINGLE',
  CONTINUITY: 'CONTINUITY',
  DMG: 'DMG',
  DSX: 'DSX',
  DSY: 'DSY',
  HC: 'HC',
  XNSH: 'XNSH',
  XSY: 'XSY',
  ZHSH: 'ZHSH',
};

export const cardType = {
  LUCK_1: 'LUCK_1',
  APPLE_1: 'APPLE_1',
  BELL_S_1: 'BELL_S_1',
  ORANGE_1: 'ORANGE_1',
  BELL_1: 'BELL_1',
  BAR_S_1: 'BAR_S_1',
  BAR_1: 'BAR_1', // 100
  APPLE_2: 'APPLE_2',
  APPLE_S_1: 'APPLE_S_1',
  MANGO_1: 'MANGO_1',
  WATERMELON_1: 'WATERMELON_1',
  WATERMELON_S_1: 'WATERMELON_S_1',
  LUCK_2: 'LUCK_2',
  APPLE_3: 'APPLE_3',
  ORANGE_S_1: 'ORANGE_S_1',
  ORANGE_2: 'ORANGE_2',
  BELL_2: 'BELL_2',
  SEVEN_S_1: 'SEVEN_S_1',
  SEVEN_1: 'SEVEN_1',
  APPLE_4: 'APPLE_4',
  MANGO_S_1: 'MANGO_S_1',
  MANGO_2: 'MANGO_2',
  STAR_1: 'STAR_1',
  STAR_S_1: 'STAR_S_1',
};

export enum cardTypeWithNodeNameMap {
  LUCK_1 = 0,
  APPLE_1 = 1,
  BELL_S_1 = 2,
  ORANGE_1 = 3,
  BELL_1 = 4,
  BAR_S_1 = 5,
  BAR_1 = 6,
  APPLE_2 = 7,
  APPLE_S_1 = 8,
  MANGO_1 = 9,
  WATERMELON_1 = 10,
  WATERMELON_S_1 = 11,
  LUCK_2 = 12,
  APPLE_3 = 13,
  ORANGE_S_1 = 14,
  ORANGE_2 = 15,
  BELL_2 = 16,
  SEVEN_S_1 = 17,
  SEVEN_1 = 18,
  APPLE_4 = 19,
  MANGO_S_1 = 20,
  MANGO_2 = 21,
  STAR_1 = 22,
  STAR_S_1 = 23,
};

export enum GameStateType {
  UN_START = 'UN_START',
  LOTTERYING = 'LOTTERYING',
  LOTTERY_END = 'LOTTERY_END',
};

export enum FruitType {
  BAR = 'BAR',
  SEVEN = 'SEVEN',
  STAR = 'STAR',
  WATERMELON = 'WATERMELON',
  BELL = 'BELL',
  MANGO = 'MANGO',
  ORANGE = 'ORANGE',
  APPLE = 'APPLE',
}

export const triggerCardWithFruitTypeMap = {
  LUCK_1: '',
  APPLE_1: FruitType.APPLE,
  BELL_S_1: FruitType.BELL,
  ORANGE_1: FruitType.ORANGE,
  BELL_1: FruitType.BELL,
  BAR_S_1: FruitType.BAR,
  BAR_1: FruitType.BAR,
  APPLE_2: FruitType.APPLE,
  APPLE_S_1: FruitType.APPLE,
  MANGO_1: FruitType.MANGO,
  WATERMELON_1: FruitType.WATERMELON,
  WATERMELON_S_1: FruitType.WATERMELON,
  LUCK_2: '',
  APPLE_3: FruitType.APPLE,
  ORANGE_S_1: FruitType.ORANGE,
  ORANGE_2: FruitType.ORANGE,
  BELL_2: FruitType.BELL,
  SEVEN_S_1: FruitType.SEVEN,
  SEVEN_1: FruitType.SEVEN,
  APPLE_4: FruitType.APPLE,
  MANGO_S_1: FruitType.MANGO,
  MANGO_2: FruitType.MANGO,
  STAR_1: FruitType.STAR,
  STAR_S_1: FruitType.STAR,
};

