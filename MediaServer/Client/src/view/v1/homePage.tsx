import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteList, RouteName} from '../../app/route/v1/route.tsx';
import {DefaultPaddingComponent} from '../component/defaultPaddingComponent.tsx';
import {ScrollViewComponent} from '../component/scrollViewComponent.tsx';
import {TextTitleComponent} from '../component/textTitleComponent.tsx';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ColorData from '../../app/util/colorData.tsx';

export const HomePage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteList>>();

  return (
    <ScrollViewComponent>
      <DefaultPaddingComponent>
        {/*상단 방송시작 버튼 뷰*/}
        <View>
          <TextTitleComponent
            stringList={['지금 바로 방송 시작']}
            subString={'원 클릭으로 에어 속으로'}
          />
          <View className={'mt-2'}>
            <TouchableOpacity
              onPress={() => navigation.push(RouteName.broadcastHome)}
              className={
                'border bg-Primary-400 items-center justify-center h-20 rounded border-BorderLine-300'
              }>
              <FontAwesome5Icon
                name={'broadcast-tower'}
                size={24}
                color={ColorData.Basic.White}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/*방송추천*/}
        {/*시청자 많은 순*/}
        {/*TODO::개발예정*/}
      </DefaultPaddingComponent>
    </ScrollViewComponent>
  );
};
