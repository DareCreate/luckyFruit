import Vue from 'vue';
import { Commit } from 'vuex';
import { UPDATE_USER_INFO, UPDATE_MY_USER_INFO } from '../mutation-types';
import { MY_USER_INFO, USER_MENUS, TOKEN } from '../getters-types';
import { UPDATE_USER_INFO_ASYNC, LOGOUT } from '../action-types';
import { IUserListItem } from '../../services/apiDataType';
import ApiLogin from '@/services/admin/login';

interface IRouterInfoItem {
  id: number;
  leaf: number;
  menuShow: boolean;
  name: string;
  parentId: number;
  path: string;
  icon: string;
  object: any;
  children: IRouterInfoItem[];
}

export interface IUserInfoState {
    router: IRouterInfoItem[];
    token: string;
    user: IUserListItem | any;
}
interface IStore {
    commit: Commit;
    state: IUserInfoState;
}

export default {
    state: {
        router: [],
        token: '',
        user: {
        },
    } as IUserInfoState,
    mutations: {
        [UPDATE_MY_USER_INFO](state: IUserInfoState, newUserInfo: IUserListItem) {
            state.user = {
                ...newUserInfo,
            };
        },
        [UPDATE_USER_INFO](state: IUserInfoState, newUserInfo: IUserInfoState) {
            // tslint:disable-next-line:forin
            for (const attr in newUserInfo) {
                Vue.set(state, attr, (newUserInfo as any)[attr]);
            }
        },
    },
    actions: {
        [UPDATE_USER_INFO_ASYNC]({ commit, state }: IStore) {
            // commit(UPDATE_USER_INFO, {
            //     token: '433',
            //     router: [1, 2, 3],
            //     user: {
            //         username: '233',
            //     },
            // });
        },
        async [LOGOUT]({ commit }: IStore) {
            await ApiLogin.logout();
            commit(UPDATE_USER_INFO, {
                token: '',
                router: [],
                user: {
                    username: '',
                },
            });
        },
    },
    getters: {
      [TOKEN](state: IUserInfoState): string {
        return state.token;
      },
      [MY_USER_INFO](state: IUserInfoState): IUserListItem {
          return state.user;
      },
      [USER_MENUS](state: IUserInfoState): any[] {
        return state.router
        .filter((routerInfo) => routerInfo.menuShow)
        .map((routerInfo) => {
          const { icon, name, id } = routerInfo;
          let childrenArr: any[] = [];
          if (routerInfo.children) {
            childrenArr = routerInfo.children.map((child) => {
              const { path, name: title, menuShow, children } = child;
              return {
                index: path,
                title,
                menuShow,
                children,
              };
            });
          }
          return {
            icon,
            index: `${id}`,
            title: name,
            children: childrenArr,
          };
        });
      },
    },
};
