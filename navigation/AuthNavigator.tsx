import React from "react";
import { Transition } from "react-native-reanimated";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import DashboardScreen from "../screens/DashboardScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const AuthNavigator = createAnimatedSwitchNavigator(
  {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    Dashboard: { screen: DashboardScreen },
  },
  {
    initialRouteName: "Login",
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-left"
          durationMs={250}
          interpolation="easeOut"
        />
        <Transition.In
          type="slide-right"
          durationMs={250}
          interpolation="easeOut"
        />
      </Transition.Together>
    ),
  }
);

export default AuthNavigator;
