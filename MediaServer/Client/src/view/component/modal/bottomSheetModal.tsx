import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export type NewBottomSheetComponentType = {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  topView?: React.ReactNode;
  bottomView?: React.ReactNode;
  resetFunc?: () => void;
};

export const BottomSheetModal: React.FC<NewBottomSheetComponentType> = ({
  show,
  setShow,
  children,
  topView,
  bottomView,
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
        toValue: 300,
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
          <View className={'flex flex-1 bg-Dim-800 justify-end'}>
            <TouchableWithoutFeedback>
              <Animated.View
                className={'bg-white rounded-t-2xl px-5 pt-4'}
                style={{
                  transform: [{translateY: openAni}],
                }}>
                {topView && <View className={'mb-2'}>{topView}</View>}
                {children}
                {bottomView && <View>{bottomView}</View>}
                <BottomView />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// 바텀시트 하단 경계선 View입니다
const BottomView = () => {
  return (
    <SafeAreaView>
      {Platform.OS === 'android' && <View className={'h-10'} />}
    </SafeAreaView>
  );
};
