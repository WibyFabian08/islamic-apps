import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {IconBack} from '../assets/icons';
import doa from '../data/doa';

const Doa = ({navigation, route}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let findDoa = null;

    findDoa = doa.find(data => {
      return data.judul == route.params.judul;
    });

    if (doa !== null) {
      setData(findDoa);
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
          {data !== null && data.judul}
        </Text>
        <View style={{height: 30, width: 30}}></View>
      </View>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View>
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
                {data !== null && data.arab}
              </Text>
            </View>
            <Text
              style={{
                color: '#9ea3a3',
                fontSize: 16,
                fontFamily: 'Poppins-SemiBold',
                marginBottom: 10,
              }}>
              Latin : {data !== null && data.latin}
            </Text>
            <Text
              style={{
                color: '#9ea3a3',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                marginBottom: 10,
              }}>
              Arti : {data !== null && data.arti}
            </Text>
            <Text
              style={{
                color: '#9ea3a3',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                marginBottom: 10,
              }}>
              Catatan : {data !== null && data.footnote}
            </Text>
            <Text
              style={{
                color: '#9ea3a3',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              Tags :
            </Text>
            <View style={{flexDirection: 'row'}}>
              {data !== null &&
                data.tag.map((data, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        color: '#9ea3a3',
                        fontSize: 16,
                        fontFamily: 'Poppins-Regular',
                        marginBottom: 10,
                        marginRight: 5,
                      }}>
                      {data},
                    </Text>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Doa;
