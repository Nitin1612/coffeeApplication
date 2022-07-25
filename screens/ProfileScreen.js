import React from "react";
import { View, Text, Button } from "react-native";
import auth from '@react-native-firebase/auth';


const ProfileScreen = () => {
    return (
        <View><Text>ProfileScreen</Text>
            <View style={{ marginTop: 30 }}>
                <Button title="Signout" onPress={() => auth().signOut()} />
            </View>
        </View>
    );
}

export default ProfileScreen