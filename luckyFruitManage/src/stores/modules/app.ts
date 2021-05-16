import { Commit } from 'vuex';
import { TOGGLE_MENU_COLLAPSE } from '../mutation-types';

export interface IAppState {
    menuCollapse: boolean;
}
interface IStore {
    commit: Commit;
    state: IAppState;
}

export default {
    state: {
        menuCollapse: false,
    } as IAppState,
    mutations: {
        [TOGGLE_MENU_COLLAPSE](state: IAppState) {
            state.menuCollapse = !state.menuCollapse;
        },
    },
    actions: {
        // [TOGGLE_MENU_COLLAPSE]({ commit, state }: IStore) {
        //     console.log(state);
        //     setTimeout(() => {
        //         commit(UPDATE_USER_NAME, 'heihei');
        //     }, 1000);
        // },
    },
    // getters: {
    //     [MY_USER_NAME](state: IState) {
    //         return state.userName + '233';
    //     },
    // },
};
