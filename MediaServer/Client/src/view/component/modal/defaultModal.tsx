import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export type NewModalComponentType = {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  topView?: React.ReactNode;
  bottomView?: React.ReactNode;
  resetFunc?: () => void;
};

export const DefaultModal: React.FC<NewModalComponentType> = ({
  show,
  setShow,
  children,
  resetFunc,
}) => {
  const openAni = useRef(new Animated.Value(0)).current;
  const [inShow, setInShow] = useState(false);

  // 애니메이션
  useEffect(() => {
    if (show) {
      setInShow(true);
      Animated.timing(openAni, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(openAni, {
        toValue: 600,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => {
        setInShow(false);
        resetFunc && resetFunc();
      });
    }
  }, [openAni, resetFunc, show]);

  return (
    <Modal transparent={true} animationType={'none'} visible={inShow}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className={'flex flex-1'}>
        <TouchableWithoutFeedback onPress={() => setShow(false)}>
          <View className={'flex flex-1 bg-Dim-800 justify-center'}>
            <TouchableWithoutFeedback>
              <Animated.View
                className={'bg-white rounded-2xl px-5 py-4 mx-5'}
                style={{
                  transform: [{translateY: openAni}],
                }}>
                {children}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};
