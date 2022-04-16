import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Logo} from '../assets/images';
import {IconMark} from '../assets/icons';
import axios from 'axios';
import {TopNavigation} from '../components';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const flatListRef = useRef(null);
  const lastReadRef = useRef({});

  const ListItem = ({
    number,
    name,
    translation,
    numberOfAyahs,
    revelation,
    index,
  }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Surat', {suratNo: number})}
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
                {number}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#727272',
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                }}>
                {name}
              </Text>
              <Text
                style={{
                  color: '#727272',
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                {translation} ({numberOfAyahs})
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: '#727272',
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
            }}>
            {revelation}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => (
    <ListItem
      number={item.number}
      name={item.name}
      translation={item.translation}
      numberOfAyahs={item.numberOfAyahs}
      revelation={item.revelation}
      index={index}></ListItem>
  );

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('lastRead');
      if (value !== null) {
        const data = JSON.parse(value);
        lastReadRef.current = data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    axios
      .get('https://quran-api-id.vercel.app/surahs')
      .then(res => {
        setData(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
          position: 'absolute',
          bottom: 30,
          right: 30,
          zIndex: 10,
          flexDirection: 'column',
        }}>
        {data !== null && lastReadRef.current && (
          <TouchableOpacity
            style={{
              backgroundColor: '#71d5e3',
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: 50,
            }}
            onPress={() => {
              flatListRef?.current?.scrollToIndex({
                index: lastReadRef.current.number - 1,
                animated: true,
              });
            }}>
            <Image
              source={IconMark}
              style={{height: 30, width: 30, tintColor: 'white'}}
              resizeMode="contain"></Image>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 3,
          paddingHorizontal: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flex: 1,
        }}>
        <View
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {data.length > 0 ? (
            <FlatList
              ref={flatListRef}
              data={data}
              keyExtractor={data.number}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              renderItem={renderItem}></FlatList>
          ) : (
            <ActivityIndicator style={{marginTop: 20}} size="large" />
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;
