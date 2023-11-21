import React from 'react';
import { View } from 'react-native';

import Selector from './selector';

export default function LanguageScreen({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}><Selector popBack={navigation.pop}/></View>
    );
}