import React, { useState } from "react";
import { StyleSheet, View, ScrollView, FlatList, Dimensions, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { getViralLogic } from "../redux/feed_api";
import { LoadingComponent } from "../component/Loading";
import { ImageBox } from "../component/ImageBox";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
    const [page, setPage] = useState(1);
    const [viralActive, setViral] = useState(true);
    const [feedActive, setFeed] = useState(false);
    const { viral, loading } = useSelector((state) => state);
    const dispatch = useDispatch();

    if (viral.length === 0 && viralActive)
        getViralLogic(dispatch, page, viral);
    const refresh = () => {
        setPage(page++);
        getViralLogic(dispatch, page, viral);
    };

    return (
        <ScrollView horizontal pagingEnabled={true} scrollEventThrottle={16}>
            <View style={styles.scrollView}>
                <LoadingComponent loading={loading} />
                {viralActive && viral.length !== 0 && !loading && (
                    <FlatList
                        data={viral}
                        renderItem={({ item }) => <ImageBox data={item} />}
                        onEndReached={refresh}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2d2d2e",
        width: "100%",
        height: "100%",
    },
    scrollView: {
        flex: 1,
        marginTop: 20,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
    },
});