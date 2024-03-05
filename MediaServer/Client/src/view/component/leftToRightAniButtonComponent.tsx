import React, {useEffect, useMemo} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {Style} from 'nativewind/dist/style-sheet/runtime';

export type LeftToRightAniButtonComponentType = {
  event: () => void;
  index: number;
  children: React.ReactNode;
  white?: boolean;
  style?: Style;
  className?: string;
};

export const LeftToRightAniButtonComponent: React.FC<
  LeftToRightAniButtonComponentType
> = ({children, event, index, white = false, style}) => {
  const animation = useMemo(() => new Animated.Value(-500), []);
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, 100 * index);
  });
  return (
    <TouchableOpacity onPress={event}>
      <Animated.View
        className={`rounded-lg ${white ? 'bg-white' : 'bg-Fill-100'}`}
        style={{transform: [{translateX: animation}]}}>
        <View className={'p-5 rounded-lg'} style={style}>
          {children}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
