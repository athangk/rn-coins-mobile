import { theme } from '../../theme/theme';

export const chartConfig = {
  backgroundColor: theme.colors.darkOrange,
  backgroundGradientFrom: theme.colors.darkPurple,
  backgroundGradientTo: theme.colors.lightPurple,
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 179, 128, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
    padding: 14,
    margin: 14
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: theme.colors.mainOrange
  }
};
