import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InitPage} from '../../../view/v1/system/initPage.tsx';
import {HomeRoute} from './homeRoute.tsx';
import React from 'react';
import {Key} from '../../util/key.tsx';
import {FirstTestPage} from '../../../view/test/firstTestPage.tsx';
import {BroadcastPage} from '../../../view/v1/broadcast/broadcastPage.tsx';

const Stack = createNativeStackNavigator();

export enum RouteName {
  initPage = 'initPage',
  homeRoute = 'homeRoute',
  broadcastHome = 'broadcastHome',
}

export type RouteList = {
  [RouteName.initPage]: undefined;
  [RouteName.homeRoute]: undefined;
  [RouteName.broadcastHome]: undefined;
};

export enum RouteNameTest {
  firstTestPage = 'firstTestPage',
}

export type RouteListTest = {
  [RouteNameTest.firstTestPage]: undefined;
};

export const Route = () => {
  return Key.TestMode === 'Y' ? <RouteTestList /> : <RouteList />;
};

const RouteList = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteName.initPage}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={RouteName.initPage} component={InitPage} />
        <Stack.Screen name={RouteName.homeRoute} component={HomeRoute} />
        <Stack.Screen
          name={RouteName.broadcastHome}
          component={BroadcastPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 테스트 환경에서, 빠르게 Component를 찍어보고 확인하기 위한 용도로 테스트로 만들어진 Route입니다
const RouteTestList = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteNameTest.firstTestPage}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={RouteNameTest.firstTestPage}
          component={FirstTestPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
