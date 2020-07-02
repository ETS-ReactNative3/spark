import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Splash from "./src/screens/Splash";
import PhoneNumberPage_signup from "./src/screens/PhoneNumberPage_signup";
import DeliveryMadeEasy_Screen from "./src/screens/DeliveryMadeEasy_Screen";
import Connect from "./src/screens/Connect";
import LoginPage from "./src/screens/LoginPage";
import UserDashboard from "./src/screens/UserDashboard";
import DeliveryLocation from "./src/screens/DeliveryLocation";
import MakeDeliveryRequest from "./src/screens/MakeDeliveryRequest";
import PickAcab from "./src/screens/PickAcab";

export default class App extends Component {
  state = { loading: true, appIsReady: false };
  async componentDidMount() {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  /**
   * Method that serves to load resources and make API calls
   */
  prepareResources = async () => {
    await performAPICalls();
    await downloadAssets();

    this.setState({ appIsReady: true }, async () => {
      await SplashScreen.hideAsync();
    });
  };

  UNSAFE_componentWillMount = async () => {
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        thin_italic: require("./assets/fonts/brandon-grotesque-thin-italic-58a8a3a8861fe.ttf"),
        medium_italic: require("./assets/fonts/brandon-grotesque-medium-italic-58a8a3c40866a.ttf"),
        light_italic: require("./assets/fonts/brandon-grotesque-light-italic-58a8a4ccb88be.ttf"),
        light: require("./assets/fonts/brandon-grotesque-light-58a8a4b38001d.ttf"),
        bold_italic: require("./assets/fonts/brandon-grotesque-bold-italic-58a8a48221563.ttf"),
        black: require("./assets/fonts/brandon-grotesque-black-58a8a3e824392.ttf"),
        grotesque_regular: require("./assets/fonts/brandon-grotesque-regular-italic-58a8a456c4724.ttf"),
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log("Error occured = " + error);
    }
  };

  render() {
    const Stack = createStackNavigator();

    if (this.state.loading || !this.state.appIsReady) {
      return <Splash />;
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            {/* start */}
            <Stack.Screen
              name="Pick a cab"
              component={PickAcab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Make Request"
              component={MakeDeliveryRequest}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Delivery Location"
              component={DeliveryLocation}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="UserDashboard"
              component={UserDashboard}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login Page"
              component={LoginPage}
              options={{
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                title: "Login With",
                // headerShown: false,
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="Connect"
              component={Connect}
              options={{
                headerStyle: {
                  // elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                title: "Connect With",
                headerShown: false,

                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="deliveryMadeEasy"
              component={DeliveryMadeEasy_Screen}
              options={{
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                title: "SPARK",
                headerShown: false,
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="PhoneNumberPage_signup"
              component={PhoneNumberPage_signup}
              options={{
                title: "Phone number verification",
                headerTitleAlign: "center",
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

// Put any code you need to prepare your app in these functions
async function performAPICalls() {}
async function downloadAssets() {}
