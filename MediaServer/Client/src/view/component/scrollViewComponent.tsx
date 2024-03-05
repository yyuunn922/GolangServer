import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import React from 'react';
import {Style} from 'nativewind/dist/style-sheet/runtime';

export type KeyBoardComponentType = {
  topChildren?: React.ReactNode;
  children: React.ReactNode;
  bottomChildren?: React.ReactNode;
  className?: string;
  style?: Style;
  scrollProps?: ScrollViewProps;
};
export const ScrollViewComponent: React.FC<KeyBoardComponentType> = ({
  children,
  topChildren,
  bottomChildren,
  style,
  scrollProps,
}) => {
  return (
    <KeyboardAvoidingView
      style={style && style}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={'flex flex-1'}>
      <SafeAreaView />
      {topChildren && topChildren}
      <ScrollView keyboardShouldPersistTaps={'handled'} {...scrollProps}>
        {children}
      </ScrollView>
      {bottomChildren && <>{bottomChildren}</>}
      <SafeAreaView />
    </KeyboardAvoidingView>
  );
};
