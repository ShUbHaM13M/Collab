import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Colors, Button } from "../components";
import { useAuth } from "../contexts/AuthContext";
import Constants from "expo-constants";
import { NavigationScreenProp } from "react-navigation";

type Params = {};
type ScreenProps = {};
interface Props {
  navigation: NavigationScreenProp<Params, ScreenProps>;
}

const API_URL = Constants.manifest?.extra?.API_URL;

export async function fetchToken(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (response.ok) return data.token;

  console.log(data.message);
  return null;
}

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { jwtToken, setToken, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) navigation.navigate("Dashboard");
  }, [currentUser]);

  async function onPressed() {
    setToken(await fetchToken(email, password));
    setEmail("");
    setPassword("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.font}>Login Screen</Text>

      <Input
        placeholderTextColor={Colors.purple_400}
        placeholder="Email"
        value={email}
        autoCompleteType="email"
        autoComplete={true}
        style={{ fontSize: 18 }}
        onChangeText={(text: any) => setEmail(text)}
      />
      <Input
        placeholderTextColor={Colors.purple_400}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        style={{ fontSize: 18 }}
        onChangeText={(text: any) => setPassword(text)}
      />
      <Button onPress={onPressed} primary>
        <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
      </Button>

      <Button
        onPress={() => navigation.navigate("Register")}
        style={{ marginVertical: 10, backgroundColor: "transparent" }}
      >
        <Text style={{ fontSize: 18 }}>Register</Text>
      </Button>

      {/* <StatusBar backgroundColor="white" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    width: 200,
    borderWidth: 1,
    padding: 10,
  },
  font: {},
});

export default LoginScreen;
