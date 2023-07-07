import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  infoText: {
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 'auto',
    fontSize: 16,
    color: theme.colors.mainWhite
  }
});
