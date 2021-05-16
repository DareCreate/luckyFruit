import http from '@/app/http';
import { SYSTEM_TYPE } from '@/app/config';

export default {
  slideShowList(params: { pageNum: number, pageSize: number }) {
    return http.post('/api-cms/adminSlideshow/slideshowList', {
      systemType: SYSTEM_TYPE,
      ...params,
    });
  },
  getSlideShow(id: string) {
    return http.get(`/api-cms/adminSlideshow/${id}`);
  },
  deleteSlide(id: string) {
    return http.delete(`/api-cms/adminSlideshow/${id}`);
  },
  editSlide(params: any) {
    return http.put(`/api-cms/adminSlideshow/edit`, params);
  },
  createSlide(params: any) {
    return http.post(`/api-cms/adminSlideshow/create`, params);
  },
  createSlideContent(params: any) {
    return http.post(`/api-cms/adminSlideshowContent/create`, params);
  },
  editSlideContent(params: any) {
    return http.put(`/api-cms/adminSlideshowContent/edit`, params);
  },
  deleteSlideContent(id: number) {
    return http.delete(`/api-cms/adminSlideshowContent/${id}`);
  },
  getSlideContent(id: string) {
    return http.get(`/api-cms/adminSlideshowContent/${id}`);
  },
  slideContentList(slideShowId: string) {
    return http.get(`/api-cms/adminSlideshowContent/list/${slideShowId}`);
  },
  clearCache(slideShowId: string) {
    return http.get(`/api-cms/adminSlideshow/clearCache/${slideShowId}`);
  },
};
