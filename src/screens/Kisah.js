import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {IconBack} from '../assets/icons';
import kisahNabi from '../data/kisahNabi';

const Kisah = ({navigation, route}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let findKisah = null;

    findKisah = kisahNabi.find(data => {
      return data.name == route.params.name;
    });

    if (kisahNabi !== null) {
      setData(findKisah);
    }
  }, [route.params.name]);

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
          {data !== null && (
            <Image
              resizeMode="cover"
              source={{uri: data.image_url}}
              style={{height: 200, width: '100%', marginBottom: 10}}></Image>
          )}
          <View>
            <Text
              style={{
                color: '#9ea3a3',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              Nama : {data !== null && data.name}
            </Text>
            <Text
              style={{
                color: '#9ea3a3',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              Tempat : {data !== null && data.tmp}
            </Text>
            <Text
              style={{
                color: '#9ea3a3',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              Usia : {data !== null && data.usia} th
            </Text>
            <Text
              style={{
                color: '#9ea3a3',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              Kisah :
            </Text>
            <Text
              style={{
                color: '#9ea3a3',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              {data !== null && data.description}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Kisah;
