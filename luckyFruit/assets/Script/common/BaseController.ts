import { IUserInfo } from "./types";

const {ccclass, property} = cc._decorator;
const eventNode = new cc.Node();
let globalUserInfo = null;


@ccclass
export default class BaseController extends cc.Component {
  private _regEventArr: { type: string, callBack: Function }[] = [];
  OnEvent(type: string, callBack: Function, target?: any, useCapture?: boolean) {
    this._regEventArr.push({
      type,
      callBack,
    });
    eventNode.on(type, callBack, target, useCapture);
  }
  OffEvent(type: string, callBack: Function, target?: any, useCapture?: boolean) {
    eventNode.off(type, callBack, target, useCapture);
  }
  onDestroy() {
    this._regEventArr.forEach(eventInfo => {
      this.OffEvent(eventInfo.type, eventInfo.callBack);
    });
    this._regEventArr = null;
  }
  TriggerEvent(type: string, ...arg: any[]) {
    eventNode.emit(type, ...arg);
  }
  SetUserInfo(userInfo: IUserInfo) {
    globalUserInfo = userInfo
  }
}
