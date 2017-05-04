import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';
import App from './App';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const appState = new AppState();

render(
  <AppContainer>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <App appState={appState} />
    </MuiThemeProvider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <NextApp appState={appState} />
        </MuiThemeProvider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
