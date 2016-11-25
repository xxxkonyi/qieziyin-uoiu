import  {query, create, remove, change} from "../services/collections";
import {parse} from "qs";
import {message} from "antd";

const STATE = {
  createVisible: false,
  confirmLoading: false,
  createItem: {
    name: '',
    accessType: 'public',
    description: '',
  },
  changeVisible: false,
  changeLoading: false,
  changeItem: {},
  loading: false,
  items: [],
  skip: 0,
  limit: 10,
};

export default {

  namespace: 'collections',

  state: STATE,

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/collections') {
          const query = location.query;
          dispatch({
            type: 'query',
            payload: {
              skip: !query.skip ? STATE.skip : parseInt(query.skip),
              limit: !query.limit ? STATE.limit : parseInt(query.limit),
            }
          });

          if (query.createVisible) {
            dispatch({
              type: 'showCreate',
            });
          }
        }
      });
    },
  },

  effects: {
    *query({payload}, {call, put}) {
      yield put({type: 'showLoading'});
      try {
        const {data} = yield call(query, parse(payload));
        yield put({
          type: 'querySuccess',
          payload: {
            items: data.results,
          },
        });
      } catch (e) {
        message.warning(e.message);
        yield put({type: 'hideLoading'});
      }
    },
    *create({payload}, {call, put}) {
      yield put({type: 'createConfirm', payload: payload});
      const {data} = yield call(create, payload);
      if (data) {
        yield put({type: 'hideCreate'});
        yield put({
          type: 'createSuccess',
          payload: {...payload, ...data},
        });
      } else {
        console.log('cf', data);
      }
    },
    *remove({payload}, {call, put}) {
      yield put({type: 'showLoading'});
      const {data} = yield call(remove, payload);
      if (data) {
        yield put({
          type: 'removeSuccess',
          payload,
        });
      }
      yield put({type: 'hideLoading'});
    },
    *change({payload}, {call, put}) {
      yield put({type: 'changeConfirm', payload: payload});
      const {data} = yield call(change, payload.objectId, payload);
      if (data) {
        yield put({type: 'hideChange'});
        yield put({
          type: 'changeSuccess',
          payload: {...payload, ...data},
        });
      } else {
        console.log('cf', data);
      }
    },
  },

  reducers: {
    showLoading(state) {
      return {...state, loading: true};
    },
    hideLoading(state) {
      return {...state, loading: false};
    },

    showCreate(state) {
      return {...state, createItem: STATE.createItem, createVisible: true};
    },
    createConfirm(state, action) {
      return {...state, createItem: action.payload, createConfirmLoading: true};
    },
    hideCreate(state) {
      return {...state, createVisible: false, createConfirmLoading: false};
    },

    showChange(state, action) {
      return {...state, changeItem: action.payload, changeVisible: true};
    },
    changeConfirm(state, action) {
      return {...state, changeItem: action.payload, changeConfirmLoading: true};
    },
    hideChange(state) {
      return {...state, changeVisible: false, changeConfirmLoading: false};
    },

    querySuccess(state, action) {
      return {...state, ...action.payload, loading: false};
    },

    createSuccess(state, action) {
      const newItems = [action.payload].concat(state.items);
      return {...state, items: newItems};
    },
    removeSuccess(state, action) {
      const newItems = state.items.filter(item => item.objectId !== action.payload);
      return {...state, items: newItems};
    },
    changeSuccess(state, action) {
      const index = state.items.findIndex(item => item.objectId === action.payload.objectId);
      state.items.fill(action.payload, index, index + 1);
      return {...state, items: state.items};
    },
  },

};
