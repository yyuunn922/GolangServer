import {ActivityIndicator, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteList, RouteName} from '../../../app/route/v1/route.tsx';

export const InitPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteList>>();

  // 체크코드 확인후 홈페이지로
  useEffect(() => {
    navigation.push(RouteName.homeRoute);
  }, [navigation]);
  return (
    <View className={'flex flex-1 items-center justify-center'}>
      <ActivityIndicator />
    </View>
  );
};
