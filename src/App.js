import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Surat, ListKisah, Kisah, ListDoa, Doa} from './screens';

import store from './redux/store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar translucent={true} backgroundColor="transparent"></StatusBar>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Surat" component={Surat}></Stack.Screen>
          <Stack.Screen name="ListKisah" component={ListKisah}></Stack.Screen>
          <Stack.Screen name="Kisah" component={Kisah}></Stack.Screen>
          <Stack.Screen name="ListDoa" component={ListDoa}></Stack.Screen>
          <Stack.Screen name="Doa" component={Doa}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
