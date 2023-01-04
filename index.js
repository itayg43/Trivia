import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider as StoreProvider} from 'react-redux';
import 'react-native-get-random-values';

import {store} from './src/redux/store';
import App from './App';

const Root = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
