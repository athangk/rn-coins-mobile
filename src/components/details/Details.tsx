import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './Styles';

const Details = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Add at least 3 tracks</Text>
    </View>
  );
};

export default Details;
