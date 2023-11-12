import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

const root = document.getElementById('root');

const render = (Component) => {
  const rootElement = createRoot(root);
  rootElement.render(
    <React.StrictMode>
      <Provider store={store}>
        <Component />
      </Provider>
    </React.StrictMode>
  );
};

// Use the render function to render your app
render(App);
