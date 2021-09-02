import SvgUri from "expo-svg-uri";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Button, Colors } from "../components";
import { useAuth } from "../contexts/AuthContext";

type Params = {};
type ScreenProps = {};

interface Props {
  navigation: NavigationScreenProp<Params, ScreenProps>;
}

const DashboardScreen = ({ navigation }: Props) => {
  const { logout, currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) navigation.navigate("Login");
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>

      {currentUser?.avatar && (
        <View
          style={{
            width: 75,
            height: 75,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.purple,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#8acae7",
            marginBottom: 10,
          }}
        >
          <SvgUri
            width="65"
            height="65"
            source={{ uri: currentUser?.avatar }}
          />
        </View>
      )}

      <Text>{currentUser?.username}</Text>
      <Button onPress={logout}>
        <Text>Sign out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardScreen;
