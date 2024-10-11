/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import ElevateNav from './src/navigation/ElevateNav';
import store from './src/store/store';
import { Provider } from 'react-redux';

function App(): React.JSX.Element {
  if (__DEV__) {
    require("./ReactotronConfig");
  }
  return (
    <Provider store={store}>
      <ElevateNav />
    </Provider>
  );
}

export default App;
