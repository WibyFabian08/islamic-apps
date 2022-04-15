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
  const [indexData, setIndexData] = useState(null);
  const [lastRead, setLastRead] = useState(null);
  const flatListRef = useRef(null);

  console.log(data);

  const markerColor = index => {
    if (
      lastRead !== null &&
      data.name == lastRead?.name &&
      indexData !== null &&
      indexData === index
    ) {
      return 'black';
    } else {
      return 'lightgray';
    }
  };

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
        setLastRead(data);
        setIndexData(data.ayat);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clearData = async () => {
    await AsyncStorage.clear();
    setLastRead(null);
    setIndexData(null);
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
    navigation.push("Home");
  };

  useEffect(() => {
    axios
      .get(`https://quran-api-id.vercel.app/surahs/${route.params.suratNo}`)
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
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
          {data !== null && data.name}
        </Text>
        {data !== null && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.push('Surat', {suratNo: data.number + 1})
            }>
            <Image
              source={IconNext}
              style={{height: 30, width: 30}}
              resizeMode="contain"></Image>
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1}}>
        {/* render arab */}
        {data !== null && data.ayahs.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={data.ayahs}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <>
                  {data !== null && data.audio && (
                    <View
                      style={{justifyContent: 'center', flexDirection: 'row'}}>
                      {isStop ? (
                        <TouchableOpacity
                          onPress={() => stop()}
                          style={{
                            height: 50,
                            width: 50,
                            borderRadius: 100,
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 1,
                          }}>
                          <Image
                            source={IconStop}
                            style={{height: 30, width: 30}}
                            resizeMode="contain"></Image>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => play()}
                          style={{
                            height: 50,
                            width: 50,
                            borderRadius: 100,
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 1,
                          }}>
                          <Image
                            source={IconPlay}
                            style={{height: 30, width: 30}}
                            resizeMode="contain"></Image>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                  {data !== null && data.audio && (
                    <Text
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 18,
                      }}>
                      Putar Surat
                    </Text>
                  )}
                  {data !== null &&
                    lastRead !== null &&
                    data.name == lastRead.name && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#71d5e3',
                          paddingVertical: 10,
                          borderRadius: 100,
                        }}
                        onPress={() => {
                          flatListRef?.current?.scrollToIndex({
                            index: indexData,
                            animated: true,
                          });
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'Poppins-SemiBold',
                            textAlign: 'center',
                          }}>
                          Lanjutkan Membaca Ayat (
                          {indexData !== null && indexData + 1})
                        </Text>
                      </TouchableOpacity>
                    )}
                  <Text
                    style={{
                      color: '#9ea3a3',
                      fontSize: 26,
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                      marginBottom: 10,
                    }}>
                    {data !== null &&
                      route.params.suratNo !== 1 &&
                      data.bismillah.arab}
                  </Text>
                </>
              );
            }}
            renderItem={data => {
              return (
                <View key={data.index} style={{marginBottom: 20}}>
                  <View
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
                    <TouchableOpacity
                      onPress={() => handleClickAyat(data.index)}>
                      <Image
                        source={IconMark}
                        style={{
                          height: 30,
                          width: 30,
                          tintColor: markerColor(data.index),
                        }}
                        resizeMode="contain"></Image>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#9ea3a3',
                        fontSize: 26,
                        fontFamily: 'Poppins-Regular',
                        flex: 1,
                      }}>
                      {data.item.arab}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#9ea3a3',
                      fontSize: 16,
                      fontFamily: 'Poppins-SemiBold',
                      marginBottom: 10,
                    }}>
                    {data.index + 1}. {data.item.translation}
                  </Text>
                  <Text
                    style={{
                      color: '#9ea3a3',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                      marginBottom: 10,
                    }}>
                    {data.item.tafsir.kemenag.short}
                  </Text>
                </View>
              );
            }}></FlatList>
        ) : (
          <ActivityIndicator style={{marginTop: 20}} size="large" />
        )}
      </View>
    </View>
  );
};

export default Surat;

// data.ayahs.map((data, index) => {
//   return (
//     <View key={index} style={{marginBottom: 20}}>
//       <View
//         style={{
//           padding: 10,
//           borderWidth: 2,
//           borderRadius: 12,
//           marginBottom: 10,
//           borderColor: '#71d5e3',
//           backgroundColor: 'rgba(113, 213, 227, 0.1)',
//         }}>
//         <Text
//           style={{
//             color: '#9ea3a3',
//             fontSize: 26,
//             fontFamily: 'Poppins-Regular',
//           }}>
//           {data.arab}
//         </Text>
//       </View>
//       <Text
//         style={{
//           color: '#9ea3a3',
//           fontSize: 16,
//           fontFamily: 'Poppins-SemiBold',
//           marginBottom: 10,
//         }}>
//         {index + 1}. {data.translation}
//       </Text>
//       <Text
//         style={{
//           color: '#9ea3a3',
//           fontSize: 16,
//           fontFamily: 'Poppins-Regular',
//           marginBottom: 10,
//         }}>
//         {data.tafsir.kemenag.short}
//       </Text>
//     </View>
//   );
// })
