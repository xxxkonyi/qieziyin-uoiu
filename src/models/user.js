import {login, logout} from "../services/user";
import localforage from "localforage";
import {routerRedux} from "dva/router";
import {message} from "antd";

const STATE = {
  loginConfirmLoading: false,
};

export default {

  namespace: 'user',

  state: STATE,

  subscriptions: {},

  effects: {
    *login({payload}, {call, put}) {
      yield put({type: 'loginConfirm'});
      try {
        const {data} = yield call(login, payload);
        yield put({
          type: 'loginSuccess',
          payload: data,
        });
        localforage.setItem('currentUser', data);
        yield put(routerRedux.push('/'));
      } catch (e) {
        message.warning(e.message);
        yield put({type: 'loginConfirmed'});
      }
    },
    *logout({}, {call, put}) {
      try {
        yield call(logout);
        yield put({
          type: 'logoutSuccess',
        });
        localforage.setItem('currentUser', null);
        yield put(routerRedux.push('/'));
      } catch (e) {
        message.warning(e.message);
      }
    },
  },

  reducers: {
    loginConfirm(state) {
      return {...state, loginConfirmLoading: true};
    },
    loginConfirmed(state) {
      return {...state, loginConfirmLoading: false};
    },

    loginSuccess(state, action) {
      return {...state, current: action.payload, isLoggedIn: true, loginConfirmLoading: false};
    },
    logoutSuccess(state) {
      return {...state, current: null, isLoggedIn: false};
    },
  },

};
