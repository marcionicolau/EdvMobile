import '~/config/ReactotronConfig';
import * as Sentry from '@sentry/react-native';

import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider } from 'react-redux';

import store from '~/store';
import createNavigator from './routes';
import { setNavigator } from '~/services/navigation';

Sentry.init({
  dsn: 'https://02e31526572a4f478766eb2622d561d3@sentry.io/1492925',
});

// Sentry.config(
//   "https://02e31526572a4f478766eb2622d561d3@sentry.io/1492925"
// ).install();

class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@EdvMobileApp:token');

    this.setState({ userChecked: true, userLogged: !!token });
  }

  render() {
    YellowBox.ignoreWarnings([
      'Warning: Async Storage has been extracted from react-native core',
    ]);
    const { userChecked, userLogged } = this.state;

    if (!userChecked) return null;

    const Routes = createNavigator(userLogged);

    return (
      <Provider store={store}>
        <Routes ref={setNavigator} />
      </Provider>
    );
  }
}

export default App;
