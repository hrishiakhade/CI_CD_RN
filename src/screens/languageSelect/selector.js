import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../../services/languagesList';
import EncryptedStorage from 'react-native-encrypted-storage';


const Selector = ({ popBack }) => {
    const { i18n } = useTranslation();
    const selectedLanguageCode = i18n.language;
    const { t } = useTranslation();
    const setLanguage = code => {

        EncryptedStorage.setItem('language', code);

        popBack();
        return i18n.changeLanguage(code);
    };

    return (
        <View style={styles.container}><View style={styles.row}><Text style={styles.title}>{t('change-language')}</Text></View>
            {LANGUAGES.map(language => {
                const selectedLanguage = language.code === selectedLanguageCode;

                return (
                    <Pressable
                        key={language.code}
                        style={styles.buttonContainer}
                        disabled={selectedLanguage}
                        onPress={() => setLanguage(language.code)}
                    ><Text
                        style={[selectedLanguage ? styles.selectedText : styles.text]}
                    >
                            {language.label}
                        </Text></Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: '#444',
        fontSize: 28,
        fontWeight: '600'
    },
    buttonContainer: {
        marginTop: 10
    },
    text: {
        fontSize: 18,
        color: '#000',
        paddingVertical: 4
    },
    selectedText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'tomato',
        paddingVertical: 4
    }
});

export default Selector;