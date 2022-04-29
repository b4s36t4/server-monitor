import axios from "axios";
import { Box, Text, useBreakpointValue } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useAppContextProvider } from "../context/appContext";

export function SysCard() {
  const [info, setInfo] = useState<object>();
  const [loading, setLoading] = useState(false);
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const context = useAppContextProvider();
  const Links = context?.links;
  useEffect(() => {
    setLoading(true);
    const call = async () => {
      const req = await axios.get(Links["cpu"]["sysinfo"]);
      if (req.status === 200) {
        setInfo(req.data?.data);
      }
      setLoading(false);
    };
    call();
  }, []);
  useEffect(() => {
    const int = setInterval(() => {
      //   setLoading(true);
    }, 10000);
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
        <Box>
          {Object.entries(info || {}).map((entry, index) => {
            return (
              <Box
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexDirection: flexDirection,
                  width: 500,
                  flexWrap: "wrap",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{entry[0]}</Text>
                <Text style={{ width: 200 }}>{entry[1]}</Text>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default SysCard;
