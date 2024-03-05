import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {InitPage} from "../../../view/v1/page/system/initPage.tsx";
import {HomeRoute} from "./homeRoute.tsx";

export enum RouteName {
    initPage = "initPage",
    homeRoute = "homeRoute",
}

export type RouteList = {
    [RouteName.initPage]: undefined,
    [RouteName.homeRoute]: undefined,

}

export const Route = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={RouteName.initPage} screenOptions={{headerShown:false}}>
                <Stack.Screen name={RouteName.initPage} component={InitPage}/>
                <Stack.Screen name={RouteName.homeRoute} component={HomeRoute} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
