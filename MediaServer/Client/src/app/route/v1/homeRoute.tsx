import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomePage} from '../../../view/v1/homePage.tsx';
import {MyPage} from '../../../view/v1/mypage/myPage.tsx';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { Platform, Text } from "react-native";
import ColorData from '../../util/colorData.tsx';

export enum HomeRouteItemName {
  homePage = 'homePage',
  myPage = 'myPage',
}

export type HomeRouteType = {
  [HomeRouteItemName.homePage]: undefined;
  [HomeRouteItemName.myPage]: undefined;
};

const Tab = createBottomTabNavigator();

export const HomeRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 36 : 18,
          height: Platform.OS === 'ios' ? 100 : 83,
        },
      }}>
      <Tab.Screen
        name={HomeRouteItemName.homePage}
        component={HomePage}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="home"
              size={24}
              color={
                focused
                  ? ColorData.CiriusPet['500']
                  : ColorData.CiriusPetGray['500']
              }
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              className={'text-[10px]'}
              style={{
                color: focused
                  ? ColorData.CiriusPet['500']
                  : ColorData.CiriusPetGray['500'],
              }}>
              홈
            </Text>
          ),
        })}
      />
      <Tab.Screen
        name={HomeRouteItemName.myPage}
        component={MyPage}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <AntDesignIcons
              name="setting"
              size={24}
              color={
                focused
                  ? ColorData.CiriusPet['500']
                  : ColorData.CiriusPetGray['500']
              }
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              className={'text-[10px]'}
              style={{
                color: focused
                  ? ColorData.CiriusPet['500']
                  : ColorData.CiriusPetGray['500'],
              }}>
              마이페이지
            </Text>
          ),
        })}
      />
    </Tab.Navigator>
  );
};
