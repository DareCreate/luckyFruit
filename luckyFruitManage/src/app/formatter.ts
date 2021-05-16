import { formatDate, formatDateBySecTime } from './helps';
import { sex } from './typeDef';

export default {
    date(rowData: any, { property }: any): string {
        if (!rowData) {
            return '';
        }
        const time = rowData[property];
        return formatDate(time);
    },
    dateSecTime(rowData: any, { property }: any): string {
      if (!rowData) {
          return '';
      }
      const time = rowData[property];
      if (!time) {
        return '--';
      }
      return formatDateBySecTime(time);
    },
    sexLab(rowData: any, { property }: any): string {
        if (!rowData) {
            return '';
        }
        const sexVal = rowData[property];
        if (sexVal === sex.BOY) {
            return '男';
        }
        if (sexVal === sex.GIRL) {
            return '女';
        }
        return '未知';
    },
};

