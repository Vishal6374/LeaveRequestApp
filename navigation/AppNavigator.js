import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import LeaveRequestScreen from "../screens/LeaveRequestScreen";
import AdminPanelScreen from "../screens/AdminPanelScreen";
import LeaveHistoryScreen from "../screens/LeaveHistoryScreen";
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="LeaveRequest" component={LeaveRequestScreen} />
      <Stack.Screen name="LeaveHistory" component={LeaveHistoryScreen} />
      <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />

    </Stack.Navigator>
  );
}