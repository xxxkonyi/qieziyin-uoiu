import 'antd/dist/antd.css';
import './index.html';
import './index.css';
import dva from 'dva';

import createLogger from 'redux-logger';
import { browserHistory } from 'dva/router';

// 1. Initialize
const app = dva({
  // onAction: createLogger(),
  // history: browserHistory,
});

// 2. Plugins
//app.use({});

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
