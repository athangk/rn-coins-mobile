import React from 'react';
import { Text, View } from 'react-native';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { BackHandler } from 'react-native';
import { SECURE_STORAGE_KEY } from '../../constants';
import { useAppDispatch } from '../../store/hooks';
import {
  resetAuthUser,
  resetSuccess
} from '../../store/reducers/AuthSliceReducer';
import { removeAllTracks } from '../../store/reducers/TrackSliceReducer';
import { secureDelete } from '../../utilities/utils';
import { styles } from './Styles';
const DrawerComponent = (props: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch();

  const handleExit = () => {
    props.navigation.closeDrawer();
    BackHandler.exitApp();
  };

  const navigateHome = async () => {
    props.navigation.closeDrawer();
    props.navigation.navigate('Charts');
  };

  const navigateEditor = async () => {
    props.navigation.closeDrawer();
    props.navigation.navigate('Editor');
  };

  const handleLogout = async () => {
    await secureDelete(SECURE_STORAGE_KEY);
    dispatch(resetSuccess());
    dispatch(removeAllTracks());
    dispatch(resetAuthUser());
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.logoWrapper}>
        <Text style={styles.logoText}>Coinency</Text>
      </View>

      <View>
        <DrawerItem
          labelStyle={styles.drawerItemLabel}
          label="Charts"
          onPress={navigateHome}
        />
        <DrawerItem
          labelStyle={styles.drawerItemLabel}
          label="Editor"
          onPress={navigateEditor}
          style={styles.drawerItemSeparation}
        />
        <DrawerItem
          labelStyle={styles.drawerItemLabel}
          label="Logout"
          onPress={handleLogout}
          style={styles.drawerItemSeparation}
        />
        <DrawerItem
          labelStyle={styles.drawerItemLabel}
          label="Exit"
          onPress={handleExit}
          style={styles.drawerItemSeparation}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerComponent;
