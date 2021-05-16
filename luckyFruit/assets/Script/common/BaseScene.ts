import BaseController from "./BaseController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseScene extends BaseController {
  start() {
    this.OnStart();
  }
  OnStart() {}
  onDestroy() {
    super.onDestroy();
  }
}
