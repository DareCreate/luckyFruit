export const formatDate = (time: number | Date, format: string = 'yyyy-MM-dd hh:mm:ss'): string => {
    if (time == null) {
        return '';
    }
    const date = new Date(time);
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

export const formatDateBySecTime = (secTime: number, format: string = 'yyyy-MM-dd') => {
  return formatDate(secTime * 1000, format);
};
