

export const setSpriteImg = (sprite: cc.Sprite, imgUrl: string) => {
  if (sprite == null) {
    console.log('setSpriteImg error sprite is null');
    return;
  }
  if (!/^http:\/\//.test(imgUrl)&& !/^https:\/\//.test(imgUrl)) {
    imgUrl = 'http://' + imgUrl;
  }
  cc.loader.load({
    url: imgUrl,
    type: 'png'
  }, (err, texture) => {
      if (err) console.error(err);
      sprite.spriteFrame = new cc.SpriteFrame(texture);
  });
};

export const getRandom = (min: number, max: number): number => {
  const range = max - min;
  const rand = Math.random();
  return min + Math.round(rand * range);
};

export const getRandomEjectionAction = (duration: number  = 0.6): cc.Action => {
  const posX = getRandom(-600, 600);
  const posY = getRandom(-600, 50);
  const height = getRandom(30, 300);
  const angle = getRandom(-90, 90);
  return cc.spawn(cc.jumpBy(duration, posX, posY, height, 1), cc.rotateBy(duration, angle));
};

export const searchParse = (): any => { 
  var resultObj = {}; 
  var search = window.location.search; 
  if(search && search.length > 1){ 
    var search = search.substring(1); 
    var items = search.split('&'); 
    for(var index = 0 ; index < items.length ; index++ ){ 
      if(! items[index]){ 
      continue; 
    } 
    var kv = items[index].split('='); 
    resultObj[kv[0]] = typeof kv[1] === "undefined" ? "":kv[1]; 
    }
  } 
  return resultObj; 
};
export const jsonSort = (jsonObj: Object) => {
  if (jsonObj == null) {
    return null;
  }
  var arr = [];
  for(var key in jsonObj){
      arr.push(key)
  }
  arr.sort();
  var str='';
  for(var i in arr){
     str +=arr[i]+"="+jsonObj[arr[i]]+"&"
  }
  return str.substr(0, str.length-1)
};

export const formatDate = (date:  Date, format: string = 'yyyy-MM-dd hh:mm:ss'): string => {
  const o: any = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (`${date.getFullYear()  }`).substr(4 - RegExp.$1.length));
  }
  // tslint:disable-next-line:forin
  for (const key in o) {
      const val = o[key];
      if (new RegExp(`(${key})`).test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1
          ? val
          : (`00${  o[key]}`).substr((`${  val}`).length));
      }
  }
  return format;
};

export const delayTime = (time: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time * 1000);
  });
};

export const copyObject = (obj: Object) => {
  if (obj == null) {
    return null;
  }
  return JSON.parse(JSON.stringify(obj));
};

export const webCopyString = (copyStr: string): boolean => {
    var input = copyStr;
    const el = document.createElement('textarea');
    el.value = input;
    el.setAttribute('readonly', '');
    el.style['contain'] = 'strict';
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.fontSize = '12pt';
    const selection = getSelection();
    var originalRange: any = false;
    if (selection.rangeCount > 0) {
      originalRange = selection.getRangeAt(0);
    }
    document.body.appendChild(el);
    el.select();
    el.selectionStart = 0;
    el.selectionEnd = input.length;
    var success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {}
    document.body.removeChild(el);
    if (originalRange) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
    }
    return success;
};
