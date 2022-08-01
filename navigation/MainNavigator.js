import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
const MainNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                headerShown: false, tabBarInactiveTintColor: "black", tabBarActiveTintColor: "#fff", tabBarActiveBackgroundColor: "#2d0c03",
                tabBarIconStyle:{display:"none"},tabBarLabelStyle:{fontSize:17,fontFamily:"Oswald-Regular",top:-12,letterSpacing:5}
            }}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator