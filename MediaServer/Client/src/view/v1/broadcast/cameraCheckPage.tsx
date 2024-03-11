import {ActivityIndicator, Linking, Text, View} from 'react-native';
import {mediaDevices, RTCView} from 'react-native-webrtc';
import {
  ButtonDefault_1,
  ButtonDefaultSmall_1,
} from '../../component/button/ButtonComponent.tsx';
import {DefaultPaddingComponent} from '../../component/defaultPaddingComponent.tsx';
import React, {useContext, useEffect, useState} from 'react';
import {BroadCastPageContext, BroadcastPageFunnel} from './broadcastPage.tsx';
import {ScrollViewComponent} from '../../component/scrollViewComponent.tsx';
import {EmptyComponent} from '../../component/emptyComponent.tsx';

export const CameraCheckPage = () => {
  const broadcastPageContext = useContext(BroadCastPageContext)!;
  const [mediaDeviceError, setMediaDeviceError] = useState(false);

  // 사용자의 사용가능한 스트림을 찾습니다
  // facingMode : environment: 후면카메라, user : 셀프 카메라
  // video : {width: { min: 1024, ideal: 1280, max: 1920 }...,
  // video : {height: { min: 576, ideal: 720, max: 1080 }...,
  // frameRete : 초당 프레임
  useEffect(() => {
    if (!broadcastPageContext.stream) {
      mediaDevices
        // 설정된 미디어 옵션 장치 가운데, 첫번째 비디오 소스를 사용합니다.
        // 비디오 true, audio true로, 각 첫번째로 사용가능한 미디어 소스를 로드합니다.
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then(mediaStream => {
          // 로드된 데이터를 스트림에 넣습니다.
          broadcastPageContext.setStream(mediaStream);
        })
        .catch(e => {
          // 사용자 장치 검색에 에러가 발생했어요
          console.log(e);
          setMediaDeviceError(true);
        });
    }
  }, [broadcastPageContext]);

  return (
    <ScrollViewComponent bottomChildren={<NextButtonBox />}>
      <DefaultPaddingComponent y={false}>
        {/*사용 가능한 스트림이 없을때는, 로딩바를 돌리고, 검색이 완료되면, 예시 화면을 보여줍니다*/}
        {broadcastPageContext.stream ? (
          <View className={'flex flex-1 mt-10'}>
            <RTCView
              className={'w-full aspect-square'}
              streamURL={broadcastPageContext.stream.toURL()}
              mirror={true}
            />
            <View className={'items-center justify-center mt-10'}>
              {broadcastPageContext.stream._tracks.map((item, index) => (
                <View key={index}>
                  <Text>{item.kind.toUpperCase()}를 사용 가능합니다.</Text>
                </View>
              ))}
            </View>
          </View>
        ) : // TODO::장치 검색에 문제가 생길때, 처리해야됨
        mediaDeviceError ? (
          <View className={'mt-10'}>
            <EmptyComponent
              title={['데이터가 없습니다']}
              subText={['아래 버튼으로 권한을 요청하세요']}
            />
            <View className={'mt-2'}>
              <ButtonDefaultSmall_1
                title={'권한 설정 하기'}
                event={() => Linking.openSettings().then(() => {})}
              />
            </View>
          </View>
        ) : (
          <View className={'flex flex-1 items-center justify-center'}>
            <ActivityIndicator />
          </View>
        )}
      </DefaultPaddingComponent>
    </ScrollViewComponent>
  );
};

const NextButtonBox = () => {
  const broadcast = useContext(BroadCastPageContext)!;
  return (
    <View className={'p-4'}>
      <View className={'flex flex-row'}>
        <View className={'flex-1'}>
          <ButtonDefault_1
            title={'다음'}
            disable={!broadcast.stream}
            event={() => broadcast.setFunnel(BroadcastPageFunnel.settingPage)}
          />
        </View>
      </View>
    </View>
  );
};
