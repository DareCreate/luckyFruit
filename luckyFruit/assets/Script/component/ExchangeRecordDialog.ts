const {ccclass, property} = cc._decorator;
import apiGame from '../services/apiGame';
import { formatDate, webCopyString } from '../common/comTool';
@ccclass
export default class ExchangeRecordDialog extends cc.Component {
  @property({
    type: cc.Prefab,
  })
  exchangeRecordItemPreb: cc.Prefab = null;

  contentList: cc.Node;
  onLoad() {
    this.initView();
    // this.getRecord();
  }
  initView() {
    this.contentList = cc.find('scrollview/view/content', this.node);
  }
  // async getRecord() {
  //   const res = await apiGame.getGiftCodeVOS();
  //   if (!res.success || !res.data || !res.data.length) {
  //     return;
  //   }
  //   const recordList = res.data;
  //   recordList.forEach((item) => {
  //     const { balance, createTime, giftCode, usable } = item;
  //     const recordItem = cc.instantiate(this.exchangeRecordItemPreb);
  //     recordItem.getChildByName('exchangeInfo').getComponent(cc.Label).string
  //      = `兑换金额:${balance / 100}(${usable ? '已兑换' : '未兑换'})`;
  //     const dateLab = formatDate(new Date(createTime * 1000), 'yyyy-MM-dd');
  //     recordItem.getChildByName('exchangeTime').getComponent(cc.Label).string = `生成时间:${dateLab}`;
  //     recordItem.getChildByName('copyBtn').on(cc.Node.EventType.TOUCH_END, () => {
  //       const isSuccess = webCopyString(giftCode);
  //       if (isSuccess) {
  //         alert('复制成功');
  //       } else {
  //         alert('复制失败，请尝试使用别的浏览器');
  //       }
  //     });
  //     this.contentList.addChild(recordItem);
  //   });
  // }
  onCloseDialogButtonClick() {
    this.node.removeFromParent();
  }
}
