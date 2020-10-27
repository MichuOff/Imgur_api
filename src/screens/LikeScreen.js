import React, { useState, useEffect } from "react";
import { Text, Image, StyleSheet, View, ScrollView, FlatList, Dimensions } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

async function _getFavorites(setFavorites) {
    const token = await AsyncStorage.getItem('@token');
    const name = JSON.parse(await AsyncStorage.getItem('@user')).data.url;

    if (token)
        fetch(`https://api.imgur.com/3/account/${name}/favorites/`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.json())
            .then(json => {
                if (json.success === true)
                    setFavorites(json.data)
            })
            .done();
}

export default function LikeScreen() {
    const [favorites, setFavorites] = useState([]);

    if (favorites.length === 0)
        _getFavorites(setFavorites);
    return (
        <ScrollView horizontal pagingEnabled={true} scrollEventThrottle={16}>
            <View style={styles.scrollView}>
                <FlatList
                    data={favorites}
                    renderItem={({ item }) => <Image style={styles.tinyLogo} source={{ uri: item.link }} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginTop: 20,
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    tinyLogo: {
        width: 300,
        height: 300,
    },
});
