/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { PaperProvider } from 'react-native-paper';
import ElevateNav from './src/navigation/ElevateNav';


function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <ElevateNav />
    </PaperProvider>
  );
}

export default App;
