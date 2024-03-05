import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export type DefaultButtonComponentType = {
  title: string;
  event: () => {};
};
export const DefaultButtonComponent: React.FC<DefaultButtonComponentType> = ({
  title,
  event,
}) => {
  return (
    <TouchableOpacity onPress={event}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
