import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reudcers";
import thunk from "redux-thunk";

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import MainScreen from "./components/Main";

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

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

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
