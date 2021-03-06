import "./index.html";
import "./index.css";
import "antd/dist/antd.css";
import localforage from "localforage";
import dva from "dva";
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';

localforage.getItem('currentUser').then(function (currentUser) {

  const savedState = {
    user: {
      current: currentUser,
      isLoggedIn: !!currentUser
    }
  };

  // 1. Initialize
  const app = dva({
    history: useRouterHistory(createHashHistory)({ queryKey: false }),
    initialState: savedState,
  });
  window.app = app;

  // 2. Plugins
  app.use({
    onError: (error) => {
      console.error(error);
    }
  });

  // 3. Model
  app.model(require('./models/user'));

  // 4. Router
  app.router(require('./router'));

  // 5. Start
  app.start('#root');

});
