import React from "react";
import { View, ActivityIndicator } from "react-native";


export const LoadingComponent = ({ loading }) => {
    return loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#ab92bf" />
        </View>
    ) : null;
};
