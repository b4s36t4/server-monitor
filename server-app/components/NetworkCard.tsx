import axios from "axios";
import { Box, Divider, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useAppContextProvider } from "../context/appContext";

export function NetworkCard() {
  const [info, setInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const context = useAppContextProvider();
  const Links = context?.links;
  const allowed = ["en0", "lo0", "wl01"];
  useEffect(() => {
    setLoading(true);
    const call = async () => {
      const req = await axios.get(Links["network"]["network"]);
      if (req.status === 200) {
        const data: any[] = req.data;
        const filtered = data.filter((i) => {
          return allowed.includes(i.network);
        });
        setInfo(filtered);
      }
      setLoading(false);
    };
    call();
  }, []);
  if (!Links) {
    return <ActivityIndicator />;
  }
  useEffect(() => {
    const int = setInterval(() => {
      //   setLoading(true);
    }, 10000);
    return () => clearInterval(int);
  }, []);
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
        <Box
          style={{
            display: "flex",
            // alignItems: "center",
            flexDirection: "column",
          }}
        >
          {info.map((entry: any, index) => {
            return (
              <Box
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <Text fontWeight={"bold"}>Network</Text>
                  <Text>{entry?.network}</Text>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <Text fontWeight={"bold"}>Address</Text>
                  <Text>{entry.address}</Text>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <Text fontWeight={"bold"}>Broadcast</Text>
                  <Text>{entry.broadcast || "No Broadcast"}</Text>
                </Box>
                <Divider my={"10"} />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default NetworkCard;
