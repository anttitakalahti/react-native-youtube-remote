import React, { Navigator } from 'react-native';
import ServerURLText from './ServerURLText';

class Root extends React.Component {
  render() {
    return(
      <Navigator
        initialRoute={{ name: 'Root is Root', component: ServerURLText }}
        configureScene={() => {
        return Navigator.SceneConfigs.FloatFromRight;
      }}
        renderScene={(route, navigator) => {
        if (route.component) {
          return React.createElement(route.component, { navigator, serverURL: route.serverURL });
        }
      }}
      />
    );
  }
};

module.exports = Root;