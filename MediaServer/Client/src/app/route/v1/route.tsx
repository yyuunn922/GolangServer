import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InitPage} from '../../../view/v1/system/initPage.tsx';
import {HomeRoute} from './homeRoute.tsx';
import React from 'react';
import {Key} from '../../util/key.tsx';
import {FirstTestPage} from '../../../view/test/firstTestPage.tsx';

const Stack = createNativeStackNavigator();

export enum RouteName {
  initPage = 'initPage',
  homeRoute = 'homeRoute',
}

export type RouteList = {
  [RouteName.initPage]: undefined;
  [RouteName.homeRoute]: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
