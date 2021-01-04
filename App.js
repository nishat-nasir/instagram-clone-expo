import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";

import LandingScreen from "./components/Landing";
import RegisterScreen from "./components/Register";

const firebaseConfig = {
  apiKey: "AIzaSyD7Pa5sf9xdiedHB757v6B3lp37UgktDuU",
  authDomain: "instagram-clone-60a01.firebaseapp.com",
  projectId: "instagram-clone-60a01",
  storageBucket: "instagram-clone-60a01.appspot.com",
  messagingSenderId: "973666151960",
  appId: "1:973666151960:web:8bd8743ed010353ec29d6d",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          option={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
