const {ccclass, property} = cc._decorator;

@ccclass
export default class MultipleCtrl extends cc.Component {
  onLoad() {
    this.initView();
  }
  _multipleCount: number = 1;
  get multipleCount() {
    return this._multipleCount;
  }
  set multipleCount(count: number) {
    this._multipleCount = count;
    this.countLab.string = `${count}倍`;
  }
  countLab: cc.Label;
  multipleSelectArr: number[] = [1, 5, 10, 50, 100];
  multipleSelectIndex: number = 0;
  enabledClick: boolean = true;
  initView() {
    this.countLab = this.node.getChildByName('count').getComponent(cc.Label);
  }
  onChangeMultipleButtonClick(ev: cc.Event.EventCustom, dir: 'left' | 'right') {
    if (!this.enabledClick) {
      return;
    }
    if (dir === 'left' && this.multipleSelectIndex <= 0) {
      return;
    }
    if (dir === 'right' && this.multipleSelectIndex >= this.multipleSelectArr.length - 1) {
      return;
    }
    this.node.dispatchEvent(new cc.Event.EventCustom('onMultipleChangeBefore', true));
    this.multipleSelectIndex += dir === 'left' ? -1 : 1;
    this.multipleCount = this.multipleSelectArr[this.multipleSelectIndex];
  }
  setDisabled() {
    this.enabledClick = false;
  }
  setEnabled() {
    this.enabledClick = true;
  }
}
