import React from 'react';
import {Modal, Text, TouchableWithoutFeedback, View} from 'react-native';
import {DefaultButtonComponent} from '../button/defaultButtonComponent.tsx';

export type YesOrNoModalType = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  event: () => void;
  cancelTitle?: string;
  okTitle?: string;
};

export const YesOrNoModal: React.FC<YesOrNoModalType> = ({
  show,
  setShow,
  children,
  event,
  cancelTitle,
  okTitle,
}) => {
  return (
    <Modal visible={show} transparent={true} animationType={'slide'}>
      <TouchableWithoutFeedback onPress={() => setShow(false)}>
        <View
          className={
            'w-full h-full bg-black/50 flex items-center justify-center'
          }>
          <TouchableWithoutFeedback>
            <View className={'bg-white p-4 rounded-md w-10/12'}>
              <View>{children}</View>
              <View className={'flex flex-row'}>
                <View className={'flex-1'}>
                  <DefaultButtonComponent
                    title={okTitle ? okTitle : '예'}
                    event={() => event}
                  />
                </View>
                <View className={'w-3'} />
                <View className={'flex-1'}>
                  <DefaultButtonComponent
                    title={cancelTitle ? cancelTitle : '아니요'}
                    event={() => event}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export type YesOrNoModalDefaultBodyType = {
  title: string;
  description?: string;
  subDescription?: string;
};

export const YesOrNoModalDefaultBody: React.FC<YesOrNoModalDefaultBodyType> = ({
  title,
  subDescription,
  description,
}) => {
  return (
    <View className={'flex items-center'}>
      <View className={'mb-3'}>
        <Text className={'text-base text-Text-600'}>{title}</Text>
      </View>
      <View className={'mb-10 items-center'}>
        {description && (
          <Text className={'text-lg text-Text-900'}>{description}</Text>
        )}
        {subDescription && (
          <Text className={'text-lg text-Text-900'}>{subDescription}</Text>
        )}
      </View>
    </View>
  );
};
