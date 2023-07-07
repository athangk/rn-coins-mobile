import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    margin: 20
  },

  mainLabel: {
    textAlign: 'center',
    color: theme.colors.mainOrange,
    fontSize: 22,
    marginBottom: 4,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '900'
  },
  borderContainer: {
    borderColor: theme.colors.mainWhite,
    borderRadius: 20,
    borderWidth: 2,
    padding: 20,
    marginBottom: 10
  },
  innerBorderContainer: {
    marginBottom: 4
  },
  inputLabels: {
    color: theme.colors.mainWhite,
    fontSize: 16
  },
  errorLabels: {
    color: theme.colors.mainErrorRed,
    fontWeight: '400'
  },
  errorTextCenter: {
    textAlign: 'center'
  },

  passwordContainer: {
    marginBottom: 16
  },
  checkBoxLabel: {
    textDecorationLine: 'none',
    color: theme.colors.mainWhite,
    fontSize: 14
  },
  checkBoxContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column'
  },
  optionalLabel: {
    color: theme.colors.mainWhiteLight,
    fontSize: 12,
    marginLeft: 40
  },
  mainErrorContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitContainer: {
    marginBottom: 2,
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
