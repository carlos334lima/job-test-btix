import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  header_text: {
    color: '#fff',
    fontSize: 22,
  },
  header_wrapper: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fe4e28',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
  },
  comments_wrapper: {
    backgroundColor: '#454545',
    width: '100%',
    height: 200,
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    padding: 5,
    paddingLeft: 10,
  },
  subtitle: {
    color: '#8e8e8e',
    fontSize: 15,
    padding: 5,
    paddingLeft: 10,
  },
});
