import apiAccount from "../services/apiAccount";
import BaseController from "../common/BaseController";
import http from "../services/http";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends BaseController {
  registerLayer: cc.Node;

  loginId: string;
  loginPassword: string;
  registerLoginId: string;
  registerPassword: string;

  onLoad() {
    this.initView();
  }
  initView() {
    this.registerLayer = this.node.getChildByName('registerLayer');
    this.registerLayer.active = false;
  }
  async onLoginButtonClick() {
    if (!this.loginId || !this.loginPassword) {
      return;
    }
    const params = {
      loginId: this.loginId,
      password: this.loginPassword,
      tenantId: '1',
    };
    const res = await apiAccount.userLogin(params);
    if (!res.success) {
      return;
    }
    http.setRequestToken(res.data.token);
    this.SetUserInfo(res.data.userVO);
    this.navigateToMainGame();
  }
  onShowRegisterLayerButtonClick() {
    this.registerLayer.active = true;
  }
  onCloseRegisterLayerButtonClick() {
    this.registerLayer.active = false;
  }
  async onRegisterButtonClick() {
    if (!this.registerLoginId || !this.registerPassword) {
      return;
    }
    const params = {
      loginId: this.registerLoginId,
      password: this.registerPassword,
      tenantId: '1',
    };
    const res = await apiAccount.userAdd(params);
    if (!res.success) {
      return;
    }
    this.registerLayer.active = false;
    http.setRequestToken(res.data.token);
    this.SetUserInfo(res.data.userVO);
    this.navigateToMainGame();
  }
  onInputChange(inputVal: string, evTarget: cc.EditBox, inputFlag: string) {
    this[inputFlag] = inputVal;
  }
  navigateToMainGame() {
    cc.director.loadScene('MainGame');
  }
}
