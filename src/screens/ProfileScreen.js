import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SpinnerButton from 'react-native-spinner-button';

import LoginView from './LoginView';

function _logout(setInfos, setLoading) {
    setLoading(true);
    AsyncStorage.clear()
        .then(_ => {
            console.log('logged out');
            setInfos(null);
            setLoading(false);
        })
        .done();
}

export default function ProfileScreen() {
    const [infos, setInfos] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('@user')
            .then(value => {
                if (value)
                    setInfos(JSON.parse(value));
            })
            .done();
    }, []);

    return ((!infos) ? <LoginView a={setInfos} /> :
        <View style={styles.container}>
            <Text>{infos.data.url}</Text>
            <Image style={styles.tinyLogo} source={{ uri: infos.data.avatar }} />
            <Text>bio: {infos.data.bio}</Text>
            <SpinnerButton buttonStyle={styles.button} spinnerType='SkypeIndicator' isLoading={loading} onPress={() => _logout(setInfos, setLoading)} indicatorCount={10}>
                <Text style={styles.text}>logout</Text>
            </SpinnerButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    button: {
        borderRadius: 200,
        margin: 5,
        backgroundColor: '#AB92BF'
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        paddingHorizontal: 15,
    }
})

// function _delete(id, setInfos) {
//     AsyncStorage.getItem('@token')
//         .then(token => {
//             const data = '       \
//                 {"password": "", \
//                     "reasons": [ \
//                     "Reason #1", \
//                     "Reason #2"  \
//                 ],               \
//                 "feedback": "MOAR CATGIFS"}';
//             fetch(`https://api.imgur.com/3/account/me/delete?client_id=${id}`, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: data
//             }).then(response => response.json())
//                 .then(json => {
//                     console.log(json);
//                     _logout(setInfos);
//                 })
//                 .done();
//         }).done();
// }
