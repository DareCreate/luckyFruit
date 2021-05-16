import http from '@/app/http';
import { SYSTEM_TYPE } from '@/app/config';

export default {
  clearCache() {
    return http.put(`/api-cms/adminGlobalProperties/clearCache/${SYSTEM_TYPE}`, null);
  },
  saveProperties(globalPropertiesQOList: any[]) {
    return http.put(`/api-cms/adminGlobalProperties/saveGlobalProperties`, {
      globalPropertiesQOList,
      systemType: SYSTEM_TYPE,
    });
  },
  getGlobalProperties() {
    return http.get(`/api-cms/adminGlobalProperties/${SYSTEM_TYPE}`, null);
  },
};
