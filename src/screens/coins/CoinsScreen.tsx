import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import CoinsList from '../../components/coinslist/CoinsList';
import Details from '../../components/details/Details';
import { CoinData } from '../../models/ModelsInterfaces';
import { selectNonTracks } from '../../store/combinedSelector';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCoins,
  selectLoading
} from '../../store/reducers/CoinSliceReducer';
import { addTrack } from '../../store/reducers/TrackSliceReducer';
import { useAppTheme } from '../../theme/theme';
import { styles } from './Styles';

const CoinsScreen = () => {
  const {
    colors: { darkOrange }
  } = useAppTheme();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const coins = useAppSelector(selectNonTracks);

  const handleAddTrack = (coin: CoinData) => {
    dispatch(addTrack(coin));
  };

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Button icon="reload" onPress={() => dispatch(fetchCoins())}>
          Reload
        </Button>
      </View>
      <Details></Details>
      <View style={styles.loader}>
        {loading && <ActivityIndicator size="large" color={darkOrange} />}
      </View>
      <View style={styles.scrollContainer}>
        {coins.length > 0 && (
          <CoinsList
            coins={coins}
            actionTypeAdd={true}
            handleTouch={(coin: CoinData) => handleAddTrack(coin)}
          ></CoinsList>
        )}
      </View>
    </View>
  );
};

export default CoinsScreen;
