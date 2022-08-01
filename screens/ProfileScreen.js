import React from "react";
import { View, Text, ImageBackground,StatusBar, Image, TouchableOpacity, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';


const ProfileScreen = () => {
    return (
        <>
            <ImageBackground style={{height:'100%'}}source={{ uri: 'https://i0.wp.com/wallpapercave.com/wp/wp6239292.jpg' }}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
            <View>

                <Text style>hi</Text>
                <TouchableOpacity onPress={() => auth().signOut()} style={{ backgroundColor: "#b27846", height: 50, width: "92%", left: 14, marginTop: 600, borderRadius: 20, alignItems: "center", justifyContent: "center", position: "absolute" }}>
                    <Text style={{ fontSize: 20, fontFamily: "Oswald-Medium", letterSpacing: 2 }}>Sign Out</Text>
                </TouchableOpacity>


            </View>
            </ImageBackground>
        </>
    );
}

export default ProfileScreen

const styles = StyleSheet.create({
    bImage: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: 'center',
        backgroundColor: 'transparent',
    }
})