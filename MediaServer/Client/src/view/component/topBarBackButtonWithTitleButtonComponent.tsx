import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Style} from 'nativewind/dist/style-sheet/runtime';
import ColorData from '../../app/util/colorData.tsx';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {RouteList} from '../../app/route/v1/route.tsx';

export const TobBarDefaultComponent = ({
  title,
  style,
  white = false,
  children,
}: {
  title?: string;
  className?: string;
  style?: Style;
  white?: boolean;
  children?: React.ReactNode;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteList>>();
  return (
    <SafeAreaView>
      <View
        style={style && style}
        className={'px-5 py-4 flex flex-row items-center'}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          className={'flex flex-row items-center'}>
          <MaterialIcon
            name={'arrow-back-ios'}
            size={25}
            color={white ? ColorData.Basic.White : ColorData.Basic.Black}
          />
          <Text className={`text-Text-900 text-lg ${white && 'text-Text-Wh'}`}>
            {title}
          </Text>
        </TouchableOpacity>
        <View className="flex flex-1" />
        <View>{children}</View>
      </View>
    </SafeAreaView>
  );
};
