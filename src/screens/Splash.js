import React, {useEffect} from 'react';
import {Image, View, Text} from 'react-native';
import {Logo} from '../assets/images';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5c49f0',
        flex: 1,
      }}>
      <Image
        source={Logo}
        style={{height: 100, width: 100}}
        resizeMode="cover"></Image>
      <Text
        style={{
          color: 'white',
          fontFamily: 'Poppins-Bold',
          fontSize: 26,
          marginTop: 10,
        }}>
        Islamic App
      </Text>
    </View>
  );
};

export default Splash;
