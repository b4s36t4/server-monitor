import axios from "axios";
import { Box, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useAppContextProvider } from "../context/appContext";

export function DiskCard() {
  const [info, setInfo] = useState<any>(null);
  const [ioStats, setIoStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const context = useAppContextProvider();
  const Links = context?.links;
  useEffect(() => {
    setLoading(true);
    const call = async () => {
      const req = await axios.get(Links["storage"]["partitions"]);
      if (req.status == 200) {
        setInfo(req.data[0]);
      }
      const ioreq = await axios.get(Links["storage"]["iostats"]);
      if (ioreq.status == 200) {
        setIoStats(ioreq.data);
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
        <>
          <Box>
            <Text fontWeight={"bold"}>Partitions</Text>
            <Box style={{ marginTop: 10 }}>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Mount Point</Text>
                <Text>{info?.mount_point}</Text>
              </Box>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Total</Text>
                <Text>{info?.total}</Text>
              </Box>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Used</Text>
                <Text>{info?.used}</Text>
              </Box>
            </Box>
          </Box>
          <Box style={{ marginTop: 10 }}>
            <Text fontWeight={"bold"}>IoStats</Text>
            <Box style={{ marginTop: 10 }}>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Reads</Text>
                <Text>{ioStats?.reads}</Text>
              </Box>
              <Box
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text fontWeight={"bold"}>Writes</Text>
                <Text>{ioStats?.writes}</Text>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
