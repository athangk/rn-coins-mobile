import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAppTheme } from '../../theme/theme';
import { styles } from './Styles';

const LoadingScreen = () => {
  const {
    colors: { mainOrange }
  } = useAppTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={mainOrange} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
