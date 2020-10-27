import React, { Component, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

class Inputs extends Component {
   state = {
      se: '',
      page: 1,
   }
   handleSearch = (text) => {
      this.setState({ se: text })
   }

   _getSearch = async (se, page) => {
      const token = await AsyncStorage.getItem('@token');
      const name = JSON.parse(await AsyncStorage.getItem('@user')).data.url;
   
      console.log("hello");
      console.log(se);
      if (token)
          fetch(`https://api.imgur.com/3/gallery/search/time/all/${page}?q=${se}`, {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${token}` }
          }).then(response => response.json())
              .then(json => {
                  if (json.success === true)
                     this.setState({se: json.data})
              })
              .done();
   }

   search = (email) => {
      console.log(email)
   }
   render() {
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "What are you looking for?"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleSearch}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this._getSearch(this.state.se, this.state.page)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
            <ScrollView horizontal pagingEnabled={true} scrollEventThrottle={16}>
            <View style={styles.scrollView}>
                <FlatList
                    data={this.state.se}
                    renderItem={({ item }) => {
                       if (item.images && item.images.length) {
                           // console.log(item.images[0]);
                           // console.log("--------------------------------------------------");
                           return <Image style={styles.tinyLogo} source={{ uri: item.images[0].link }} />
                       }
                       return <Image style={styles.noLogo} source={{ uri: item.link }} />}
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
         </ScrollView>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      alignItems: 'center',
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
      alignItems: 'center',
   },
   submitButtonText:{
      color: 'white'
   },
   tinyLogo: {
      width: 300,
      height: 300,
  },
  noLogo: {
   width: 0,
   height: 0,
},
   scrollView: {
      flex: 1,
      marginTop: 20,
      width: Dimensions.get("window").width,
      justifyContent: "center",
      alignItems: "center",
  },
})