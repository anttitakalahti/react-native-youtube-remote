import React, {
  View,
  DeviceEventEmitter,
  Dimensions,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import Remote from './Remote';
import styles from '../Styles';

const STORAGE_KEY = '@YoutubeRemote:serverURL';

class ServerURLText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverURL: '',
      text: 'Try me!',
      visibleHeight: Dimensions.get('window').height
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow(e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({ visibleHeight: newSize });
  }

  keyboardWillHide(e) {
    this.setState({ visibleHeight: Dimensions.get('window').height });
  }

  handleSubmit(e) {
    AsyncStorage.setItem(STORAGE_KEY, this.state.serverURL);

    this.props.navigator.push({
      component: Remote,
      name: this.state.serverURL,
      serverURL: this.state.serverURL
    });
  }

  componentDidMount() {
    var value = AsyncStorage.getItem(STORAGE_KEY).then(value => {
      this.setState({serverURL: value});
    });
  }
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()} accessible={false}>
        <View style={{ height: this.state.visibleHeight }}>
          <View style={styles.container}>
            <Text style={styles.errorMessage}>
              {this.state.errorMessage}
            </Text>
            <TextInput
              testID='serverURL'
              style={styles.input}
              value={this.state.serverURL}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Server URL'
              clearButtonMode='while-editing'
              onChangeText={
                (text) => {
                  this.setState({ serverURL: text });
                }
              }
            />
            <TouchableHighlight
              testID='submit'
              style={styles.button}
              onPress={this.handleSubmit.bind(this)}
              underlayColor="white">
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

module.exports = ServerURLText;