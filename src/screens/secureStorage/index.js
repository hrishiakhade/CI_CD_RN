
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { removeData, retrieveData } from '../../utils/secureStore';


const SecureStorage = ({ navigation }) => {
    const [email, setEmail] = React.useState('');

    const handleFetchData = () => {
        retrieveData(email).then((res) => {
            console.log('res', res);
            setTimeout(() => {
                Alert.alert('Success', 'Data fetched successfully');
                setEmail('');
            }, 500);
        }).catch((err) => {
            console.log('err', err);
            setTimeout(() => {
                Alert.alert('Error', err.message);
            }, 500);
        });
    }

    const handleRemoveData = () => {
        removeData(email).then((res) => {
            console.log('res', res);
            setTimeout(() => {
                Alert.alert('Success', 'Data removed successfully');
                setEmail('');
            }, 500);
        }
        ).catch((err) => {
            console.log('err', err);
            setTimeout(() => {
                Alert.alert('Error', err.message);
            }, 500);
        });
    }

    const handleClearAll = () => {

    }

    return (
        <View style={styles.container}>


            <TextInput
                style={styles.textInput}
                placeholder="Enter Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.btnStyle}
                    disabled={email.trim().length < 5 ? true : false}
                    onPress={handleFetchData}
                >
                    <Text style={styles.btnText}>Fetch Data</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnStyle}
                    disabled={email.trim().length < 5 ? true : false}
                    onPress={handleRemoveData}
                >
                    <Text style={styles.btnText}>Remove Data</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.btnStyle}
                onPress={handleClearAll}
            >
                <Text style={styles.btnText}>Clear All</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SecureStorage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    btnStyle: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 20,
        borderRadius: 10
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginTop: 20,
        padding: 10
    },
    btnText: {
        color: 'white'
    }
});