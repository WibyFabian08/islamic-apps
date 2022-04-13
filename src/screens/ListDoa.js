import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import {Logo} from '../assets/images';
import {TopNavigation} from '../components';
import doa from '../data/doa';

const ListDoa = ({navigation}) => {
  return (
    <View
      style={{
        paddingTop: 30,
        backgroundColor: '#5c49f0',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: 'transparent',
          paddingTop: 20,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: 'white',
              fontSize: 14,
              margin: 0,
            }}>
            Selamat Datang
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: 'white',
              fontSize: 26,
            }}>
            Islamic Apps
          </Text>
        </View>
        <View>
          <Image
            resizeMode="contain"
            style={{height: 50, width: 50}}
            source={Logo}></Image>
        </View>
      </View>

      <TopNavigation navigation={navigation}></TopNavigation>

      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 3,
          paddingHorizontal: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flex: 1,
        }}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {doa.length > 0 ? (
            doa.map((data, index) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.push('Doa', {judul: data.judul})}
                  key={index}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    marginTop: index == 0 ? 10 : 0,
                  }}>
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          height: 30,
                          width: 30,
                          backgroundColor: 'black',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 50,
                          marginRight: 10,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 12,
                          }}>
                          {index + 1}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#727272',
                            fontSize: 18,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {data.judul}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          {data.tag.map((data, index2) => {
                            return (
                              <Text
                                key={index2}
                                style={{
                                  color: '#727272',
                                  fontSize: 14,
                                  fontFamily: 'Poppins-Regular',
                                  marginRight: 3,
                                }}>
                                {data},
                              </Text>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <ActivityIndicator style={{marginTop: 20}} size="large" />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListDoa;
