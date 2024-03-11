import {Text, View} from 'react-native';
import React from 'react';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import ColorData from '../../app/util/colorData.tsx';

export type EmptyComponentType = {
  title: string[];
  subText?: string[];
};

export const EmptyComponent: React.FC<EmptyComponentType> = ({
  title,
  subText,
}) => {
  return (
    <View className={'items-center justify-center'}>
      <OcticonsIcon
        name={'question'}
        size={80}
        color={ColorData.PrimaryColor['500']}
      />
      {/*타이틀*/}
      <View className={'mt-2'}>
        {title &&
          title.map((titleItem, index) => (
            <View key={index}>
              <Text className={'text-2xl text-Text-900'}>{titleItem}</Text>
            </View>
          ))}
      </View>
      {/*서브 타이틀*/}
      <View className={'mt-0.5'}>
        {subText &&
          subText.map((subTextItem, index) => (
            <View key={index}>
              <Text className={'text-xs text-Text-600'}>{subTextItem}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};
