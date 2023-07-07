import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: theme.colors.mainWhite,
    fontSize: 16
  }
});
