// eslint-disable-next-line prettier/prettier
import { StyleSheet } from 'react-native';

export const ITEM_HEIGHT = 260;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  card: {
    // flexDirection: 'row',
    height: 260,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#1f1d1a',
  },
  description: {
    fontSize: 14,
    color: '#3b3833',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  pinButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },

  listContainerStyle: {
    padding: 23,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  deleteContainer: {
    padding: 12,
    justifyContent: 'center',
  },
  indicator: {
    marginLeft: 8,
  },
});

export default styles;
