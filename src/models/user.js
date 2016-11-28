import {register, login, logout, change} from "../services/user";
import localforage from "localforage";
import {routerRedux} from "dva/router";
import {message} from "antd";

const STATE = {
  registerConfirmLoading: false,
  loginConfirmLoading: false,
};

export default {

  namespace: 'user',

  state: STATE,

  subscriptions: {
  },

  effects: {
    *register({payload}, {call, put}) {
      delete payload.confirm;
      payload.username = payload.mobilePhone;

      yield put({type: 'registerConfirm'});
      try {
        const {data} = yield call(register, payload);
        yield put({
          type: 'registerSuccess',
          payload: data,
        });
        localforage.setItem('currentUser', data);
        yield put(routerRedux.push('/'));
      } catch (e) {
        message.warning(e.message);
        yield put({type: 'registerConfirmed'});
      }
    },
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
        yield put(routerRedux.push('/login'));
      } catch (e) {
        message.warning(e.message);
      }
    },
    *change({payload}, {call, put}) {
      yield put({type: 'saveConfirm'});
      try {
        const {data} = yield call(change, payload);
        yield put({
          type: 'changeSuccess',
          payload: data,
        });
        // localforage.setItem('currentUser', data);
      } catch (e) {
        message.warning(e.message);
        yield put({type: 'saveConfirmed'});
      }
    },
  },

  reducers: {
    saveConfirm(state) {
      return {...state, saveConfirmLoading: true};
    },
    saveConfirmed(state) {
      return {...state, saveConfirmLoading: false};
    },
    registerConfirm(state) {
      return {...state, registerConfirmLoading: true};
    },
    registerConfirmed(state) {
      return {...state, registerConfirmLoading: false};
    },
    loginConfirm(state) {
      return {...state, loginConfirmLoading: true};
    },
    loginConfirmed(state) {
      return {...state, loginConfirmLoading: false};
    },

    registerSuccess(state, action) {
      return {...state, current: action.payload, isLoggedIn: true, registerConfirmLoading: false};
    },
    loginSuccess(state, action) {
      return {...state, current: action.payload, isLoggedIn: true, loginConfirmLoading: false};
    },
    logoutSuccess(state) {
      return {...state, current: null, isLoggedIn: false};
    },
    changeSuccess(state, action) {
      return {...state, current: action.payload, saveConfirmLoading: false};
    },
  },

};
