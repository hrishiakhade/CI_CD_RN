/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { name as appName } from './app.json';
import { api1Client, api2Client } from './src/utils/apis';
// initialize a GraphQL client


const ApolloApp = () => (
    <ApolloProvider client={api1Client}>
        <ApolloProvider client={api2Client}>
            <App />
        </ApolloProvider>
    </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => ApolloApp);