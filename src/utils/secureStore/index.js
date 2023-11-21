import EncryptedStorage from 'react-native-encrypted-storage';


export function storeData(name, email, password) {
    return new Promise((resolve, reject) => {

        try {
            EncryptedStorage.setItem(
                email,
                JSON.stringify({
                    name,
                    email,
                    password
                })
            ).then(() => {
                resolve(true);
            });

            // Congrats! You've just stored your first value!
        } catch (error) {
            // There was an error on the native side
            console.log(error.code);
            reject(error);
        }
    });

}



export function retrieveData(email) {
    return new Promise((resolve, reject) => {
        try {
            EncryptedStorage.getItem(email).then((session) => {
                if (session !== undefined) {
                    // Congrats! You've just retrieved your first value!
                    console.log('session', session);
                    resolve(JSON.parse(session));
                } else {
                    reject(undefined);
                }
            });
        } catch (error) {
            // There was an error on the native side
            console.log(error.code);
            reject(error);
        }
    });
}


export function removeData(email) {
    return new Promise((resolve, reject) => {
        try {
            EncryptedStorage.removeItem(email).then(() => {
                // Congrats! You've just removed your first value!
                resolve(true);
            });
        } catch (error) {
            // There was an error on the native side
            console.log(error.code);
            reject(error);
        }
    });
}


export function clearStorage() {
    return new Promise((resolve, reject) => {
        try {
            EncryptedStorage.clear().then(() => {
                // Congrats! You've just cleared the device storage!
                resolve(true);
            });
        } catch (error) {
            // There was an error on the native side
            console.log(error.code);
            reject(error);
        }
    });
}