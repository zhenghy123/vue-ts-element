import { MutationTree } from 'vuex';

const mutations: MutationTree<any> = {
  SET_DATA(state: any, data: any): void {
    state[data.key] = data.data;
  },
  SET_USER(state: any, user: any): void {
    state.user = user;
  },
  SET_ROUTERS(state: any, routers: any): void {
    state.routers = routers;
  },
  setClientHeight(state: any, routers: any): void {
    state.clientWidth = routers;
  }
};

export default mutations;
