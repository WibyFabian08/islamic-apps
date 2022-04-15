import React from 'react';
import {StatusBar, Easing} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Surat, ListKisah, Kisah, ListDoa, Doa} from './screens';

import store from './redux/store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();

const options = {
  gestureEnable: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      },
    },
  },
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar translucent={true} backgroundColor="transparent"></StatusBar>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={() => options}></Stack.Screen>
          <Stack.Screen
            name="Surat"
            component={Surat}
            options={() => options}></Stack.Screen>
          <Stack.Screen
            name="ListKisah"
            component={ListKisah}
            options={() => options}></Stack.Screen>
          <Stack.Screen
            name="Kisah"
            component={Kisah}
            options={() => options}></Stack.Screen>
          <Stack.Screen
            name="ListDoa"
            component={ListDoa}
            options={() => options}></Stack.Screen>
          <Stack.Screen
            name="Doa"
            component={Doa}
            options={() => options}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
