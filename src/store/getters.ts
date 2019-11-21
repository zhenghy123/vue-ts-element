import { GetterTree } from 'vuex';

const getters: GetterTree<any, any> = {
  getData(state: any): any {
    return function (key: any) {
      return state[key];
    }
  },
  user(state: any): any {
    return state.user;
  },
  routers(state: any): any {
    return state.routers;
  }
};

export default getters;
