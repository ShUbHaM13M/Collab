import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import AuthProvider from "./contexts/AuthContext";
import { AuthNavigator } from "./navigation";
import Constants from "expo-constants";

export default function App() {
  const API_URL: String = Constants.manifest?.extra?.API_URL;
  const [loading, setLoading] = useState(false);
  const URL = API_URL.slice(0, API_URL.lastIndexOf("/"));

  useEffect(() => {
    setLoading(true);
    fetch(`${URL}/wake-up`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "running") setLoading(false);
      });
  }, []);

  return (
    <AuthProvider>
      {/* get user here and check if exists */}
      {loading ? (
        <ActivityIndicator color="cyan" size="large" />
      ) : (
        <AppContainer />
      )}
    </AuthProvider>
  );
}

const AppContainer = createAppContainer(AuthNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
