import {Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollViewComponent} from '../../component/scrollViewComponent.tsx';
import {DefaultPaddingComponent} from '../../component/defaultPaddingComponent.tsx';
import {ButtonDefault_1} from '../../component/button/ButtonComponent.tsx';
import {BroadCastPageContext, BroadcastPageFunnel} from './broadcastPage.tsx';
import {RTCPeerConnection} from 'react-native-webrtc';

export const SettingPage = () => {
  const broadCastContext = useContext(BroadCastPageContext)!;
  const [description, setDescription] = useState();

  useEffect(() => {
    const peerConnect = new RTCPeerConnection({
      iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
    });
    broadCastContext.stream!._tracks.forEach(track => {
      peerConnect.addTrack(track);
    });
    peerConnect.createOffer({}).then(r => {
      console.log('이거다!! 코딩!!');
      console.log('Offer:', r);
      console.log('Offer type:', r.type);
      console.log('Offer sdp:', r.sdp);
      setDescription(r);
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    if (description) {
      console.log('이거 실행');
      fetch('http://192.168.0.29:8080/offer', {
        method: 'POST',
        body: JSON.stringify(description),
      })
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log('에러 발생');
          console.log(e);
        });
    }
  }, [description]);

  return (
    <ScrollViewComponent bottomChildren={<NextButtonBox />}>
      <DefaultPaddingComponent y={false}>
        <Text>123</Text>
      </DefaultPaddingComponent>
    </ScrollViewComponent>
  );
};

const NextButtonBox = () => {
  const broadCasContext = useContext(BroadCastPageContext)!;
  return (
    <View className={'flex flex-row p-2'}>
      <View className={'flex-1'}>
        <ButtonDefault_1
          title={'이전'}
          event={() =>
            broadCasContext.setFunnel(BroadcastPageFunnel.cameraCheckPage)
          }
        />
      </View>
      <View className={'flex-1'}>
        <ButtonDefault_1 title={'시작'} event={() => {}} />
      </View>
    </View>
  );
};
