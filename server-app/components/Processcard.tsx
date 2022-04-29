import axios from "axios";
import { Box, Button, Text, useBreakpointValue } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useAppContextProvider } from "../context/appContext";

function ProcessCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [processData, setProcessData] = useState<any[]>([]);
  const context = useAppContextProvider();
  const Links = context?.links;
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });

  const doAPICalls = async () => {
    // setIsLoading(true);
    const req = await axios.get(Links.prorcess.get_process);
    if (req.status === 200) {
      setProcessData(req.data);
      // console.log(req.data);
    }
    // setIsLoading(false);
  };
  useEffect(() => {
    const call = async () => {
      setIsLoading(true);
      doAPICalls();
      setIsLoading(false);
    };
    call();
  }, []);

  useEffect(() => {
    const int = setInterval(() => {
      doAPICalls();
    }, 5000);
    return () => clearInterval(int);
  }, []);

  const KillAProcess = async (pid: any) => {
    const req = await axios.post(Links.prorcess.kill_process, { pid: pid });
    // console.log(req.data);
    doAPICalls();
    if (req.data === 200 && req.data.success === true) {
      window && window.location.reload();
    }
  };
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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Box style={{ alignItems: "center", paddingHorizontal: 20 }}>
          <Box
            style={{
              flexDirection: flexDirection,
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
              marginBottom: 20,
            }}
          >
            <Text fontWeight={"bold"}>PID</Text>
            <Text fontWeight={"bold"}>Process Name</Text>
            <Text fontWeight={"bold"}>Memory Taken (%)</Text>
            <Text fontWeight={"bold"}>Process Created At</Text>
            <Text fontWeight={"bold"}>Action</Text>
          </Box>
          {processData &&
            processData.map((process, index) => {
              return (
                <Box
                  key={process?.pid}
                  style={{
                    flexDirection: flexDirection,
                    width: "100%",
                    justifyContent:
                      flexDirection === "row" ? "space-between" : "center",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text>{process?.pid}</Text>
                  <Text fontWeight={"bold"}>{process?.name}</Text>
                  <Text>{process?.memory_percent}</Text>
                  <Text>{parseInt(process?.create_time)}</Text>
                  <Button
                    onPress={() => KillAProcess(process?.pid)}
                    size={"sm"}
                    backgroundColor={"red.400"}
                  >
                    Kill
                  </Button>
                </Box>
              );
            })}
        </Box>
      )}
    </Box>
  );
}

export default ProcessCard;
