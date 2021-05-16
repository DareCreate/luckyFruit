import { getRandom } from "../common/comTool";
import { FruitType } from "../common/typeDef";

const {ccclass, property} = cc._decorator;

const audioResUrlMap = {
  effectSendLights: 'audio/effect/Y131', // 送灯
  effectDsx: 'audio/effect/Y117', // 大四喜
  effectDsy: 'audio/effect/Y114', // 大三元
  effectXsy: 'audio/effect/Y115', // 小三元
  effectZhsh: 'audio/effect/Y118', // 众横四海
  effectDmg: 'audio/effect/Y120', // 大满贯
  effectXnsh: 'audio/effect/Y122', // 仙女散花
  effectKhc: 'audio/effect/Y124', // 开火车
  [FruitType.APPLE]: 'audio/fruit/Y101',
  [FruitType.ORANGE]: 'audio/fruit/Y102',
  [FruitType.MANGO]: 'audio/fruit/Y103',
  [FruitType.BELL]: 'audio/fruit/Y104',
  [FruitType.WATERMELON]: 'audio/fruit/Y105',
  [FruitType.STAR]: 'audio/fruit/Y106',
  [FruitType.SEVEN]: 'audio/fruit/Y107',
  [FruitType.BAR]: 'audio/fruit/Y108',
};

@ccclass
export default class AudioCtrl extends cc.Component {

    @property({
      type: cc.AudioClip,
    })
    lightBooAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    zhongleAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    kexiAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    rotateStartAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    rotateEndAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    rotatingAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    dingAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    hitLuklyAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    luklySuccessAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    luklyFailAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    alternateAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    wuwuAc: cc.AudioClip = null;
    @property({
      type: cc.AudioClip,
    })
    hitAc: cc.AudioClip = null;

    playRotateStartAudio() {
      cc.audioEngine.play(this.rotateStartAc, false, 0.5);
    }
    playRotateEndAudio() {
      cc.audioEngine.play(this.rotateEndAc, false, 0.5);
    }
    rotatingAudioId: number;
    playRotatingAudio() {
      this.rotatingAudioId = cc.audioEngine.play(this.rotatingAc, true, 0.5);
    }
    playWinLotteryPointAudio() {
      return new Promise(resolve => {
        const audioId = cc.audioEngine.play(this.zhongleAc, false, 0.3);
        cc.audioEngine.setFinishCallback(audioId, resolve)
      });
    }
    playFailLotteryPointAudio() {
      cc.audioEngine.play(this.kexiAc, false, 0.5);
    }
    stopRotatingAudio() {
      cc.audioEngine.stop(this.rotatingAudioId);
    }
    playSendLightsAudio() {
      const sendLightsAcArr = [
        'audio/sendLights/1', 'audio/sendLights/2', 'audio/sendLights/3',
        'audio/sendLights/4', 'audio/sendLights/5', 'audio/sendLights/6',
      ];
      if (sendLightsAcArr.length < 1) {
        return;
      }
      const index = getRandom(0, sendLightsAcArr.length - 1);
      this.stopSendLightsAudio();
      this.playAudioByAudioMap(sendLightsAcArr[index], true);
    }
    stopSendLightsAudio() {
      cc.audioEngine.stopAllEffects();
    }
    playLightBoo() {
      cc.audioEngine.play(this.lightBooAc, false, 0.5);
    }
    playDing() {
      cc.audioEngine.play(this.dingAc, false, 0.1);
    }
    playWuWuAudio() {
      cc.audioEngine.play(this.wuwuAc, true, 0.3);
    }
    playHitLuklyAudio() {
      return new Promise(resolve => {
        const audioId = cc.audioEngine.play(this.hitLuklyAc, false, 0.3);
        cc.audioEngine.setFinishCallback(audioId, resolve)
      });
    }
    playLuklySuccessAudio() {
      return new Promise(resolve => {
        const audioId = cc.audioEngine.play(this.luklySuccessAc, false, 0.2);
        cc.audioEngine.setFinishCallback(audioId, resolve)
      });
    }
    playLuklyFailAudio() {
      return new Promise(resolve => {
        const audioId = cc.audioEngine.play(this.luklyFailAc, false, 0.2);
        cc.audioEngine.setFinishCallback(audioId, resolve)
      });
    }
    playHitAudio() {
      return new Promise(resolve => {
        const audioId = cc.audioEngine.play(this.hitAc, false, 0.2);
        cc.audioEngine.setFinishCallback(audioId, resolve)
      });
    }
    playWinAudio() {
      const winAcArr = [
        'audio/win/C01', 'audio/win/C02', 'audio/win/C03',
        'audio/win/C04', 'audio/win/C05', 'audio/win/C06',
        'audio/win/C07', 'audio/win/C08', 'audio/win/C09',
        'audio/win/C10', 'audio/win/C11', 'audio/win/C12',
        'audio/win/C13', 'audio/win/C14', 'audio/win/C15',
      ];
      if (winAcArr.length < 1) {
        return;
      }
      const index = getRandom(0, winAcArr.length - 1);
      this.stopAllEffects();
      this.playAudioByAudioMap(winAcArr[index]);
    }
    playAlternateAudio() {
      cc.audioEngine.play(this.alternateAc, true, 0.5);
    }
    playSendLightsEffect() {
      return this.playAudioByAudioMap(audioResUrlMap.effectSendLights);
    }
    playDsxEffect() {
      return this.playAudioByAudioMap(audioResUrlMap.effectDsx);
    }
    playDsyEffect() {
      return this.playAudioByAudioMap(audioResUrlMap.effectDsy);
    }
    playKhcEffect() {
      return this.playAudioByAudioMap(audioResUrlMap.effectKhc);
    }
    playXnshEffect() {
      return this.playAudioByAudioMap(audioResUrlMap.effectXnsh);
    }
    playXsyEffect() {
      return this.playAudioByAudioMap(audioResUrlMap.effectXsy);
    }
    playZhshEffect() {
      return this.playAudioByAudioMap(audioResUrlMap.effectZhsh);
    }
    playDmgEffect() {
      return this.playAudioByAudioMap(audioResUrlMap.effectDmg);
    }
    playFruitAudio(fruitType: FruitType | null) {
      return this.playAudioByAudioMap(audioResUrlMap[fruitType]);
    }
    loadAudioStopMap: {[key: string]: boolean} = {};
    stopAllEffects() {
      cc.audioEngine.stopAllEffects();
      for(const attr in this.loadAudioStopMap) {
        this.loadAudioStopMap[attr] = true;
      }
    }
    playAudioByAudioMap(audioKey: string, loop: boolean = false) {
      return new Promise(resolve => {
        if (audioKey == null) {
          resolve();
          return;
        }
        this.loadAudioStopMap[audioKey] = false;
        cc.loader.loadRes(audioKey, cc.AudioClip, (err, resource) => {
          if (err || this.loadAudioStopMap[audioKey]) {
            resolve();
          } else {
            const audioId = cc.audioEngine.play(resource, loop, 0.7);
            cc.audioEngine.setFinishCallback(audioId, resolve)
          }
          delete this.loadAudioStopMap[audioKey];
        });
      });
    }
}
