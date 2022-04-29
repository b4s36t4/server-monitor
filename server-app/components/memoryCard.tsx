import axios from "axios";
import { Box, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useAppContextProvider } from "../context/appContext";
// import { Links } from "../constants/Links";

export function MemoryCard() {
  const [virtual, setVirutal] = useState<any>({});
  const [swap, setSwap] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const context = useAppContextProvider();
  const Links = context?.links;
  const doAPICalls = async () => {
    setLoading(true);
    const req = await axios.get(Links["memory"]["virtual"]);
    if (req.status == 200) {
      setVirutal(req.data);
    }
    const Sreq = await axios.get(Links["memory"]["swap"]);
    if (req.status == 200) {
      setSwap(Sreq.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    const call = async () => {
      doAPICalls();
    };
    call();
  }, []);
  useEffect(() => {
    const int = setInterval(() => {
      doAPICalls();
    }, 5000);
    return () => clearInterval(int);
  }, []);
  if (!Links) {
    return <ActivityIndicator />;
  }
  return (
    <Box
      style={{
        borderRadius: 10,
        marginVertical: 10,
        marginLeft: 5,
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOpacity: 0.7,
        shadowRadius: 10,
        padding: 10,
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Box>
            <Text fontWeight={"bold"}>Virtual</Text>
            <Box style={{ marginTop: 10 }}>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Total</Text>
                <Text>{virtual?.total}</Text>
              </Box>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Available</Text>
                <Text>{virtual?.available}</Text>
              </Box>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Precentage</Text>
                <Text>{virtual?.precentage}%</Text>
              </Box>
            </Box>
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Swap</Text>
            <Box style={{ marginTop: 10 }}>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Total</Text>
                <Text>{swap?.total}</Text>
              </Box>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Used</Text>
                <Text>{swap?.used}</Text>
              </Box>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Free</Text>
                <Text>{swap?.free}</Text>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
