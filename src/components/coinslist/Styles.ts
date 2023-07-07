import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    borderRadius: 20,
    height: 80,
    marginTop: 4,
    marginBottom: 4,
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.mainPurple
  },
  actionBtnDragStart: {
    backgroundColor: theme.colors.mainWhiteLight
  },
  actionBtnDragStop: {
    backgroundColor: theme.colors.mainPurple
  },

  cardText: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: theme.colors.mainWhite,
    fontSize: 22,
    width: '50%'
  },
  listContainer: {
    height: (Dimensions.get('window').height * 60) / 100
  }
});
