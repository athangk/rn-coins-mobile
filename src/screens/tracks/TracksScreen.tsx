import React from 'react';
import { Text, View } from 'react-native';
import CoinsList from '../../components/coinslist/CoinsList';
import { CoinData } from '../../models/ModelsInterfaces';
import { styles } from './Styles';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  removeTrack,
  selectTracks,
  setAllTracks
} from '../../store/reducers/TrackSliceReducer';

const TracksScreen = () => {
  const tracks = useAppSelector(selectTracks);

  const dispatch = useAppDispatch();

  const handleRemoveTrack = (coin: CoinData) => {
    dispatch(removeTrack(coin));
  };

  const handleSetOrder = (coins: CoinData[]) => {
    dispatch(setAllTracks(coins));
  };

  return (
    <View>
      <Text style={styles.infoText}> Track List </Text>
      <View style={styles.scrollContainer}>
        {tracks.length > 0 && (
          <CoinsList
            coins={tracks}
            actionTypeAdd={false}
            handleTouch={(coin: CoinData) => handleRemoveTrack(coin)}
            handleSetOrder={handleSetOrder}
          ></CoinsList>
        )}
      </View>
    </View>
  );
};

export default TracksScreen;
