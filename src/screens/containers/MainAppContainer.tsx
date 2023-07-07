import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import { SECURE_STORAGE_KEY } from '../../constants';
import { MainDrawerNavigator } from '../../navigation/MainNavigator';
import { MyTheme, Stack } from '../../navigation/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchUserData,
  selectCurrentUser,
  selectLoading,
  selectSuccess
} from '../../store/reducers/AuthSliceReducer';
import { getSecureValue } from '../../utilities/utils';
import LoadingScreen from '../loading/LoadingScreen';
import LoginScreen from '../login/LoginScreen';
import { styles } from './Styles';

const MainAppContainer = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectLoading);
  const success = useAppSelector(selectSuccess);
  const [hasToken, setHasToken] = useState(false);
  const [validating, setValidating] = useState(true);

  const checkTokenExists = async () => {
    const token = await getSecureValue(SECURE_STORAGE_KEY);
    if (token) {
      dispatch(fetchUserData({ token: token }));
      setHasToken(true);
    } else {
      setHasToken(false);
    }
    setValidating(false);
    return token;
  };

  useEffect(() => {
    const checkToken = async () => {
      setValidating(true);
      await checkTokenExists();
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (authUser == null && !success && !loading && !validating) {
      checkTokenExists();
    }
  }, [authUser, success, loading, validating]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/appBackground.png')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.layout}>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
              initialRouteName="Loading"
            >
              {(loading || validating) && (
                <Stack.Screen name="Loading" component={LoadingScreen} />
              )}
              {!success && !hasToken && !loading && (
                <Stack.Screen name="Login" component={LoginScreen} />
              )}
              {(success || hasToken) && (
                <Stack.Screen
                  name="HomeDrawer"
                  component={MainDrawerNavigator}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MainAppContainer;
