import React from 'react';
import { Text, View } from 'react-native';
import GoogleOauth from './screens/GoogleOauth';
import NetworkStatus from './screens/NetworkStatus';
const App = () => {
  return (
    <>
    <GoogleOauth />
    <NetworkStatus />
    </>
  );
};


export default App;
