import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

// 선택관련 기본 버튼
export type ButtonDefault_1_Type = {
  title: string;
  event?: () => void;
  disable?: boolean;
};
export const ButtonDefault_1: React.FC<ButtonDefault_1_Type> = ({
  title,
  event,
  disable = false,
}) => {
  console.log(disable);
  return (
    <TouchableOpacity
      onPress={!disable ? event : undefined}
      activeOpacity={!disable ? 0.5 : 1}
      className={`border px-2 py-5 rounded border-BorderLine-300 bg-Primary-500 items-center justify-center flex ${
        disable && 'bg-PrimaryGreyColor-500'
      }`}>
      <Text className={`text-white text-base ${disable && 'text-Text-900'}`}>{title}</Text>
    </TouchableOpacity>
  );
};

// 기본 스몰 버튼
export type ButtonDefaultSmall_1_Type = {
  title: string;
  event: () => void;
};
export const ButtonDefaultSmall_1: React.FC<ButtonDefaultSmall_1_Type> = ({
  title,
  event,
}) => {
  return (
    <View className={'flex flex-row items-center justify-center'}>
      <TouchableOpacity
        onPress={event}
        className={
          'border px-4 py-1 rounded bg-Primary-500 border-BorderLine-300'
        }>
        <Text className={'text-Text-Wh text-xs'}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

// 방송 선택 버튼
export type ButtonBig_1_Type = {
  event: () => void;
  title: string;
};
export const ButtonBig_1: React.FC<ButtonBig_1_Type> = ({title, event}) => {
  return (
    <TouchableOpacity onPress={event}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
