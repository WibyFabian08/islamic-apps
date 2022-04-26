import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Logo} from '../assets/images';
import {IconMark} from '../assets/icons';
import axios from 'axios';
import {TopNavigation} from '../components';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const lastReadRef = useRef({});
  const [ref, setRef] = useState(null);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [lastRead, setLastRead] = useState(null);

  const ListItem = ({data, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Surat', {suratNo: data.number})}
        key={index}
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[index] = layout.y;
          setDataSourceCords(dataSourceCords);
        }}
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
                {data.number}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#727272',
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                }}>
                {data.name}
              </Text>
              <Text
                style={{
                  color: '#727272',
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                }}>
                {data.translation} ({data.numberOfAyahs})
              </Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: '#727272',
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
            }}>
            {data.revelation}
          </Text>
          {lastRead !== null && index === lastRead.number - 1 && (
            <Image
              source={IconMark}
              style={{height: 20, width: 20, marginLeft: 10}}
              resizeMode="contain"></Image>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const backAction = () => {
    Alert.alert('Tunggu Sebentar!', 'Yakin ingin keluar dari aplikasi?', [
      {
        text: 'Batal',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Ya', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  const scrollHandler = () => {
    if (dataSourceCords.length > 1) {
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[lastRead.number - 1],
        animated: true,
      });
    } else {
      console.log('Out of Max Index');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('lastRead');
      if (value !== null) {
        const data = JSON.parse(value);
        // lastReadRef.current = data;
        setLastRead(data);
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
        setData(res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
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
        {data !== null && data.length > 0 && lastRead !== null && (
          <TouchableOpacity
            style={{
              backgroundColor: '#71d5e3',
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: 50,
            }}
            onPress={() => scrollHandler()}>
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
        <ScrollView
          ref={ref => {
            setRef(ref);
          }}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {data.length > 0 ? (
            data.map((data, index) => {
              return (
                <ListItem key={index} data={data} index={index}></ListItem>
              );
            })
          ) : (
            <ActivityIndicator
              style={{marginTop: 20}}
              color='#5c49f0'
              size="large"
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
