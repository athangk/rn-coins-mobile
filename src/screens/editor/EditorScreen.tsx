import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tab } from '../../navigation/interfaces';
import { useAppTheme } from '../../theme/theme';
import CoinsScreen from '../coins/CoinsScreen';
import TracksScreen from '../tracks/TracksScreen';

const EditorScreen = () => {
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

export default EditorScreen;
