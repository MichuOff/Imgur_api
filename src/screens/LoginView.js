import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

function _getUrlItem(url, item) {
    const beg = url.indexOf(`${item}=`) + `${item}=`.length;
    const end = url.indexOf('&', beg);

    return url.substring(beg, end);
}

async function _getUserInfos(url) {
    return await fetch(`https://api.imgur.com/3/account/${_getUrlItem(url, 'account_username')}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Client-ID afc1eafd0214c9d',
            'Content-Type': 'application/json',
        }
    });
}

async function _getUserInfosAsJSON(url) {
    const infos = await _getUserInfos(url);

    return await infos.json();
}

async function _storeUser(url) {
    try {
        await AsyncStorage.setItem('@user', JSON.stringify(await _getUserInfosAsJSON(url)));
        await AsyncStorage.setItem('@token', _getUrlItem(url, 'access_token'));
    } catch (err) {
        console.log(err);
    }
}

async function _handleRedirect(url) {
    if (!url.includes('oauth2/authorize') && url.includes('access_token') && count++ === 0)
        await _storeUser(url);
}

export default function LoginView(props) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle='default' />
            <View style={styles.container}>
                <WebView
                    source={{ uri: 'https://api.imgur.com/oauth2/authorize?client_id=afc1eafd0214c9d&response_type=token&state=""' }}
                    onNavigationStateChange={async (webViewState) => {
                        await _handleRedirect(webViewState.url);
                        props.a(JSON.parse(await AsyncStorage.getItem('@user')));
                    }}
                    javaScriptEnabledAndroid={true}
                    javaScriptEnabled={true}
                    style={{}}
                />
            </View>
        </View>
    );
}

let count = 0;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
