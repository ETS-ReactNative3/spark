import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ToastAndroid,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Loading from "react-native-whc-loading";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { observer, inject } from "mobx-react";
import jwt from "jwt-decode";
import axios from "axios";

// import { Button } from "react-native-paper";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

@inject("store")
@observer
export default class LoginPage extends Component {
  state = { user_emailPhoneNumber: "", user_password: "", loading: false };

  componentWillUnmount() {
    source.cancel();
  }

  // password validation

  validatePassword = (password) => {
    if (8 > password.length) {
      Keyboard.dismiss();
      ToastAndroid.show(
        "passwords must be 8 characters or more.",
        ToastAndroid.SHORT
      );
    } else {
      return password;
    }
  };

  // email verification Function
  validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == null || email == "") {
      Keyboard.dismiss();
      ToastAndroid.show("email can't be blank", ToastAndroid.SHORT);
    }
    if (re.test(email) === false) {
      Keyboard.dismiss();
      ToastAndroid.show("Invalid email, try again", ToastAndroid.SHORT);
    } else {
      return email;
    }
  };

  // Number verification function
  // numberValidation = (number) => {
  //   const num = new RegExp("^-?[0-9]*$");
  //   if (num.test(number) === false) {
  //     Keyboard.dismiss();
  //     ToastAndroid.show("Invalid Phone number!, try again", ToastAndroid.SHORT);
  //   } else {
  //     return number;
  //   }
  // };

  loginEndPoint = async () => {
    const {
      userLoginDetails,
      setLoginEmail,
      setLoginPassword,
    } = this.props.store;

    if (this.state.user_emailPhoneNumber === "") {
      Keyboard.dismiss();
      ToastAndroid.show("Enter your email", ToastAndroid.SHORT);
    } else if (this.state.user_password === "") {
      Keyboard.dismiss();
      ToastAndroid.show("Password can't be blank", ToastAndroid.SHORT);
    } else {
      let email_regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // let num = new RegExp("^-?[0-9]*$");
      if (email_regx.test(this.state.user_emailPhoneNumber) === true) {
        const email = this.state.user_emailPhoneNumber;
        setLoginEmail(email);
      } else {
        Keyboard.dismiss();
        ToastAndroid.show("Email is invalid!", ToastAndroid.SHORT);
      }
      const passw = this.validatePassword(this.state.user_password);

      setLoginPassword(passw);

      if (
        typeof userLoginDetails.loginEmail != "undefined" &&
        typeof userLoginDetails.loginPassword != "undefined"
      ) {
        // console.log(DATA);
        this.refs.loading.show();
        NetInfo.fetch().then(async (state) => {
          // console.log("Connection type", state.type);
          // console.log("Is connected?", state.isConnected);
          if (state.isConnected !== true) {
            Alert.alert("No internet connection");
          } else {
            const DATA = {
              email: userLoginDetails.loginEmail,
              password: userLoginDetails.loginPassword,
            };
            try {
              const resp = await axios.post(
                "https://sparklogistics.herokuapp.com/users/login",
                DATA,
                {
                  cancelToken: source.token,
                }
              );
              // this.poupRespo();

              if (resp.status === 200) {
                this.refs.loading.close();
                this.props.navigation.navigate("UserDashboard");
              }
              console.log(resp.status);
            } catch (e) {
              console.log(e);
            }
          }
        });

        // const netL = await NetInfo.state.isConnected.fetch();
        // console.log(netL);
      } else {
        console.log("undefined field available");
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* <this.headerFunc /> */}
        <StatusBar />

        <View style={{ backgroundColor: "#f1f1f1" }}>
          {/* <GirlDrive_Login /> */}

          <ImageBackground
            source={require("../img/manRun22.png")}
            style={{
              height: HEIGHT,
              // opacity: 0.9,
            }}
          >
            <SafeAreaView style={Styles.safeView}>
              <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Image
                  source={require("../img/logo.png")}
                  style={{
                    height: HEIGHT - 680,
                    width: WIDTH - 230,
                    // borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              </View>
              <Text style={Styles.loginTxt}>Login</Text>
              <Text
                style={{
                  color: "#ccc",
                  fontWeight: "600",
                  fontSize: 15,
                  marginLeft: 20,
                  marginBottom: 25,
                  alignSelf: "flex-start",
                }}
              >
                Please enter your credentials
              </Text>

              {/* first Name end */}
              <View style={[Styles.inputView, { marginBottom: 25 }]}>
                <Fontisto
                  name="person"
                  size={20}
                  color="#b90000"
                  style={Styles.icon}
                />
                <TextInput
                  style={Styles.input}
                  keyboardType="default"
                  onChangeText={(user_emailPhoneNumber) =>
                    this.setState({ user_emailPhoneNumber })
                  }
                  placeholder="Email Ex: Doe@gmail.com"
                  autoFocus={false}
                />
              </View>

              <View style={[Styles.inputView]}>
                <Fontisto
                  name="key"
                  size={20}
                  color="#b90000"
                  style={Styles.icon}
                />
                <TextInput
                  style={Styles.input}
                  keyboardType="default"
                  passwordRules={true}
                  secureTextEntry={true}
                  onChangeText={(user_password) =>
                    this.setState({ user_password })
                  }
                  placeholder="Password"
                  autoFocus={false}
                />
              </View>
              <View style={Styles.TxtView}>
                <Text style={{ color: "#b90000", marginRight: 55 }}>
                  Forgot password
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Connect")}
                >
                  <Text
                    style={{ color: "#b90000", marginLeft: 55, marginRight: 0 }}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                touchSoundDisabled={false}
                disabled={this.state.disableBtn}
                style={Styles.btn}
                onPress={this.loginEndPoint}
              >
                <Text style={Styles.btnTxt}>Login</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ImageBackground>
        </View>
        <Loading ref="loading" />
      </React.Fragment>
    );
  }
}

const Styles = StyleSheet.create({
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    height: HEIGHT - 760,
    backgroundColor: "#ffffff",
    elevation: 7,
    shadowColor: "#f4d7d7",
    borderRadius: 10,
  },
  input: {
    fontSize: 16,
    borderRadius: 28,
    width: "90%",
    height: HEIGHT - 760,
    padding: 10,
  },
  icon: { marginRight: 15, marginLeft: 10 },

  safeView: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: HEIGHT - 600,
    width: WIDTH - 50,
    height: HEIGHT - 260,
    marginLeft: 25,
    elevation: 7,
    borderWidth: 1,
    borderColor: "#f1f1f1",
  },
  btn: {
    backgroundColor: "#e92d2d",
    width: wp("75%"),
    height: hp("7%"),
    justifyContent: "center",
    borderRadius: 65,
    borderColor: "#f1f1f1",
    borderWidth: 2,
    elevation: 7,
    padding: 5,
    marginTop: 30,
  },
  btnTxt: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    color: "#ffffff",
    fontSize: 18,
  },
  TxtView: {
    flexDirection: "row",
    marginTop: 40,
  },
  loginTxt: {
    color: "#e92d2d",
    fontSize: 30,
    alignSelf: "flex-start",
    marginLeft: 20,
    fontWeight: "bold",
  },
});
