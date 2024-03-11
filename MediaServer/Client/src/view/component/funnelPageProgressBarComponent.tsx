import React from 'react';
import {View} from 'react-native';

export type FunnelPageProgressBarComponentType = {
  totalCount: number;
  currentCount: number;
};

export const FunnelPageProgressBarComponent: React.FC<
  FunnelPageProgressBarComponentType
> = ({totalCount, currentCount}) => {
  return (
    <View className={'flex flex-row gap-1'}>
      {Array.from({length: totalCount}, (_, i) => {
        return (
          <View
            key={i}
            className={`h-2 w-6 rounded-full ${
              currentCount >= i
                ? 'bg-PrimaryColor-300'
                : 'bg-PrimaryGreyColor-500'
            }`}
          />
        );
      })}
    </View>
  );
};
