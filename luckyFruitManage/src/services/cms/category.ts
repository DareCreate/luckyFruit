import http from '@/app/http';
import { SYSTEM_TYPE } from '@/app/config';

export default {
  categoryList(params: { pageNum: number, pageSize: number }) {
    return http.post('/api-cms/adminCategory', {
      ...params,
      systemType: SYSTEM_TYPE,
    });
  },
  createCategory(params: any) {
    return http.post(`/api-cms/adminCategory/create`, params);
  },
  deleteCategory(categoryId: number | string) {
    return http.delete(`/api-cms/adminCategory/deleted/${categoryId}`, null);
  },
  editCategory(params: any) {
    return http.put(`/api-cms/adminCategory/edit`, params);
  },
  showCategory(categoryId: number | string) {
    return http.put(`/api-cms/adminCategory/show/${categoryId}`, null);
  },
  hideCategory(categoryId: number | string) {
    return http.put(`/api-cms/adminCategory/hidden/${categoryId}`, null);
  },
  getCategory(categoryId: number | string) {
    return http.get(`/api-cms/adminCategory/${categoryId}`, null);
  },
  // article
  articleList(params: any) {
    return http.post(`/api-cms/adminArticle/articleList`, params);
  },
  createArticle(params: any) {
    return http.post(`/api-cms/adminArticle/create`, params);
  },
  editArticle(params: any) {
    return http.put(`/api-cms/adminArticle/edit`, params);
  },
  showArticle(articleId: number | string) {
    return http.put(`/api-cms/adminArticle/show/${articleId}`, null);
  },
  hiddenArticle(articleId: number | string) {
    return http.put(`/api-cms/adminArticle/hidden/${articleId}`, null);
  },
  deleteArticle(articleId: number | string) {
    return http.delete(`/api-cms/adminArticle/${articleId}`, null);
  },
  getArticle(articleId: number | string) {
    return http.get(`/api-cms/adminArticle/${articleId}`, null);
  },
};
