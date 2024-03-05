/// <reference types="nativewind/types" />
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Route} from "./src/app/route/v1/route";

AppRegistry.registerComponent(appName, () => Route);
