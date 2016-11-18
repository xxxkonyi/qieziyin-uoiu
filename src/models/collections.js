import {query} from "../services/collections";
import {parse} from "qs";

const STATE = {
  createModalVisible: false,
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

          if (query.createModalVisible) {
            dispatch({
              type: 'showCreateModal',
            });
          }
        }
      });
    },
  },

  effects: {
    *query({payload}, {call, put}) {
      yield put({type: 'showLoading'});
      const {data} = yield call(query, parse(payload));

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            items: data.results,
          },
        });
      }
    }
  },

  reducers: {
    showLoading(state) {
      return {...state, loading: true};
    },
    querySuccess(state, action) {
      return {...state, ...action.payload, loading: false};
    },
    showCreateModal(state) {
      return {...state, createModalVisible: true};
    },
    hideCreateModal(state) {
      return {...state, createModalVisible: false};
    },
  },

};
