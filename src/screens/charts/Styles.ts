import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 4,
    paddingBottom: 20
  },
  lastVisitContainer: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lastVisitLabel: {
    color: theme.colors.mainWhite,
    fontStyle: 'italic'
  },
  lastVisitText: {
    fontWeight: '600'
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
    margin: 14,
    paddingTop: 20
  },
  btnContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inBetweenLayer: {
    flexGrow: 1,
    margin: 4,
    borderStyle: 'solid',
    borderColor: theme.colors.mainDark,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 32
  },
  barChartStyle: {
    marginBottom: 30,
    marginTop: 20
  },
  largeContainer: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.mainPurple,
    justifyContent: 'space-around',
    padding: 20,
    flexDirection: 'row',
    borderRadius: 30,
    marginBottom: 20
  },
  mdRowContainer: {
    width: '48%',
    height: 180,
    backgroundColor: theme.colors.mainPurple,
    justifyContent: 'space-around',
    padding: 16,
    flexDirection: 'column',
    borderRadius: 30,
    marginBottom: 20,
    marginHorizontal: 4
  },
  smContainer: {
    width: '100%',
    height: 80,
    backgroundColor: theme.colors.mainPurple,
    justifyContent: 'space-around',
    padding: 20,
    flexDirection: 'row',
    borderRadius: 30,
    marginBottom: 20
  },
  largeLabelItem: {
    color: 'white',
    fontSize: 64,
    fontWeight: '900'
  },
  largeInfoContainer: {
    marginTop: 60
  },
  largeInfoPriceItem: {
    color: '#ffb380',
    fontSize: 44,
    fontWeight: '900'
  },
  largeInfoDateItem: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400'
  },

  mdRowLabelItem: {
    color: 'white',
    fontSize: 34,
    fontWeight: '900'
  },
  mdRowInfoContainer: {
    marginTop: 20
  },
  mdRowInfoPriceItem: {
    color: '#ffb380',
    fontSize: 34,
    fontWeight: '900'
  },
  mdRowInfoDateItem: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400'
  },
  smLabelItem: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900'
  },
  smInfoContainer: {
    marginTop: 0
  },
  smInfoPriceItem: {
    color: '#ffb380',
    fontSize: 18,
    fontWeight: '900'
  },
  smInfoDateItem: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400'
  }
});
