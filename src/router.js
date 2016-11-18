import React, { PropTypes } from 'react';
import { Router } from 'dva/router';

export default function({ history, app }) {

  const routes = [
    {
      path: '/',
      name: 'app',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/IndexPage'));
        });
      },
    },
    {
      path: '/news',
      name: 'news',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          app.model(require('./models/news'));
          cb(null, require('./routes/News'));
        });
      },
    },
    {
      path: '/collections',
      name: 'collections',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          app.model(require('./models/collections'));
          cb(null, require('./routes/Collections'));
        });
      },
    },
  ];

  return <Router history={ history } routes={ routes } />;
};
