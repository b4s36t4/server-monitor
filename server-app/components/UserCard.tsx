import axios from "axios";
import dayjs from "dayjs";
import { Box, Divider, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useAppContextProvider } from "../context/appContext";

export function User() {
  const [info, setInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const context = useAppContextProvider();
  const Links = context?.links;
  useEffect(() => {
    setLoading(true);
    const call = async () => {
      const req = await axios.get(Links["misc"]["users"]);
      if (req.status === 200) {
        setInfo(req.data);
      }
      setLoading(false);
    };
    call();
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
        <Box flexDirection={"column"}>
          {info.map((item, index) => {
            return (
              <Box
                key={index}
                // flexDirection={"row"}
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                alignItems={"center"}
              >
                <Box
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text fontWeight={"bold"}>User</Text>
                  <Text>{item?.user}</Text>
                </Box>
                <Box
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text fontWeight={"bold"}>Process ID</Text>
                  <Text>{item?.pid}</Text>
                </Box>
                <Box
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text fontWeight={"bold"}>Stated At:</Text>
                  <Text>{dayjs.unix(item?.started).toString()}</Text>
                </Box>
                <Divider my={5} />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
