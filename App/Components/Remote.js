import React, {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import styles from '../Styles';

class Remote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      volumeStatus: '',
      infoText: '',
      errorMessage: ''
    };
  };

  componentDidMount() {
    this.fetchInfo();
    this.setState({ text: 'Try me!' });
  };

  fetchInfo() {
    fetch(this.props.serverURL + '/active-window-title')
      .then((response) => response.json())
      .then(responseData => {
        this.setState({ infoText: responseData.title });
      })
      .catch(error => {
        console.log('Remote - fetchInfo - error:', error)
      })
      .done();
  };
  
  toggleVideo() {
    fetch(this.props.serverURL + '/toggle-video')
      .then((response) => response.json())
      .then((responseData) => {
        const result = responseData.result;
        if (result.success) {
          this.setState({
            text: result.paused ? 'Play' : 'Pause',
            errorMessage: ''
          });
        } else {
          this.setState({ errorMessage: 'Failando!' });
        }
        console.log(result);
      })
      .catch(error => {
        console.log('Remote - toggleVideo - error:', error)
        this.setState({ errorMessage: error.message });
      })
      .done();
  };

  decreaseVolume() {
    fetch(this.props.serverURL + '/decrease-volume')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          volumeStatus: 'Volume: ' + responseData.volume
        });
      })
      .catch(error => {
        console.log('Remote - decreaseVolume - error:', error);
        this.setState({ errorMessage: error.message });
      })
      .done();
  };

  increaseVolume() {
    fetch(this.props.serverURL + '/increase-volume')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          volumeStatus: 'Volume: ' + responseData.volume
        });
      })
      .catch(error => {
        console.log('Remote - decreaseVolume - error:', error);
        this.setState({ errorMessage: error.message });
      })
      .done();
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        <Text>{this.state.infoText}</Text>
        <TouchableHighlight
          testID='submit'
          style={styles.button}
          onPress={this.toggleVideo.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}>{this.state.text}</Text>
        </TouchableHighlight>
        <View style={styles.volumeRow}>
          <TouchableHighlight
            testID='decreaseVolume'
            style={[styles.button, styles.volumeButton]}
            onPress={this.decreaseVolume.bind(this)}
            underlayColor="white">
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
          <Text style={styles.volumeStatus}>{this.state.volumeStatus}</Text>
          <TouchableHighlight
            testID='increaseVolume'
            style={[styles.button, styles.volumeButton]}
            onPress={this.increaseVolume.bind(this)}
            underlayColor="white">
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };
};

module.exports = Remote;