import React, {Component} from "react";
import { StyleSheet, Text, Image, Button, Link } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { View } from "native-base";

import { store } from "./redux/store";
import HomeScreen from "./screens/HomeScreen";
import LikeScreen from "./screens/LikeScreen";
import UploadScreen from "./screens/UploadScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const TAB = createMaterialTopTabNavigator();

// const CLIENT_ID = 'b57a9127cbfaa11';
// const CLIENT_SECRET = '765f3b5bb0d8e47706347a5d375388833d82039c';

function _logo(name, color, size) {
    switch (name) {
        case "Home": return <Ionicons name={"ios-home"} size={size} color={color} />;
        case "Like": return <Ionicons name={"ios-heart"} size={size} color={color} />;
        case "Upload": return <Ionicons name={"md-cloud-upload"} size={size} color={color} />;
        case "Profile": return <MaterialCommunityIcons  name="face-profile" size={size} color={color}/>
        case "Search": return <Ionicons name={"ios-search"} size={size} color={color} />;
    }
}

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.upper}>
            <Text style={styles.text}>Epicture</Text>
            </View>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({ tabBarIcon: ({ color, size }) => _logo(route.name, color, size) })}
                    tabBarOptions={tabBarOpt}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Like" component={LikeScreen} />
                    <Tab.Screen name="Search" component={SearchScreen} />
                    <Tab.Screen name="Upload" component={UploadScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CCCCCC",
        alignItems: "center",
        justifyContent: "center"
    },
    upper: {
        width: '100%',
        height: '12%',
        backgroundColor: "#AB92BF",
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        width: 250,
        height: 100,
        top: '10%'
    },
    text: {
        color: "#ffffff",
        fontSize: 30,
        position:"absolute",
        bottom: "20%"
    }
});

const tabBarOpt = {
    activeTintColor: "#ffffff",
    inactiveTintColor: "#8662A3",
    style: {
        backgroundColor: "#AB92BF",
        borderTopColor: "transparent",
    },
    swipeEnabled: true,
    showLabel: false,
    animationEnabled: true,
};
