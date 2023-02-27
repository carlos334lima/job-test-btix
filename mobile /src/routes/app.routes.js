import React from 'react';
import {Platform} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {PostList} from '../pages/PostList';
import {UsersList} from '../pages/UsersList';

const Stack = createStackNavigator();

const AppRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 24 : 0,
        paddingBottom: Platform.OS === 'ios' ? 24 : 0,
      },
      headerShown: false,
    }}>
    <Stack.Screen name="Home" component={PostList} />
    <Stack.Screen name="UsersList" component={UsersList} />
  </Stack.Navigator>
);

export default AppRoutes;
