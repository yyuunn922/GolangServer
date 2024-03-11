import {Text, View} from 'react-native';
import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {TobBarDefaultComponent} from '../../component/topBarBackButtonWithTitleButtonComponent.tsx';
import {FunnelPageProgressBarComponent} from '../../component/funnelPageProgressBarComponent.tsx';
import {CameraCheckPage} from './cameraCheckPage.tsx';
import {SettingPage} from './settingPage.tsx';
import {MediaStream} from 'react-native-webrtc';
import {useFocusEffect} from '@react-navigation/native';

export enum BroadcastPageFunnel {
  cameraCheckPage = 'cameraCheckPage',
  settingPage = 'settingPage',
}

export type BroadCastPageContextType = {
  setFunnel: React.Dispatch<SetStateAction<BroadcastPageFunnel>>;
  stream: MediaStream | undefined;
  setStream: Dispatch<SetStateAction<MediaStream | undefined>>;
};

export const BroadCastPageContext = createContext<
  undefined | BroadCastPageContextType
>(undefined);

export const BroadcastPage = () => {
  const [funnelState, setFunnelState] = useState(
    BroadcastPageFunnel.cameraCheckPage,
  );
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);

  useFocusEffect(
    React.useCallback(() => {
      // 스크린에 진입했을 때 실행될 코드
      return () => {
        console.log('코코');
        if (stream) {
          stream._tracks.map(item => item.stop());
        }
      };
    }, [stream]),
  );

  return (
    <BroadCastPageContext.Provider
      value={{setFunnel: setFunnelState, stream: stream, setStream: setStream}}>
      <TobBarDefaultComponent title={'뒤로가기'}>
        <FunnelPageProgressBarComponent
          totalCount={Object.keys(BroadcastPageFunnel).length}
          currentCount={Object.values(BroadcastPageFunnel).indexOf(funnelState)}
        />
      </TobBarDefaultComponent>
      {funnelState === BroadcastPageFunnel.cameraCheckPage ? (
        <CameraCheckPage />
      ) : funnelState === BroadcastPageFunnel.settingPage ? (
        <SettingPage />
      ) : (
        <View>
          <Text>잘못된 접근입니다.</Text>
        </View>
      )}
    </BroadCastPageContext.Provider>
  );
};
