import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { persistor, store } from './component/Eventdetail/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { UserProvider } from './component/context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={'loading'} persistor={persistor}>
				<UserProvider>
					<App />
				</UserProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);
