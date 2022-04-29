import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Linking,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, ScrollView } from "native-base";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useAppContextProvider } from "../context/appContext";
import { useNavigation } from "@react-navigation/native";
import Clipboard from "@react-native-clipboard/clipboard";
const Settings = () => {
  const context = useAppContextProvider();
  const navigation = useNavigation();
  // const ipAddress = await context?.get("ipAddress");
  const [ip, setIp] = useState<any>();
  useEffect(() => {
    const call = async () => {
      let ipp = await context?.get("ipAddress");
      setIp(ipp);
    };
    call();
  }, []);
  return (
    <ScrollView style={{ marginVertical: 30 }}>
      <Box style={{ marginTop: 50, alignItems: "center" }}>
        <Text style={{ marginBottom: 20 }}>Clear IP</Text>
        <Button
          onPress={() => {
            context?.clear();
            navigation.navigate("EnterIP");
          }}
          style={{ marginHorizontal: 50, width: 200 }}
        >
          Clear
        </Button>
      </Box>
      <Box style={{ marginTop: 50, display: "flex", alignItems: "center" }}>
        <Box
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text>Version</Text>
          <Text>1.1.1</Text>
        </Box>
        <Box
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text>React Native Version</Text>
          <Text>0.6.5</Text>
        </Box>
        <Box
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text>Expo</Text>
          <Text>14.5</Text>
        </Box>
        <Box alignItems={"center"} textAlign={"center"} marginTop={25}>
          <Text>Login to Server?!</Text>
          <Text>To Login to server use the below command!</Text>
          <Text
            onPress={() => {
              Clipboard.setString(`ssh root@${ip}`);
              if (Platform.OS === "android") {
                ToastAndroid.showWithGravity(
                  "Command Copied to Clipboard",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                );
              }
            }}
            style={{ fontWeight: "bold", marginTop: 50 }}
          >{`ssh root@${ip}`}</Text>
        </Box>
        <Box style={{ marginTop: 50 }}>
          <Text>Need API Docs?!</Text>
          <Button
            onPress={() => {
              Linking.openURL(`http://${ip}/docs`);
            }}
          >
            API Docs
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
