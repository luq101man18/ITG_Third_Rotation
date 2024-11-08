/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import ElevateNav from './src/navigation/ElevateNav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './src/store/store';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
function App(): React.JSX.Element {
  if (__DEV__) {
    require("./ReactotronConfig");
  }
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <ElevateNav />
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
