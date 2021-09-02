import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Button, Colors, Input } from "../components";
import Constants from "expo-constants";
import SvgUri from "expo-svg-uri";

type Params = {};
type ScreenProps = {};

interface Props {
  navigation: NavigationScreenProp<Params, ScreenProps>;
}

const API_URL = Constants.manifest?.extra?.API_URL;

async function registerUser(
  email: string,
  password: string,
  username: string,
  avatar: string
) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password, avatar, username }),
  });
  const data = await response.json();

  if (response.ok) console.log(data.message);

  console.log(data.message);
  return null;
}

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(generateRandomAvatar());

  function generateRandomAvatar() {
    return `https://avatars.dicebear.com/api/human/${Math.random()
      .toString()
      .substr(2, 8)}.svg?background=%238acae7`;
  }

  function onPressed() {
    registerUser(email, password, username, avatar);
  }

  return (
    <View style={styles.container}>
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
        <SvgUri width="65" height="65" source={{ uri: avatar }} />
      </View>

      <Button onPress={() => setAvatar(generateRandomAvatar())}>
        <Text>Change avatar</Text>
      </Button>

      <Input
        placeholderTextColor={Colors.purple_400}
        placeholder="username"
        value={username}
        style={{ fontSize: 18 }}
        onChangeText={(text: any) => setUsername(text)}
      />
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
        <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text>go back to login</Text>
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

export default RegisterScreen;
