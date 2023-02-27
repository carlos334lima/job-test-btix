import React from 'react';
import {StatusBar, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import AppRoutes from './routes/app.routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <AppRoutes />
      </View>
    </NavigationContainer>
  );
};

export default App;
