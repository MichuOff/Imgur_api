import React, { useEffect } from "react";
import { StyleSheet, Image, AsyncStorage } from "react-native";
import { isUndefined } from "lodash";
import { Content, Card, CardItem, Text, Left, Center, Body, View, Right, Button } from "native-base";
import { AntDesign } from '@expo/vector-icons';

async function _favoritize(id) {
    const token = await AsyncStorage.getItem('@token');
    
    await fetch(`https://api.imgur.com/3/image/${id}/favorite`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

const Item = ({ item }) => {
    if (isUndefined(item) || !item.images[0].link.match(/\.(jpg|png|gif)/g))
        return null;
    const LikeImage = async () => {
        const url = item.link
        const id = item.images[0].id;
        // const result = Object.keys(item).map(key => ({ [key]: item[key] }));

        const getCurrent = await AsyncStorage.getItem('@like');
        if (!getCurrent || getCurrent.split(' ').find(element => element === id) === undefined)
            await AsyncStorage.setItem('@like', (!getCurrent) ? id : getCurrent.concat(' ', id));
        if (AsyncStorage.getItem('@user'))
            await _favoritize(id);
    };

    return (
        <Content style={{ marginHorizontal: '2%', marginVertical: '2%' }}>
            <Card style={{ backgroundColor: '#AB92BF', width: '100%' }}>
                <CardItem cardBody style={{ backgroundColor: '#AB92BF' }}>
                    <Image
                        source={{ uri: item.images[0].link }}
                        style={{ height: (item.images[0].height > 500) ? 300 : item.images[0].height, flex: 1 }}
                    />
                </CardItem>
                <CardItem style={{ backgroundColor: '#AB92BF', width: '100%' }}>
                    <Right>
                        <Body>
                            <Text style={{ color: '#8662A3', alignItems: 'center' }}>{item.title}</Text>
                        </Body>
                    </Right>
                    <Right>
                        <Button transparent onPress={LikeImage}>
                            <AntDesign name="heart" size={22} color="#8662A3" />
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        </Content>
    );
};

export const ImageBox = (item) => {
    return (isUndefined(item.data.images) ? null :
        <View style={styles.container}>
            <Item item={item.data} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    }
});
