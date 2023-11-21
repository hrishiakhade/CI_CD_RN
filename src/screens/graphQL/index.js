// src/App.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../../utils/queries'; // Import your GraphQL query
import { api1Client } from '../../utils/apis';
import { Country } from '../realm';
import Realm from 'realm';

const GraphApp = () => {
    const realm = new Realm({ schema: [Country] });

    const { loading, error, data } = useQuery(GET_COUNTRIES, {
        client: api1Client
    });

    if (loading) return <Text style={styles.textStyle}>Loading...</Text>;
    //if (error) return <Text style={styles.textStyle}>Error: {error.message}</Text>;
    if (data?.countries?.length > 0) {
        realm.write(() => {
            realm.create('Country', data.countries, Realm.UpdateMode.Modified);
          });
        //   const allCountries = realm.objects('Country');
        //   allCountries.forEach(country => {
        //     console.log(country.name); // Access other properties in a similar way
        //   });
          realm.close();

    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data.countries}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.titleText}>{item.name}</Text>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.textStyle}>Code: {item.code}</Text>
                            <Text style={styles.textStyle}>Native: {item.native}</Text>
                            <Text style={styles.textStyle}>Emoji: {item.emoji}</Text>
                            <Text style={styles.textStyle}>Currency: {item.currency}</Text>
                            <Text style={styles.textStyle}>Languages: {item?.languages?.map((lang) => lang?.name).join(', ')}</Text>
                            <Text style={styles.textStyle}>Continent: {item.continent.name}</Text>
                            <Text style={styles.textStyle}>Phone: {item.phone}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default GraphApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20,
        color: 'black',
    },
    detailsContainer: {
        flex: 1,
        borderWidth: 1,
    }
});