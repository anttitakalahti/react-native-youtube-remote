import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  input: {
    height: 45,
    padding: 4,
    margin: 10,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    color: 'black'
  },
  button: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  errorMessage: {
    color: 'red'
  }
});