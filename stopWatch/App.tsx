import React from 'react';

import AppNavigator from './src/nav/AppNavigator';
export default function App() {

  // this is for reactotron debugger
  if (__DEV__) {
    require("./ReactotronConfig");
  }
  return <AppNavigator />;
}

