import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 10,
    paddingBottom: 20
  },
  loader: {
    marginTop: 40
  },
  btnContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    marginVertical: 'auto',
    marginTop: 40,
    width: 400
  },
  scrollContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    marginTop: 0,

    height: 400
  },
  infoText: {
    flexGrow: 1,
    flexDirection: 'row',
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 'auto',
    marginTop: 50,
    marginBottom: 40,
    fontSize: 16,
    color: theme.colors.darkOrange
  }
});
