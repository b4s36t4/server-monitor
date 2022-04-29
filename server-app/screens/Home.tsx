import React, { useEffect, useState } from "react";
import { RootTabScreenProps } from "../types";
import { useAppContextProvider } from "../context/appContext";
import {
  Box,
  Center,
  Container,
  Divider,
  Heading,
  ScrollView,
  Text,
  useBreakpointValue,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import { Links } from "../constants/Links";
import { useQuery } from "react-query";
import axios from "axios";
import { CPUCard } from "../components/cpuCard";
import SysCard from "../components/sysCard";
import { MemoryCard } from "../components/memoryCard";
import { User } from "../components/UserCard";
import { DiskCard } from "../components/DiskCard";
import { NetworkCard } from "../components/NetworkCard";
import ProcessCard from "../components/Processcard";

const Home = ({ navigation, route }: RootTabScreenProps<"Home">) => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const width = useBreakpointValue({ base: "100%", md: "auto" });
  const context = useAppContextProvider();

  const [loaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 2000);
  // });

  useEffect(() => {
    if (context?.links) {
      console.log(context, "contexxxxx");
      setIsLoaded(true);
    }
  }, [context, context?.links]);
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <ScrollView
      py={10}
      nestedScrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      <Center>
        <Heading size={"lg"}>Staticstics</Heading>
      </Center>
      <Divider style={{ marginVertical: 5 }} />
      {loaded && (
        <ScrollView
          nestedScrollEnabled
          style={{ paddingHorizontal: 20, overflow: "scroll" }}
          showsVerticalScrollIndicator
          contentContainerStyle={{
            flexDirection: flexDirection,
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: 100,
          }}
        >
          <Box style={{ marginTop: 10, minWidth: 300, width: width }}>
            <Heading size={"md"}>System Information</Heading>
            <SysCard />
          </Box>
          <Box style={{ marginTop: 10, minWidth: 300, width: width }}>
            <Heading size={"md"}>CPU</Heading>
            <CPUCard />
          </Box>
          <Box style={{ marginTop: 10, minWidth: 300, width: width }}>
            <Heading size={"md"}>Memory</Heading>
            {/* <Card /> */}
            <MemoryCard />
          </Box>
          <Box style={{ marginTop: 10, minWidth: 300, width: width }}>
            <Heading size={"md"}>User</Heading>
            <User />
          </Box>
          <Box style={{ marginTop: 10, minWidth: 300, width: width }}>
            <Heading size={"md"}>Disk</Heading>
            <DiskCard />
          </Box>
          <Box style={{ marginTop: 10, minWidth: 300, width: width }}>
            <Heading size={"md"}>Netowrk</Heading>
            <NetworkCard />
          </Box>
          <Box style={{ width: "100%", alignSelf: "center" }}>
            <Heading size={"md"}>Process</Heading>
            <ProcessCard />
            {/* <Card /> */}
          </Box>
        </ScrollView>
      )}
    </ScrollView>
    // </SafeAreaView>
  );
};

export default Home;

// const styles = StyleSheet.create({});
