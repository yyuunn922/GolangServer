import {Text, View} from 'react-native';
import React from 'react';

export type TextTitleComponentType = {
  stringList: string[];
  subString?: string;
};

export const TextTitleComponent: React.FC<TextTitleComponentType> = ({
  stringList,
  subString,
}) => {
  return (
    <View>
      {stringList.map((item, index) => (
        <View key={index}>
          <Text className={'text-[23px] font-bold text-Text-900'}>{item}</Text>
        </View>
      ))}
      {subString && (
        <View className={'mt-0.5'}>
          <Text className={'text-xs text-Text-600'}>{subString}</Text>
        </View>
      )}
    </View>
  );
};
