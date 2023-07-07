import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Details from '../../components/details/Details';
import {
  CoinBarDataChart,
  CoinData,
  CoinDataChart,
  datasetArray
} from '../../models/ModelsInterfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTracks,
  selectTracks
} from '../../store/reducers/TrackSliceReducer';
import { styles } from './Styles';

import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Dimensions, Text } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Button } from 'react-native-paper';
import { HomeInnerStackParamList } from '../../navigation/interfaces';
import { selectCurrentUser } from '../../store/reducers/AuthSliceReducer';
import { useAppTheme } from '../../theme/theme';
import { chartConfig } from './CartsConfigs';
const screenWidth = Dimensions.get('window').width;

type ChartScreenProps = StackScreenProps<HomeInnerStackParamList, 'Charts'>;

const ChartsScreen = ({ navigation }: ChartScreenProps) => {
  const {
    colors: { darkOrange, mainWhite }
  } = useAppTheme();
  const dispatch = useAppDispatch();

  const tracks = useAppSelector(selectTracks);
  const authUserId = useAppSelector(selectCurrentUser);
  const [coinData, setCoinData] = useState<CoinDataChart | null>(null);
  const [coinBarData, setCoinBarData] = useState<CoinBarDataChart | null>(null);

  const [restTracks, setRestTracks] = useState<CoinData[]>([]);

  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) {
      dispatch(fetchTracks(tracks));
    }
  }, [isFocused]);

  useEffect(() => {
    if (tracks.length > 0) {
      const slicedTracks = tracks.slice(0, 3);

      const dataChartTracksNames = slicedTracks.map((item) => {
        return item.name;
      });
      const dataChartTracksPrices = slicedTracks.map((item) => {
        return item.price;
      });

      setCoinData({
        labels: [...dataChartTracksNames],
        data: [...dataChartTracksPrices]
      });

      const datasets: datasetArray[] = [{ data: [...dataChartTracksPrices] }];

      setCoinBarData({
        labels: [...dataChartTracksNames],
        datasets: datasets
      });

      const lastTracks = tracks.slice(3, tracks.length);

      if (lastTracks.length > 0) {
        setRestTracks(lastTracks);
      } else {
        setRestTracks([]);
      }
    }
  }, [tracks]);

  const navigateToEditor = () => {
    navigation.navigate('Editor');
  };

  return (
    <View style={styles.container}>
      {!!authUserId && (
        <View style={styles.lastVisitContainer}>
          <Text style={styles.lastVisitLabel}>Last visit:</Text>
          <Text style={[styles.lastVisitLabel, styles.lastVisitText]}>
            {authUserId.lastVisit}
          </Text>
        </View>
      )}
      {(tracks == null || (tracks && tracks.length < 2)) && (
        <View>
          <Details></Details>
          <View>
            <View style={styles.btnContainer}>
              <Button
                icon="plus-circle-outline"
                mode="contained"
                buttonColor={darkOrange}
                onPress={navigateToEditor}
                textColor={mainWhite}
              >
                Add Tracks
              </Button>
            </View>
          </View>
        </View>
      )}

      {tracks.length > 2 &&
        coinData &&
        coinBarData &&
        coinBarData.labels.length > 0 &&
        coinData.labels.length > 0 && (
          <View style={styles.inBetweenLayer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <>
                <LineChart
                  data={coinBarData}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                />

                <BarChart
                  style={styles.barChartStyle}
                  data={coinBarData}
                  width={screenWidth}
                  height={220}
                  yAxisLabel="$"
                  chartConfig={chartConfig}
                  verticalLabelRotation={30}
                  yAxisSuffix=""
                  yAxisInterval={1}
                />

                <View style={styles.largeContainer}>
                  <Text style={styles.largeLabelItem}>{tracks[0].id}</Text>
                  <View style={styles.largeInfoContainer}>
                    <Text style={styles.largeInfoPriceItem}>
                      {tracks[0].price.toFixed(3)}
                    </Text>
                    <Text style={styles.largeInfoDateItem}>
                      {tracks[0].date}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.mdRowContainer}>
                    <Text style={styles.mdRowLabelItem}>{tracks[1].id}</Text>
                    <View style={styles.mdRowInfoContainer}>
                      <Text style={styles.mdRowInfoPriceItem}>
                        {tracks[1].price.toFixed(4)}
                      </Text>
                      <Text style={styles.mdRowInfoDateItem}>
                        {tracks[1].date}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.mdRowContainer}>
                    <Text style={styles.mdRowLabelItem}>{tracks[2].id}</Text>
                    <View style={styles.mdRowInfoContainer}>
                      <Text style={styles.mdRowInfoPriceItem}>
                        {tracks[2].price.toFixed(2)}
                      </Text>
                      <Text style={styles.mdRowInfoDateItem}>
                        {tracks[2].date}
                      </Text>
                    </View>
                  </View>
                </View>

                {restTracks &&
                  restTracks.length > 0 &&
                  restTracks.map((track, index) => (
                    <View
                      style={styles.smContainer}
                      key={`rest-tracks-${index}`}
                    >
                      <Text style={styles.smLabelItem}>{track.id}</Text>
                      <View style={styles.smInfoContainer}>
                        <Text style={styles.smInfoPriceItem}>
                          {track.price.toFixed(2)}
                        </Text>
                        <Text style={styles.smInfoDateItem}>{track.date}</Text>
                      </View>
                    </View>
                  ))}
              </>
            </ScrollView>
          </View>
        )}
    </View>
  );
};

export default ChartsScreen;
