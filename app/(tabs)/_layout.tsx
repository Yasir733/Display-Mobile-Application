import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './index';
import ProfileScreen from './explore';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Profile Details"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default App;


// options={({ route }) => ({ title: `${route.params?.profile?.name?.first || 'Details'}` })}
