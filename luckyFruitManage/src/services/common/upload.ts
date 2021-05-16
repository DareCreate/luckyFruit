import http from '../../app/http';
import { SYSTEM_TYPE } from '@/app/config';

export default {
  uploadImage(file: File) {
    const imgFormData = new FormData();
    imgFormData.append('file', file);
    const config = {
      headers: { 'Content-Type': 'multipart/form-data'},
    };
    return http.post(`/api-common-server/upload/image/${SYSTEM_TYPE}`, imgFormData, config);
  },
  getUploadToken(originalFilename: string, uploadType: string) {
    return http.get(`/api-common-server/upload/getUploadToken/${originalFilename}/${uploadType}/${SYSTEM_TYPE}`,
    null);
  },
};
