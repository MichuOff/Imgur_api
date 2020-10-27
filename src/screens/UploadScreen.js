import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SpinnerButton from 'react-native-spinner-button';

async function _askPerm(mode) {
    const check = (mode === 'camera') ? await ImagePicker.getCameraPermissionsAsync() : await ImagePicker.getCameraRollPermissionsAsync();

    if (check.status !== 'granted') {
        const { status } = (mode === 'camera') ? await ImagePicker.requestCameraPermissionsAsync() : await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted')
            alert('Permission needed');
    }
}

async function _askPerms() {
    await _askPerm('camera');
    await _askPerm('gallery');
}

async function _pickImg(mode) {
    const opts = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: undefined,
        base64: true,
    };
    return (mode === 'camera') ? await ImagePicker.launchCameraAsync(opts) : await ImagePicker.launchImageLibraryAsync(opts);
}

function _createData(result) {
    const data = new FormData();

    data.append("image", result.base64);
    data.append("title", "MySuperImage");
    data.append("description", "image upload from our Epicture server");
    return data;
}

async function _sendReq(token, data) {
    const auth = (!token) ? 'Client-ID afc1eafd0214c9d' : `Bearer ${token}`;
    const value = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            'Authorization': auth,
            'Content-Type': 'multipart/form-data'
        },
        body: data
    });
    console.log(await value.json());
}

async function _upload(mode) {
    try {
        const token = await AsyncStorage.getItem('@token');
        let result = await _pickImg(mode);

        if (!result.cancelled)
            await _sendReq(token, _createData(result));
    } catch (err) {
        console.log(err);
    }
}

async function _getPosts(setPosts) {
    const token = await AsyncStorage.getItem('@token');

    if (!token)
        return;
    const value = await fetch('https://api.imgur.com/3/account/me/images', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    if (value.ok)
        setPosts((await value.json()).data);
}

export default function UploadScreen() {
    const [loadingCam, setLoadingCam] = useState(false);
    const [loadingGal, setLoadingGal] = useState(false);
    const [id, setId] = useState('');
    const [posts, setPosts] = useState([]);

    const _pickFromGallery = async () => { setLoadingGal(true); await _upload('gallery'); setLoadingGal(false); await _getPosts(setPosts); }
    const _pickFromCamera = async () => { setLoadingCam(true); await _upload('camera'); setLoadingCam(false); await _getPosts(setPosts); }

    useEffect(() => {
        _askPerms();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.scroll}>
                <ScrollView vertical scrollEventThrottle={16}>
                    <View style={styles.images}>
                        {posts.map(item => {
                            return (
                                <Pressable onPress={() => { setId((item.id == id) ? '' : item.id); }}>
                                    {item.id !== id && <Image style={[styles.tinyLogo, { width: 70, height: 70 }]} source={{ uri: item.link }} />}
                                    {item.id === id && <Image style={[styles.tinyLogo, { width: Dimensions.get('screen').width, height: Dimensions.get('screen').width }]} source={{ uri: item.link }} />}
                                </Pressable>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottom}>
                <SpinnerButton buttonStyle={styles.button} spinnerType='SkypeIndicator' isLoading={loadingGal} onPress={_pickFromGallery} indicatorCount={10}>
                    <Text style={styles.text}>upload from gallery</Text>
                </SpinnerButton>
                <SpinnerButton buttonStyle={styles.button} spinnerType='SkypeIndicator' isLoading={loadingCam} onPress={_pickFromCamera} indicatorCount={10}>
                    <Text style={styles.text}>upload from camera</Text>
                </SpinnerButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 8,
    },
    tinyLogo: {
        margin: 10
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        paddingHorizontal: 15,
    },
    button: {
        borderRadius: 200,
        margin: 5,
        backgroundColor: '#AB92BF'
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    images: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        direction: 'inherit'
    }
});
