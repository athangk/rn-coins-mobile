import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%'
  },
  logoWrapper: {
    flex: 1,
    marginTop: 40,
    alignItems: 'flex-start',
    marginLeft: 10
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffb380',
    marginBottom: 20
  },
  drawerItemLabel: {
    fontWeight: '900',
    color: 'white'
  },
  drawerItemSeparation: {
    borderStyle: 'solid',
    borderTopColor: '#ffb380',
    borderTopWidth: 1
  }
});
