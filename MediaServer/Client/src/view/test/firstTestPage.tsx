import { SafeAreaView, Text, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export const FirstTestPage = () => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  requestPermission();

  if (device == null) {
    return (
      <SafeAreaView>
        <Text>!23123</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <Text>123</Text>
      <Text>123</Text>
      <Text>123</Text>
      <Camera className={'h-full border'} device={device} isActive={true} />
    </SafeAreaView>
  );
};
