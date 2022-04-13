import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const TopNavigation = ({navigation}) => {
  const {activeScreen} = useSelector((state) => state.navigationState)
  const dispatch = useDispatch()

  const handleMove = (screen) => {
    dispatch({type: 'SET_ACTIVE_SCREEN', value: screen})
    navigation.push(screen)
  }

  return (
    <View style={{paddingHorizontal: 20}}>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 50,
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 40,
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => handleMove('Home')}
          activeOpacity={0.8}
          style={{
            flex: 1,
            backgroundColor: activeScreen == "Home" ? '#71d5e3' : 'trasnparent',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 7,
            marginHorizontal: 5,
            borderRadius: 50,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: activeScreen === "Home" ? 'white' : '#a0a0a0',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
            }}>
            Al-Quran
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleMove('ListKisah')}
          activeOpacity={0.8}
          style={{
            flex: 1,
            backgroundColor: activeScreen == "ListKisah" ? '#71d5e3' : 'trasnparent',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 7,
            marginHorizontal: 5,
            borderRadius: 50,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: activeScreen === "ListKisah" ? 'white' : '#a0a0a0',
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
            }}>
            Kisah Nabi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleMove('ListDoa')}
          activeOpacity={0.8}
          style={{
            flex: 1,
            backgroundColor: activeScreen == "ListDoa" ? '#71d5e3' : 'trasnparent',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 7,
            marginHorizontal: 5,
            borderRadius: 50,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: activeScreen === "ListDoa" ? 'white' : '#a0a0a0',
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
            }}>
            Doa Pendek
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopNavigation;
