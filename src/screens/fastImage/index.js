// src/App.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ANIMES_COVERS } from '../../utils/queries'; // Import your GraphQL query
import { api2Client } from '../../utils/apis';
import { ApolloProvider } from '@apollo/client';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';

const renderImages = ({ item }) => {

    return (
        <FastImage
            style={{ width:'100%' , height : 150 , backgroundColor:'red' , borderRadius: 10 , marginVertical:10 }}
            source={{
                uri: item?.bannerImage,
                priority: FastImage.priority.normal,
            }}
            // resizeMode={FastImage.resizeMode.contain}
        />
    )
};

const FetchImage = () => {

    const { loading, error, data } = useQuery(GET_ANIMES_COVERS, {
        client: api2Client
    });

    const { t } = useTranslation();

    if (loading) return <Text style={styles.textStyle}>Loading...</Text>;

    if (error) return <Text style={styles.textStyle}>Error: {error.message}</Text>;

    const media = data?.Page?.media;
    return (
        <ApolloProvider client={api2Client}>
            <View style={styles.container}>
                <FlatList
                    data={media}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderImages}
                />
            </View>
        </ApolloProvider>
    );
};

export default FetchImage;

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