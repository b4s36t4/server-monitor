import axios from "axios";
import { Box, Heading, Text } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useAppContextProvider } from "../context/appContext";

const doReq = async (url: string, onRes: any) => {
  try {
    const req = await axios.get(url);
    if (req.status === 200) {
      onRes(req.data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const CPUCard = () => {
  const [cpuCount, setCpuCount] = useState();
  const [cpuLoad, setCpuLoad] = useState<string>();
  const [cputime, setCputime] = useState<{ [key: string]: any }>({
    user: null,
    system: null,
  });
  const [cpuPercent, setCpuPercent] = useState();
  const [loading, setLoading] = useState(false);
  const context = useAppContextProvider();
  const Links = context?.links;
  const onCpuCount = (res: any) => {
    if (res) {
      setCpuCount(res?.cpu_count);
    }
  };
  const onCpuPercent = (res: any) => {
    if (res) {
      // console.log(res, "per");
      setCpuPercent(res?.usage);
    }
  };
  const onCpuLoad = (res: any) => {
    if (res) {
      const load: number[] = res?.load_average;
      const avg = load.reduce((pSum, a) => pSum + a, 0);
      const value = avg / load.length || 0;
      setCpuLoad(value.toFixed(2).toString());
    }
  };
  const onCpuTime = (res: any) => {
    if (res) {
      // console.log(res, "time");
      setCputime({ user: res?.user, system: res?.system });
    }
  };

  const doAPICalls = async () => {
    setLoading(true);
    doReq(Links?.cpu?.cpucount, onCpuCount);
    doReq(Links?.cpu?.cpupercent, onCpuPercent);
    doReq(Links?.cpu?.cpu_load, onCpuLoad);
    doReq(Links?.cpu?.cputime, onCpuTime);
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
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: 10,
            }}
          >
            <Heading size={"sm"}>CPU Count (logical)</Heading>
            <Text>{cpuCount}</Text>
          </Box>
          <Box
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: 10,
            }}
          >
            <Heading size={"sm"}>CPU time</Heading>
            <Box justifyContent={"flex-end"} alignItems={"flex-end"}>
              <Text>User: {cputime?.user}</Text>
              <Text>System: {cputime?.system}</Text>
            </Box>
          </Box>
          <Box
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              width: "100%",
            }}
          >
            <Heading size={"sm"}>CPU Load</Heading>
            <Text>{cpuLoad}</Text>
          </Box>
          <Box
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Heading size={"sm"}>CPU Percent %</Heading>
            <Text>{cpuPercent}</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};
