import http from '@/app/http';
import { SYSTEM_TYPE } from '@/app/config';

export default {
  videoGroupLilst(params: { pageNum: number, pageSize: number }) {
    const body = {
      ...params,
      systemType: SYSTEM_TYPE,
    };
    return http.post('/api-cms/adminVideoGroup/getVideoGroupList', body);
  },
  showVideoGroup(videoGroupId: number | string) {
    return http.put(`/api-cms/adminVideoGroup/showVideoGroup/${videoGroupId}`, null);
  },
  hideVideoGroup(videoGroupId: number | string) {
    return http.put(`/api-cms/adminVideoGroup/hiddenVideoGroup/${videoGroupId}`, null);
  },
  getVideoGroup(videoGroupId: number | string) {
    return http.get(`/api-cms/adminVideoGroup/${videoGroupId}`, null);
  },
  editVideoGroup(params: any) {
    return http.put(`/api-cms/adminVideoGroup/videoGroupEdit`, params);
  },
  deleteVideoGroup(videoGroupId: number) {
    return http.delete(`/api-cms/adminVideoGroup/deleted/${videoGroupId}`, null);
  },
  createVideoGroup(params: any) {
      const body = {
        ...params,
        systemType: SYSTEM_TYPE,
      };
      return http.post('/api-cms/adminVideoGroup/videoGroupCreate', body);
  },
  videoList(params: { videoGroupId: string | number, pageNum: number, pageSize: number }) {
    return http.post('/api-cms/adminVideo/getVideoList', params);
  },
  getVideo(videoId: number | string) {
    return http.get(`/api-cms/adminVideo/${videoId}`, null);
  },
  editVideo(params: any) {
    return http.put('/api-cms/adminVideo/videoEdit', params);
  },
  createVideo(params: any) {
    return http.post('/api-cms/adminVideo/videoCreate', params);
  },
  deleteVideo(videoId: number | string) {
    return http.delete(`/api-cms/adminVideo/deleted/${videoId}`, null);
  },
};
