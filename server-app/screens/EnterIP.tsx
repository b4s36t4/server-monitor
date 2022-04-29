// import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, Input, Text, useBreakpointValue } from "native-base";
import CustomInput from "../components/CustomInput";
import { useAppContextProvider } from "../context/appContext";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { NavigationRef } from "../constants/Links";

function isIPv4Address(inputString: string) {
  return /^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/.test(
    inputString
  );
}

const EnterIP = () => {
  const inputPosition = useBreakpointValue({ base: "90%", md: "70%" });
  const [IpAddress, setIpAddress] = useState("");
  const context = useAppContextProvider();
  const navigation = useNavigation();
  const onChangeText = (e: string) => {
    setIpAddress(e);
  };
  useEffect(() => {
    if (window) {
      window.ref = NavigationRef;
    }
    console.log(navigation, NavigationRef);
  });
  const addIPAddress = () => {
    const isIP = isIPv4Address(IpAddress);
    if (!isIP) {
      alert("No IP Address");
      return;
    } else context?.set("ipAddress", IpAddress);
    if (Platform.OS === "web") {
      window.location.reload();
    } else {
      navigation.navigate("Root");
    }
  };
  return (
    <Box
      style={{
        width: "100%",
        margin: "auto",
        marginTop: 50,
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <CustomInput
        size={"lg"}
        placeholder={"Enter IP Address"}
        onChangeText={onChangeText}
        width={inputPosition}
      />

      <Button mt={10} variant={"solid"} onPress={addIPAddress}>
        Submit
      </Button>
    </Box>
  );
};

export default EnterIP;
