/// <reference types="nativewind/types" />
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Route} from './src/app/route/v1/route';
import {Appearance} from 'react-native';

Appearance.setColorScheme('light');

AppRegistry.registerComponent(appName, () => Route);
