import http from '@/app/http';
import { IUserListResData, IUserListItem } from '@/services/apiDataType';

export default {
  tokenUser: () => {
    return http.get('/api-admin/user/currentUser', null);
  },
  // changeProfile: (params: any) => {
  //   return http.patch('/http/v1/users/profile', params);
  // },
  findList: (params: {
    pageSize: number;
    pageNum: number;
    name: string;
  }): Promise<IUserListResData> => {
    return http.post('/api-admin/user/list', params);
  },
  addUser: (params: IUserListItem) => {
    return http.post('/api-admin/user', params);
  },
  // 修改用户
  editUser: (params: IUserListItem) => {
    return http.put('/api-admin/user', params);
  },
  // 删除用户
  removeUser: (userId: number) => {
    return http.delete(`/api-admin/user/${userId}`);
  },
  editUserPassword(params: { newPassword: string, oldPassword: string }) {
    return http.put(`/api-admin/user/editUserPassword`, params);
  },
};
