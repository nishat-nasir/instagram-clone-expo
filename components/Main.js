import React, { Component } from "react";
import { TabBarIOS, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";

import FeedScreen from "./main/Feed";

const Tab = createBottomTabNavigator();

export class Main extends Component {
  componentDidMount() {
    console.log("start fetching");
    this.props.fetchUser();
    console.log("finish fetching");
  }
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabVarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
