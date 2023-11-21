
import { ApolloClient, InMemoryCache } from '@apollo/client';


export const api1Client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache(),
});

export const api2Client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache(),
});