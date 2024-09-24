import React from 'react';
import './global.css';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import AppNavigator from './src/nav/AppNavigator';
export default function App() {

  // this is for reactotron debugger
  if (__DEV__) {
    require("./ReactotronConfig");
  }
  return <GluestackUIProvider mode="light"><AppNavigator /></GluestackUIProvider>;
}

