import { ILotteryResult, IUserInfo } from "../common/types";
import AudioCtrl from "../component/AudioCtrl";
import { cardType, cardGroupType, cardTypeWithNodeNameMap, GameStateType, triggerCardWithFruitTypeMap } from "../common/typeDef";
import { delayTime, copyObject } from "../common/comTool";
import apiGame from "../services/apiGame";
import apiAccount from "../services/apiAccount";
import MultipleCtrl from "../component/MultipleCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainGame extends cc.Component {

  _curActiveLight: number;
  get curActiveLight() {
    return this._curActiveLight;
  }
  set curActiveLight(index: number) {
    if (this.fruitLightsWrap.children[this._curActiveLight]) {
      this.fruitLightsWrap.children[this._curActiveLight].active = false;
    }
    this._curActiveLight = index;
    if (!this.fruitLightsWrap.children[index]) {
      return;
    }
    this.fruitLightsWrap.children[index].active = true;
  }
  userInfo: IUserInfo;
  fruitLightsWrap: cc.Node;
  audioCtrl: AudioCtrl;
  coinOperatedWrap: cc.Node;
  insertCoinsDialog: cc.Node;
  interfaceHelpDialog: cc.Node;
  menuDialog: cc.Node;
  fruitButtons: cc.Node;
  pointLab: cc.Label;
  creditLab: cc.Label;
  bonusWinLab: cc.Label;
  blanceCountLab: cc.Label;
  idCountLab: cc.Label;
  compareSmallBtn: cc.Button;
  compareBigBtn: cc.Button;
  startBtn: cc.Button;
  pointRightBtn: cc.Button;
  pointLeftBtn: cc.Button;
  multipleCtrl: MultipleCtrl;
  operatedCoinCountMap: {[key: string]: number };
  /** 倍数 */
  loading: boolean = false;
  rangeOfCompare = 0;
  gameState: string;
  lastOpertatedCoin: {[key: string]: number };
  onLoad() {
    this.initView();
    this.initEvent();
    this.insertCoinsDialog.active = true;
    this.interfaceHelpDialog.active = false;
    this.menuDialog.active = false;
    this.operatedCoinCountMap = null;
    this.outCoins();
    this.updateGameState(GameStateType.UN_START);
    this.startBtn.interactable = false;
    window['testLottery'] = (cardGroupType: string) => {
      this.testLottery(cardGroupType);
    };
  }
  scheduleTimeMap: {[key: string]: number};
  initEvent() {
    this.node.on('onMultipleChangeBefore', this.onMultipleChangeBefore, this);
    this.node.on('onShouldUpdateUserInfo', this.getUserInfo, this);
  }
  onMultipleChangeBefore(event: cc.Event.EventCustom) {
    this.resetOperatedCoin();
    event.stopPropagation();
  }
  async outCoins() {
    const userInfo = await this.getUserInfo();
    if (userInfo == null) {
      return;
    }
    const { winChips, pokerChips } = userInfo;
    if (!pokerChips && !winChips) {
      return;
    }
    if (winChips) {
      await apiGame.winChipsChangePokerChips({ winChips });
    }
    if (winChips + pokerChips >= 10) {
      await apiGame.outCoins();
    }
    this.getUserInfo();
  }
  initView() {
    const machine = this.node.getChildByName('machine');
    this.fruitLightsWrap = machine.getChildByName('fruitLights');
    this.coinOperatedWrap = machine.getChildByName('coinOperated');
    this.curActiveLight = 0;
    this.audioCtrl = this.getComponent(AudioCtrl);
    this.insertCoinsDialog = this.node.getChildByName('insertCoinsDialog');
    const countWrap = machine.getChildByName('countWrap');
    this.creditLab = countWrap.getChildByName('credit').getComponent(cc.Label);
    this.bonusWinLab = countWrap.getChildByName('bonusWin').getComponent(cc.Label);
    const buttonsWrap = machine.getChildByName('buttons');
    this.compareSmallBtn = buttonsWrap.getChildByName('compareSmall').getComponent(cc.Button);
    this.compareBigBtn = buttonsWrap.getChildByName('compareBig').getComponent(cc.Button);
    this.startBtn = buttonsWrap.getChildByName('start').getComponent(cc.Button);
    this.pointRightBtn = buttonsWrap.getChildByName('pointRight').getComponent(cc.Button);
    this.pointLeftBtn = buttonsWrap.getChildByName('pointLeft').getComponent(cc.Button);
    this.pointLab = cc.find('point/pointCount', machine).getComponent(cc.Label);
    this.menuDialog = this.node.getChildByName('menuDialog');
    this.interfaceHelpDialog = this.node.getChildByName('interfaceHelpDialog');
    this.multipleCtrl = this.node.getChildByName('multiple').getComponent(MultipleCtrl);
    this.idCountLab = cc.find('userInfo/idLab', this.node).getComponent(cc.Label);
    this.blanceCountLab = cc.find('userInfo/balance/count', this.node).getComponent(cc.Label);
    this.fruitButtons = machine.getChildByName('fruitButtons');
  }
  updateGameState(gameState: GameStateType) {
    this.gameState = gameState;
    if (gameState === GameStateType.UN_START) {
      this.initState();
      return;
    }
  }
  initState() {
    for(let signType in this.operatedCoinCountMap) {
      const countNode = this.coinOperatedWrap.getChildByName(signType);
      if (countNode == null) {
        return;
      }
      countNode.getComponent(cc.Label).string = '0';
    }
    if (this.lastOpertatedCoin) {
      let chipInCount = 0;
      for(let signType in this.lastOpertatedCoin) {
        const valCount = this.lastOpertatedCoin[signType];
        chipInCount += valCount;
      }
      if (chipInCount > +this.creditLab.string) {
        this.startBtn.interactable = false;
      }
    }
    this.multipleCtrl.setEnabled();
    this.operatedCoinCountMap = null;
    this.compareSmallBtn.interactable = false;
    this.compareSmallBtn.interactable = false;
    this.compareBigBtn.interactable = false;
    this.pointLeftBtn.interactable = false;
    this.pointRightBtn.interactable = false;
    this.turnOffAllLights();
    this.fruitLightsWrap.children[this.curActiveLight].active = true;
  }
  async getUserInfo():Promise<IUserInfo | null> {
    const res = await apiAccount.userInfo();
    if (!res.success) {
      return null;
    }
    this.setUserInfo(res.data);
    return res.data;
  }
  setUserInfo(userInfo: IUserInfo) {
    const { balance, userId, pokerChips, winChips } = userInfo;
    this.userInfo = userInfo;
    this.creditLab.string = String(pokerChips);
    this.bonusWinLab.string = String(winChips);
    this.blanceCountLab.string = String(balance * 10000 / 1000000);
    this.idCountLab.string = `ID:${userId}`;
  }
  async onInsertCoinsButtonClick(ev: cc.Event.EventCustom, coins: number) {
    const res = await apiGame.insertCoins({ coins });
    if (!res.success) {
      return;
    }
    this.getUserInfo();
    this.insertCoinsDialog.active = false;
  }
  async onComparePointButtonClick(ev: cc.Event.EventCustom, guess: 'BIGGER' | 'LOWER') {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.audioCtrl.stopAllEffects();
    const curWinPoint = +this.bonusWinLab.string;
    if (this.rangeOfCompare - curWinPoint > 0) {
      const winRes = await apiGame.winChipsChangePokerChips({ winChips: this.rangeOfCompare - curWinPoint });
      if (!winRes.success) {
        this.loading = false;
        return;
      }
    }
    const res = await apiGame.comparePoint({ comparePointType: guess });
    if (!res.success) {
      this.loading = false;
      return;
    }
    // 播放大小动画
    const { comparePointType, point, win } = res.data;
    this.rangeOfCompare = win;
    await this.lotteryPoint(point);
    this.loading = false;
    if (comparePointType === 'TIED') {
      return;
    }
    this.getUserInfo();
    if (comparePointType === guess) {
      await this.audioCtrl.playWinLotteryPointAudio();
      this.audioCtrl.playWinAudio();
      return;
    }
    this.audioCtrl.playFailLotteryPointAudio();
    this.updateGameState(GameStateType.UN_START);
  }
  lotteryPoint(point: number) {
    let pointCount = 0;
    let runCount = 13 + point;
    let delayTime = 0.01;
    this.pointLab.string = '0';
    return new Promise((resolve) => {
      const runCallFunction = () => {
        this.scheduleOnce(() => {
          this.audioCtrl.playHitAudio();
          delayTime += 0.01;
          pointCount += 1;
          if (pointCount === 14) {
            pointCount = 1;
          }
          this.pointLab.string = String(pointCount);
          runCount --;
          if (runCount <= 0) {
            resolve();
          } else {
            runCallFunction();
          }
        }, delayTime);
      };
      runCallFunction();
    });
  }
  async onChangeWinPointButtonClick(ev: cc.Event.EventCustom, dir: 'left' | 'right') {
    this.audioCtrl.stopAllEffects();
    this.audioCtrl.playDing();
    const curWinPoint = +this.bonusWinLab.string;
    const curCredit = +this.creditLab.string;
    const nextWinPoint = dir === 'left' ? curWinPoint + 1 : curWinPoint - 1;
    const nextCredit = dir === 'left' ? curCredit - 1 : curCredit + 1;
    if (nextWinPoint <= 0) {
      apiGame.winChipsChangePokerChips({ winChips: this.rangeOfCompare });
      await this.getUserInfo();
      this.updateGameState(GameStateType.UN_START);
      return;
    }
    if (nextWinPoint > this.rangeOfCompare) {
      return;
    }
    this.bonusWinLab.string = String(nextWinPoint);
    this.creditLab.string = String(nextCredit);
  }
  onShowInsertCoinsDialogButtonClick() {
    this.insertCoinsDialog.active = true;
  }
  onCloseInsertCoinsDialogButtonClick() {
    this.insertCoinsDialog.active = false;
  }
  async showGameRecordDialog() {
    console.log('显示游戏记录');
    const res = await apiGame.getMyPlayLogs();
    if (!res.success) {
      return;
    }
    console.log('游戏记录数据', res.data);
  }
  onShowGameRecordBtnClick() {
    this.showGameRecordDialog();
  }
  async runlotteryResult(result?: ILotteryResult) {
    const triggerCard = result.triggerCard;
    await this.playRotateAni(triggerCard);
    if (triggerCard === cardType.LUCK_1 || triggerCard === cardType.LUCK_2) {
      await delayTime(0.5);
      await this.audioCtrl.playHitLuklyAudio();
      if (result.cardGroupType === cardGroupType.SINGLE) {
        await delayTime(0.2);
        await this.audioCtrl.playLuklyFailAudio();
      }
    }
    if (result.cardGroupType !== cardGroupType.SINGLE) {
      await delayTime(0.2);
      await this.audioCtrl.playLuklySuccessAudio();
    }
    await this.runLightingEffect(result);
    if (result.win > 0) {
      this.audioCtrl.playWinAudio();
    }
  }
  async onStartLotteryButtonClick() {
    if (this.loading) {
      return;
    }
    this.pointLab.string = '0';
    if (this.gameState === GameStateType.LOTTERY_END) {
      this.audioCtrl.stopAllEffects();
      this.loading = true;
      const res = await apiGame.winChipsChangePokerChips({ winChips: this.rangeOfCompare });
      if (!res.success) {
        this.loading = false;
        return;
      }
      await this.getUserInfo();
      this.loading = false;
      this.updateGameState(GameStateType.UN_START);
      return;
    }
    if (this.gameState !== GameStateType.UN_START) {
      return;
    }
    this.startBtn.interactable = false;
    const chipInQOS = [];
    if (this.operatedCoinCountMap == null) {
      let chipAllCount = 0;
      for(let signType in this.lastOpertatedCoin) {
        const valCount = this.lastOpertatedCoin[signType] * this.multipleCtrl.multipleCount;
        chipAllCount += valCount;
      }
      if (chipAllCount > +this.creditLab.string) {
        return;
      }
      const lastOpertatedCoin = copyObject(this.lastOpertatedCoin);
      for(let signType in lastOpertatedCoin) {
        const signTypeCount = +lastOpertatedCoin[signType];
        for(let i = 0; i < signTypeCount; i++) {
          this.operatedCoin(signType);
        }
      }
    }
    let chipInCount = 0;
    for(let signType in this.operatedCoinCountMap) {
      const valCount = this.operatedCoinCountMap[signType] * this.multipleCtrl.multipleCount;
      chipInCount += valCount;
      chipInQOS.push({ signType, value: valCount });
    }
    if (chipInCount === 0) {
      return;
    }
    const params = { chipInQOS };
    const res = await apiGame.drawLottery(params);
    if (!res.success) {
      this.startBtn.interactable = true;
      return;
    }
    this.lastOpertatedCoin = copyObject(this.operatedCoinCountMap);
    this.multipleCtrl.setDisabled();
    const result = res.data as ILotteryResult;
    this.updateGameState(GameStateType.LOTTERYING);
    await this.runlotteryResult(result);
    this.updateGameState(GameStateType.LOTTERY_END);
    this.startBtn.interactable = true;
    if (result.win > 0) {
      this.rangeOfCompare = result.win;
      this.bonusWinLab.string = String(result.win);
      this.compareSmallBtn.interactable = true;
      this.compareBigBtn.interactable = true;
      this.pointLeftBtn.interactable = true;
      this.pointRightBtn.interactable = true;
      return;
    }
    this.updateGameState(GameStateType.UN_START);
  }
  onCoinOperatedButtonTouch(target: cc.Node) {
    const signType = target.name;
    this.operatedCoin(signType);
    this.audioCtrl.playDing();
  }
  operatedCoin(signType: string) {
    if (this.gameState !== GameStateType.UN_START) {
      return;
    }
    const creditCount = +this.creditLab.string;
    const nextCreditCount = creditCount - this.multipleCtrl.multipleCount;
    if (nextCreditCount < 0) {
      return;
    }
    this.creditLab.string = String(nextCreditCount);
    if (this.operatedCoinCountMap == null) {
      this.operatedCoinCountMap = {};
    }
    if (this.operatedCoinCountMap[signType] == null) {
      this.operatedCoinCountMap[signType] = 0;
    }
    this.operatedCoinCountMap[signType] += 1;
    const countNode = this.coinOperatedWrap.getChildByName(signType);
    if (countNode == null) {
      return;
    }
    countNode.getComponent(cc.Label).string = String(this.operatedCoinCountMap[signType]);
    this.startBtn.interactable = true;
    this.lastOpertatedCoin = null;
  }
  async playRotateAni(triggerCard: string) {
    const rotateCount = this.getDisCountFromCurCard(triggerCard);
    if (isNaN(rotateCount)) {
      return;
    }
    const startCount = 6;
    const endCount = 8;
    const runCount = 24 * 5 + rotateCount - (startCount + endCount) - 1;
    await this.playRotateStartAni(startCount);
    await this.playRotatingAni(runCount);
    await this.playRotateEndAni(endCount);
  }
  async runLightingEffect(result: ILotteryResult) {
    if (result.cardGroupType === cardGroupType.SINGLE && result.win > 0) {
      await this.audioCtrl.playFruitAudio(triggerCardWithFruitTypeMap[result.triggerCard])
    } else if (result.cardGroupType === cardGroupType.CONTINUITY) {
      await this.clockwiseAndAntiClockwiseLighting(result.cardGroup, result.triggerCard);
      await this.audioCtrl.playSendLightsEffect();
    } else if (result.cardGroupType === cardGroupType.DSX) {
      await this.clockwiseAndAntiClockwiseLighting(result.cardGroup, result.triggerCard);
      await this.audioCtrl.playDsxEffect();
    } else if (result.cardGroupType === cardGroupType.DSY) {
      await this.clockwiseAndAntiClockwiseLighting(result.cardGroup, result.triggerCard);
      await this.audioCtrl.playDsyEffect();
    } else if (result.cardGroupType === cardGroupType.XSY) {
      await this.clockwiseAndAntiClockwiseLighting(result.cardGroup, result.triggerCard);
      await this.audioCtrl.playXsyEffect();
    } else if (result.cardGroupType === cardGroupType.ZHSH) {
      const alternateArr = [
        [21, 22, 23, 24, 0, 1, 2, 3], [3, 4, 5, 6, 7, 8, 9],
        [9, 10, 11, 12, 13, 14, 15], [15, 16, 17, 18, 19, 20, 21], 
      ];
      let index = 0;
      [1, 6, 12, 19].some((item: number, itemIndex: number) => {
        const isInit = result.cardGroup.indexOf(cardTypeWithNodeNameMap[item]) > -1;
        if (isInit) {
          index = itemIndex;
        }
        return isInit;
      });
      const alternateCount = 4 * 3 + index + 1;
      await this.alternateLamp(alternateArr, alternateCount, result.triggerCard);
      await this.audioCtrl.playZhshEffect();
    } else if (result.cardGroupType === cardGroupType.XNSH) {
      const alternateArr = [[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23]];
      const cardGroupLast = result.cardGroup[result.cardGroup.length - 1];
      let index = cardTypeWithNodeNameMap[cardGroupLast] % 2;
      const alternateCount = 2 * 8 + index + 1;
      await this.alternateLamp(alternateArr, alternateCount, result.triggerCard);
      await this.audioCtrl.playXnshEffect();
    } else if (result.cardGroupType === cardGroupType.DMG) {
      await this.orderTurnOnLight(result.triggerCard);
      await this.audioCtrl.playDmgEffect();
    } else if (result.cardGroupType === cardGroupType.HC) {
      this.audioCtrl.playWuWuAudio();
      const indexArr = result.cardGroup.map(item => cardTypeWithNodeNameMap[item]);
      let head = indexArr[0];
      let count = 24;
      let dis = this.getDisCountFromCurCard(cardTypeWithNodeNameMap[head]);
      if (dis < 0) {
        dis += 24;
      }
      count += dis;
      await this.runAccordingToFixedCount(result.cardGroup.length, count, result.triggerCard);
      this.audioCtrl.stopAllEffects();
      await this.audioCtrl.playKhcEffect();
    }
  }
  runToNextLight() {
    this.curActiveLight = (this.curActiveLight + 1) % this.fruitLightsWrap.childrenCount;
  }
  playRotateStartAni(beginAndEndCount) {
    return new Promise((resolve) => {
      this.audioCtrl.playRotateStartAudio();
      this.schedule(() => {
        this.runToNextLight();
        if (beginAndEndCount <= 1) {
          resolve();
        }
        beginAndEndCount --;
      }, 0.2, beginAndEndCount - 1);
    });
  }
  playRotateEndAni(beginAndEndCount: number) {
    return new Promise((resolve) => {
      this.audioCtrl.playRotateEndAudio();
      this.schedule(() => {
        this.runToNextLight();
        if (beginAndEndCount <= 1) {
          this.audioCtrl.playDing();
          resolve();
        }
        beginAndEndCount --;
      }, 0.12, beginAndEndCount - 1);
    });
  }
  playRotatingAni(rotatingCount: number) {
    return new Promise((resolve) => {
      this.audioCtrl.playRotatingAudio();
      this.schedule(() => {
        rotatingCount --;
        this.runToNextLight();
        if (rotatingCount <= 0) {
          this.audioCtrl.stopRotatingAudio();
          resolve();
        }
      }, 0, rotatingCount);
    });
  }
  /** 正反跑灯 */
  clockwiseAndAntiClockwiseLighting(lightArr: string[], triggerCard: string) {
    return new Promise(resolve => {
      let curLight: number = cardTypeWithNodeNameMap[triggerCard];
      const lightedArr = [curLight];
      let dir = 1;
      let lightIndex = 0;
      const runToNext = async () => {
        if (lightedArr.indexOf(curLight) === -1) {
          this.turnOffLights(curLight);
        }
        curLight += dir + 24;
        curLight %= 24;
        this.turnOnLights(curLight);
        if (cardTypeWithNodeNameMap[curLight] === lightArr[lightIndex]) {
          lightedArr.push(curLight);
          lightIndex ++;
          dir *= -1;
          this.audioCtrl.playLightBoo();
          if (lightIndex <= lightArr.length - 1) {
            await delayTime(0.8);
            this.audioCtrl.playSendLightsAudio();
            runToNext();
          } else {
            this.audioCtrl.stopSendLightsAudio();
            resolve();
          }
        } else {
          await delayTime(0.05);
          runToNext();
        }
      }
      runToNext();
      this.audioCtrl.playSendLightsAudio();
    })
  }
  /** 交替换灯 */
  alternateLamp(alternateArr: number[][], alternateCount: number, triggerCard: string) {
    return new Promise(resolve => {
      let alternate = 0;
      this.audioCtrl.playAlternateAudio();
      const alternateCallBack = () => {
        this.scheduleOnce(() => {
          this.turnOffAllLights();
          const lightArr = alternateArr[alternate];
          lightArr.forEach(item => {
            this.turnOnLights(item);
          });
          alternate += 1;
          alternate %= alternateArr.length;
          alternateCount --;
          if (alternateCount <= 0) {
            this.audioCtrl.stopAllEffects();
            resolve();
          } else {
            alternateCallBack();
          }
        }, 0.2);
      };
      alternateCallBack();
    });
  }
  /** 顺序亮灯 */
  orderTurnOnLight(triggerCard: string) {
    this.audioCtrl.playAlternateAudio();
    return new Promise(resolve => {
      let triggerCardIndex = cardTypeWithNodeNameMap[triggerCard];
      let runCount =  24;
      this.schedule(() => {
        triggerCardIndex += 1;
        runCount --;
        this.turnOnLights(triggerCardIndex);
        if (runCount <= 0) {
          this.audioCtrl.stopAllEffects();
          resolve();
        }
      }, 0.2, runCount - 1);
    });
  }
  /** 按照一定数量亮灯 */
  runAccordingToFixedCount(fixedCount: number, runCount: number, triggerCard: string) {
    return new Promise(resolve => {
      let triggerCardIndex = cardTypeWithNodeNameMap[triggerCard];
      let lightArr = [triggerCardIndex];
      this.schedule(() => {
        this.turnOffAllLights();
        this.turnOnLights(cardTypeWithNodeNameMap[triggerCard]);
        if (lightArr.length < fixedCount) {
          lightArr.push(lightArr[lightArr.length - 1] + 1);
        } else {
          lightArr = lightArr.map(item => {
            return item + 1;
          });
        }
        lightArr.forEach(item => {
          this.turnOnLights(item);
        });
        runCount --;
        if (runCount <= 0) {
          this.audioCtrl.stopAllEffects();
          resolve();
        }
      }, 0.1, runCount - 1);
    });
  }
  getDisCountFromCurCard(triggerCard: string) {
    return cardTypeWithNodeNameMap[triggerCard] - this.curActiveLight;
  }
  turnOnLights(lightIndex: number) {
    lightIndex %= this.fruitLightsWrap.childrenCount;
    this.fruitLightsWrap.children[lightIndex].active = true;
  }
  turnOffLights(lightIndex: number) {
    lightIndex %= this.fruitLightsWrap.childrenCount;
    this.fruitLightsWrap.children[lightIndex].active = false;
  }
  turnOffAllLights() {
    this.fruitLightsWrap.children.forEach(item => {
      item.active = false;
    });
  }
  onShowMenuDialogButtonClick() {
    this.menuDialog.active = true;
  }
  onCloseMenuDialogButtonClick() {
    this.menuDialog.active = false;
  }
  onBackButtonClick() {
    cc.director.loadScene('Login');
  }
  onShowInterfaceHelpDialogButtonClick() {
    this.interfaceHelpDialog.active = true;
  }
  onCloseInterfaceHelpDialogButtonClick() {
    this.interfaceHelpDialog.active = false;
  }
  onOutCoinsButtonClick() {
    this.outCoins();
  }
  resetOperatedCoin() {
    let nextCreditCount = +this.creditLab.string;
    for(let signType in this.operatedCoinCountMap) {
      nextCreditCount += this.operatedCoinCountMap[signType] * this.multipleCtrl.multipleCount
      const countNode = this.coinOperatedWrap.getChildByName(signType);
      if (countNode == null) {
        return;
      }
      countNode.getComponent(cc.Label).string = '0';
    }
    this.creditLab.string = String(nextCreditCount);
    this.operatedCoinCountMap = null;
  }
  async testLottery(cardGroupType: string) {
    if (this.loading) {
      return;
    }
    this.pointLab.string = '0';
    if (this.gameState === GameStateType.LOTTERY_END) {
      this.audioCtrl.stopAllEffects();
      this.loading = true;
      await apiGame.winChipsChangePokerChips({ winChips: this.rangeOfCompare });
      await this.getUserInfo();
      this.loading = false;
      this.updateGameState(GameStateType.UN_START);
      return;
    }
    if (this.gameState !== GameStateType.UN_START) {
      return;
    }
    this.startBtn.interactable = false;
    const chipInQOS = [];
    let chipInCount = 0;
    if (this.operatedCoinCountMap == null) {
      const lastOpertatedCoin = copyObject(this.lastOpertatedCoin);
      for(let signType in lastOpertatedCoin) {
        const signTypeCount = +lastOpertatedCoin[signType];
        for(let i = 0; i < signTypeCount; i++) {
          this.operatedCoin(signType);
        }
      }
    }
    for(let signType in this.operatedCoinCountMap) {
      const valCount = this.operatedCoinCountMap[signType] * this.multipleCtrl.multipleCount;
      chipInCount += valCount;
      chipInQOS.push({ signType, value: valCount });
    }
    if (chipInCount === 0) {
      return;
    }
    const params = { chipInQOS, cardGroupType };
    const res = await apiGame.drawLotteryTestLogin(params);
    if (!res.success) {
      this.startBtn.interactable = true;
      return;
    }
    this.lastOpertatedCoin = copyObject(this.operatedCoinCountMap);
    this.multipleCtrl.setDisabled();
    const result = res.data as ILotteryResult;
    this.updateGameState(GameStateType.LOTTERYING);
    await this.runlotteryResult(result);
    this.updateGameState(GameStateType.LOTTERY_END);
    this.startBtn.interactable = true;
    if (result.win > 0) {
      this.rangeOfCompare = result.win;
      this.bonusWinLab.string = String(result.win);
      this.compareSmallBtn.interactable = true;
      this.compareBigBtn.interactable = true;
      this.pointLeftBtn.interactable = true;
      this.pointRightBtn.interactable = true;
      return;
    }
    this.updateGameState(GameStateType.UN_START);
  }
  @property({
    type: cc.Prefab,
  })
  exchangeDialogPreb: cc.Prefab = null;
  exchangeDialog: cc.Node = null;
  onShowExchangeDialogButtonClick() {
    if (this.exchangeDialog == null) {
      const exchangeDialog = cc.instantiate(this.exchangeDialogPreb);
      this.node.addChild(exchangeDialog);
      this.exchangeDialog = exchangeDialog;
    }
    this.exchangeDialog.active = true;
  }
  onQuitGameBtnClick() {
    (window.postMessage as any)('QUIT_GAME');
  }
}
