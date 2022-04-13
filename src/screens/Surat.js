import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {IconBack} from '../assets/icons';

const Surat = ({navigation, route}) => {
  const [data, setData] = useState(null);
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Image
            source={IconBack}
            style={{height: 30, width: 30}}
            resizeMode="contain"></Image>
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
          }}>
          {data !== null && data.name}
        </Text>
        <View style={{height: 30, width: 30}}></View>
      </View>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
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
          {data !== null && data.ayahs.length > 0 ? (
            data.ayahs.map((data, index) => {
              return (
                <View key={index} style={{marginBottom: 20}}>
                  <View
                    style={{
                      padding: 10,
                      borderWidth: 2,
                      borderRadius: 12,
                      marginBottom: 10,
                      borderColor: '#71d5e3',
                      backgroundColor: 'rgba(113, 213, 227, 0.1)',
                    }}>
                    <Text
                      style={{
                        color: '#9ea3a3',
                        fontSize: 26,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {data.arab}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#9ea3a3',
                      fontSize: 16,
                      fontFamily: 'Poppins-SemiBold',
                      marginBottom: 10,
                    }}>
                    {index + 1}. {data.translation}
                  </Text>
                  <Text
                    style={{
                      color: '#9ea3a3',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                      marginBottom: 10,
                    }}>
                    {data.tafsir.kemenag.short}
                  </Text>
                </View>
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

export default Surat;
