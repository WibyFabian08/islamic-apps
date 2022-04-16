import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import SoundPlayer from 'react-native-sound-player';
import {
  IconBack,
  IconPlay,
  IconStop,
  IconNext,
  IconMark,
} from '../assets/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Surat = ({navigation, route}) => {
  const [data, setData] = useState(null);
  const [isStop, setIsStop] = useState(false);
  const flatListRef = useRef(null);
  const indexRef = useRef(0);
  const lastReadRef = useRef({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickAyat = async index => {
    clearData();

    const storeData = {
      ...data,
      ayat: index,
    };

    try {
      const jsonValue = JSON.stringify(storeData);
      await AsyncStorage.setItem('lastRead', jsonValue);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('lastRead');
      if (value !== null) {
        const data = JSON.parse(value);
        lastReadRef.current = data;
        indexRef.current = data.ayat;
        setCurrentIndex(data.ayat);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clearData = async () => {
    await AsyncStorage.clear();
  };

  const play = () => {
    if (data !== null && data.audio) {
      try {
        SoundPlayer.playUrl(data.audio);
        setIsStop(true);
      } catch (err) {
        console.log(`cannot play the sound file`, err);
      }
    }
  };

  const stop = () => {
    if (data !== null && data.audio) {
      try {
        SoundPlayer.stop();
        setIsStop(false);
      } catch (err) {
        console.log(`cannot pause the sound file`, err);
      }
    }
  };

  const backAction = () => {
    stop();
    navigation.push('Home');
  };

  const ListItem = ({arab, translation, tafsir, index}) => {
    return (
      <View key={index} style={{marginBottom: 20}}>
        <TouchableOpacity
          onPress={() => handleClickAyat(index)}
          style={{
            padding: 10,
            borderWidth: 2,
            borderRadius: 12,
            marginBottom: 10,
            borderColor: '#71d5e3',
            backgroundColor: 'rgba(113, 213, 227, 0.1)',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {lastReadRef.current &&
            data.name == lastReadRef?.current?.name &&
            indexRef.current === index && (
              <View>
                <Image
                  source={IconMark}
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: 'black',
                  }}
                  resizeMode="contain"></Image>
              </View>
            )}
          <Text
            style={{
              color: '#9ea3a3',
              fontSize: 26,
              fontFamily: 'Poppins-Regular',
              flex: 1,
            }}>
            {arab}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: '#9ea3a3',
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
            marginBottom: 10,
          }}>
          {index + 1}. {translation}
        </Text>
        <Text
          style={{
            color: '#9ea3a3',
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            marginBottom: 10,
          }}>
          {tafsir}
        </Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => (
    <ListItem
      arab={item.arab}
      translation={item.translation}
      tafsir={item.tafsir.kemenag.short}
      index={index}></ListItem>
  );

  const HeaderItem = () => {
    return (
        <Text
          style={{
            color: '#9ea3a3',
            fontSize: 26,
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
            marginBottom: 10,
          }}>
          {data !== null && route.params.suratNo !== 1 && data.bismillah.arab}
        </Text>
    )
  };

  const fetchDataApi = () => {
    axios
      .get(`https://quran-api-id.vercel.app/surahs/${route.params.suratNo}`)
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDataApi();
  }, [route.params.suratNo]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingTop: 30,
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 80,
        }}>
        {data !== null && (
          <TouchableOpacity activeOpacity={0.8} onPress={() => backAction()}>
            <Image
              source={IconBack}
              style={{height: 30, width: 30}}
              resizeMode="contain"></Image>
          </TouchableOpacity>
        )}
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
          }}>
          {data !== null && `${data.name} (${data.numberOfAyahs})`}
        </Text>
        {data !== null && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              stop();
              navigation.push('Surat', {suratNo: data.number + 1});
            }}>
            <Image
              source={IconNext}
              style={{height: 30, width: 30}}
              resizeMode="contain"></Image>
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1}}>
        
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            zIndex: 10,
            flexDirection: 'column',
          }}>
          {data !== null && data.audio && (
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginBottom: 10
              }}>
              {isStop ? (
                <TouchableOpacity
                  onPress={() => stop()}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    backgroundColor: '#ff5d5d',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={IconStop}
                    style={{height: 30, width: 30, tintColor: 'white'}}
                    resizeMode="contain"></Image>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => play()}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    backgroundColor: '#ff5d5d',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={IconPlay}
                    style={{height: 30, width: 30, tintColor: 'white'}}
                    resizeMode="contain"></Image>
                </TouchableOpacity>
              )}
            </View>
          )}
          {data !== null &&
            lastReadRef.current &&
            data.name == lastReadRef.current.name && (
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
                    index: indexRef.current,
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

        {/* render arab */}
        {data !== null && data.ayahs.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={data.ayahs}
            keyExtractor={data.ayahs.arab}
            showsVerticalScrollIndicator={false}
            initialNumToRender={data.ayahs.length}
            updateCellsBatchingPeriod={data.ayahs.length}
            maxToRenderPerBatch={data.ayahs.length}
            removeClippedSubviews={true}
            ListHeaderComponent={HeaderItem}
            renderItem={renderItem}></FlatList>
        ) : (
          <ActivityIndicator style={{marginTop: 20}} size="large" />
        )}
      </View>
    </View>
  );
};

export default Surat;
