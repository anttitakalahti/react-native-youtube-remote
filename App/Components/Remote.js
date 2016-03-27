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
      errorMessage: ''
    };
  };

  componentDidMount() {
    this.setState({ text: 'Try me!' });
  };

  handleSubmit() {
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
      .done();
  };

  render() {
    return(
      <View style={styles.container}>
        <Text>{this.state.errorMessage}</Text>
        <TouchableHighlight
          testID='submit'
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}>{this.state.text}</Text>
        </TouchableHighlight>
      </View>
    );
  };
};

module.exports = Remote;