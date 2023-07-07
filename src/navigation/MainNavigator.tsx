import { View } from 'react-native';
import 'react-native-gesture-handler';

import { InnerStack, Tab } from './interfaces';

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChartsScreen from '../screens/charts/ChartsScreen';
import CoinsScreen from '../screens/coins/CoinsScreen';
import DrawerComponent from '../screens/drawer/DrawerComponent';
import TracksScreen from '../screens/tracks/TracksScreen';

import { useAppTheme } from '../theme/theme';
import { Drawer } from './interfaces';

// Editor Tab Navigator
const EditorTabNavigator = () => {
  const {
    colors: { mainPurple, mainOrange }
  } = useAppTheme();
  return (
    <View style={{ flexGrow: 1 }}>
      <Tab.Navigator
        initialRouteName={'Coins'}
        sceneAnimationEnabled={true}
        shifting={true}
        activeColor="white"
        inactiveColor="orange"
        barStyle={{ backgroundColor: mainPurple }}
      >
        <Tab.Screen
          name="Coins"
          component={CoinsScreen}
          options={{
            tabBarColor: mainPurple,
            tabBarIcon: () => (
              <Icon name={'plus-circle-outline'} color={mainOrange} size={24} />
            )
          }}
        />
        <Tab.Screen
          name="Tracks"
          component={TracksScreen}
          options={{
            tabBarColor: mainPurple,
            tabBarIcon: () => (
              <Icon
                name={'minus-circle-outline'}
                color={mainOrange}
                size={24}
              />
            )
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

// DrawerNavigator
export const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerShown: true,
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#21042b'
        },
        drawerStyle: {
          backgroundColor: '#290038',
          width: 240
        }
      }}
      drawerContent={(props) => <DrawerComponent {...props} />}
    >
      <InnerStack.Screen name="Charts" component={ChartsScreen} />
      <InnerStack.Screen name="Editor" component={EditorTabNavigator} />
    </Drawer.Navigator>
  );
};
