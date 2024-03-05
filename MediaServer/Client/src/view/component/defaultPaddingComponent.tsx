import {View} from 'react-native';
import React from 'react';

export type DefaultPaddingPageComponentType = {
  children: React.ReactNode;
  x?: boolean;
  y?: boolean;
};

export const DefaultPaddingComponent: React.FC<
  DefaultPaddingPageComponentType
> = ({children, x = true, y = true}) => {
  return (
    <View className={`flex flex-1 ${x && 'px-5'} ${y && 'py-4'} flex-1`}>
      {children}
    </View>
  );
};
