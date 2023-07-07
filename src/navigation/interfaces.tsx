import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export const Drawer = createDrawerNavigator();
export const Tab = createMaterialBottomTabNavigator();

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  }
};

export type RootStackParamList = {
  Login: undefined;
  Loading: undefined;
  HomeDrawer: undefined;
};

export type HomeInnerStackParamList = {
  Charts: undefined;
  Editor: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();

export const InnerStack = createStackNavigator<HomeInnerStackParamList>();
