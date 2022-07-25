 import React,{useEffect,useState} from 'react';
 import auth from '@react-native-firebase/auth';
 import {GoogleSignin} from '@react-native-google-signin/google-signin';
 import HomeScreen from './HomeScreen';
 import LoginScreen from './LoginScreen';
 import MainNavigator from '../navigation/MainNavigator';
 const GoogleOauth = () => {
 
   useEffect(()=>{
     GoogleSignin.configure({
       webClientId:
         '882078845145-99e8ka6jgdgasjddcpr8uc03b6nme1jv.apps.googleusercontent.com',
     });
   },[])
 
   const [authenticated, setAuthenticated] = useState(false);
 
   async function onGoogleButtonPress() {
     const { idToken } = await GoogleSignin.signIn();
 
     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
 
     return auth().signInWithCredential(googleCredential);
   }
 
   auth().onAuthStateChanged((user) => {
     if (user) {
       setAuthenticated(true);
     } else {
       setAuthenticated(false);
     }
   });
 
   if (authenticated) {
     return <MainNavigator />;
   }
 
   return <LoginScreen onGoogleButtonPress={onGoogleButtonPress} />;
 }
 export default GoogleOauth;
 