import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const CurrentLocationButton = (props) => {
  // const bottom = props.bottom ? props.bottom : 65;
  return (
    <View style={[styles.container, { top: HEIGHT - 280 }]}>
      <MaterialIcons
        name="my-location"
        color="#000000"
        size={25}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    left: WIDTH - 70,
    borderRadius: 50,
    shadowRadius: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
