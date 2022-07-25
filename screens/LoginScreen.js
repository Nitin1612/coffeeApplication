import React from 'react';
import { StyleSheet, Text, View ,Image,StatusBar, TouchableOpacity ,Linking} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

export default function LoginScreen(props) {
  return (
    
    <View style={styles.screen}>
     <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#987456" translucent = {true} />
        <Image 
        style={styles.image}
        source={{uri:'https://i.pinimg.com/564x/2b/0c/1b/2b0c1b3477d70ef98cbb3fc4ef6fd617.jpg'}}
        />
      <Text style={styles.title}> Login To Order </Text>
       
      <GoogleSigninButton size={1}style={styles.loginButton}onPress={props.onGoogleButtonPress} />
      <TouchableOpacity style={{top:265}}  onPress={()=>Linking.openURL('https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount%3Fnc%3D1&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp')}>
        <Text style={{fontSize:15,color:"black"}}>Doesn't have a Google Account ?</Text>
    </TouchableOpacity>
    
    
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#985048",
  },
  title: {
    fontSize: 30,
    top:240,
    fontFamily:"Oswald-Bold",
    color:"black"
  },
  loginButton:{
    height:55,
    borderColor:"black",
    top:250,
  },
  image:{
    ...StyleSheet.absoluteFillObject,
        alignSelf: 'center',
        backgroundColor: 'transparent',
  }
});