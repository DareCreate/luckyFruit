import apiGame from "../services/apiGame";
import { webCopyString } from "../common/comTool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeDialog extends cc.Component {
  @property({
    type: cc.Prefab,
  })
  exchangeRecordDialogPreb: cc.Prefab = null;

  inputText: string;
  exchangeCodeDialog: cc.Node;
  exchangeCodeLab: cc.Label;
  exchangeCode: string;
  onLoad() {
    this.initView();
    this.exchangeCodeDialog.active = false;
  }
  initView() {
    this.exchangeCodeDialog = this.node.getChildByName('exchangeCodeDialog');
    this.exchangeCodeLab = this.exchangeCodeDialog.getChildByName('code').getComponent(cc.Label);
  }
  onExchangeInputChange(inputText: string, b) {
    this.inputText = inputText;
  }
  async onExchangeButtonClick() {
    const balance = +this.inputText;
    if (isNaN(balance)) {
      alert('请输入正确兑换金额');
      return;
    }
    const res = await apiGame.getGiftCode({ balance: balance * 100 });
    this.node.dispatchEvent(new cc.Event.EventCustom('onShouldUpdateUserInfo', true));
    if (!res.success) {
      return;
    }
    const exchangeCode = res.data;
    this.exchangeCode = exchangeCode;
    this.exchangeCodeLab.string = `${exchangeCode}`;
    this.exchangeCodeDialog.active = true;
  }
  onCloseDialogButtonClick() {
    this.node.active = false;
  }
  onShowExchangeRecordButtonClick() {
    const exchangeRecordDialog = cc.instantiate(this.exchangeRecordDialogPreb);
    this.node.addChild(exchangeRecordDialog);
  }
  onCloseExchangeCodeDialogButtonClick() {
    this.exchangeCodeDialog.active = false;
  }
  onCopyCodeButtonClick() {
    const isSuccess = webCopyString(this.exchangeCode);
    if (isSuccess) {
      alert('复制成功');
    } else {
      alert('复制失败，请尝试使用别的浏览器');
    }
  }
}
