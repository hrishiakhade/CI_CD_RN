import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginForm } from './src/screens/LoginForm';
import GraphApp from './src/screens/graphQL';
import SecureStorage from './src/screens/secureStorage';
import { PRIMARY_KEY, SECRET_KEY } from "@env"
import FetchImage from './src/screens/fastImage';
import './services/i18next';
import { useTranslation } from 'react-i18next';
import LanguageScreen from './src/screens/languageSelect';
import EncryptedStorage from 'react-native-encrypted-storage';

const Stack = createNativeStackNavigator();

const getItem = async (key) => {
    try {
        const value = await EncryptedStorage.getItem(key);
        return value;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const App = () => {
    const { i18n, t } = useTranslation();

    useEffect(() => {
        getItem('language').then(value => {
            return i18n.changeLanguage(value);
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: t('welcome_title') }}
                />
                <Stack.Screen
                    name="login"
                    component={LoginForm}
                    options={{ title: t('login_btn') }}
                />
                <Stack.Screen
                    name="fetchCountries"
                    component={GraphApp}
                    options={{ title: t('graph_title') }}
                />
                <Stack.Screen
                    name="secureStorage"
                    component={SecureStorage}
                    options={{ title: t('secure') }}
                />
                <Stack.Screen
                    name="fastImage"
                    component={FetchImage}
                    options={{ title: t('fast_btn') }}
                />
                <Stack.Screen
                    name="languageSelection"
                    component={LanguageScreen}
                    options={{ title: t('lang_btn') }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


const HomeScreen = ({ navigation }) => {
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginBottom: 30, fontSize: 16 }}>{t('welcome')}</Text>
            <Button
                title={t('formik_title')}
                onPress={() =>
                    navigation.navigate('login')
                }
            />
            <View style={{ height: 20 }} />
            <Button
                title={t('graph_btn')}
                onPress={() =>
                    navigation.navigate('fetchCountries')
                }
            />
            <View style={{ height: 20 }} />
            <Button
                title={t('secure')}
                onPress={() =>
                    navigation.navigate('secureStorage')
                }
            />
            <View style={{ height: 20 }} />
            <Button
                title={t('env_btn')}
                onPress={() => {
                    console.log('Config', PRIMARY_KEY);
                    console.log('Config', SECRET_KEY);
                }}
            />
            <View style={{ height: 20 }} />
            <Button
                title={t('fast_btn')}
                onPress={() => navigation.navigate('fastImage')}
            />
            <View style={{ height: 20 }} />
            <Button
                title={t('lang_btn')}
                onPress={() => {
                    navigation.navigate('languageSelection')
                }}
            />
        </View>
    );
};



export default App;