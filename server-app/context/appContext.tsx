import { clear, get, set } from "../storage";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationRef } from "../constants/Links";
import { ActivityIndicator } from "react-native";
interface AppContext {
  set: (key: string, value: string) => Promise<void>;
  get: (key: string) => Promise<string | null | undefined>;
  clear: () => Promise<void>;
  links: any;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const navigation = useNavigation();
  // const [BASE_URL, setBaseURL] = useState("");
  const [links, setLinks] = useState<any>({});

  useEffect(() => {
    const call = async () => {
      // if (!NavigationRef.isReady()) return;
      const ipAddress = await get("ipAddress");
      // console.log("Ip got", !ipAddress, ipAddress);
      if (!ipAddress) {
        alert("here");
        setTimeout(() => {
          navigation.navigate("EnterIP");
        }, 1000);
      } else {
        const BASE_URL = "http://" + ipAddress;
        const filledLinks: any = {
          cpu: {
            cpucount: `${BASE_URL}/cpucount`,
            cputime: `${BASE_URL}/cpu_time`,
            cpupercent: `${BASE_URL}/cpu_percent`,
            cpu_load: `${BASE_URL}/cpu_load_by_cpu`,
            sysinfo: `${BASE_URL}/sysinfo`,
          },
          memory: {
            virtual: `${BASE_URL}/memory_stats`,
            swap: `${BASE_URL}/swap_stats`,
          },
          storage: {
            iostats: `${BASE_URL}/iostats`,
            partitions: `${BASE_URL}/partitions`,
          },
          network: {
            network: `${BASE_URL}/connections`,
          },
          misc: {
            users: `${BASE_URL}/users`,
          },
          prorcess: {
            get_process: `${BASE_URL}/processes`,
            kill_process: `${BASE_URL}/kill_process`,
          },
        };
        setLinks(filledLinks);
        // console.log("givingggg...");
        setTimeout(() => {
          // console.log(NavigationRef, NavigationRef?.isReady());
          NavigationRef?.isReady() && navigation.navigate("Root");
        }, 1000);
      }
    };
    call();
  }, []);
  // useEffect(() => {
  //   if (!BASE_URL) return;
  //   const filledLinks: any = {
  //     cpu: {
  //       cpucount: `${BASE_URL}/cpucount`,
  //       cputime: `${BASE_URL}/cpu_time`,
  //       cpupercent: `${BASE_URL}/cpu_percent`,
  //       cpu_load: `${BASE_URL}/cpu_load_by_cpu`,
  //       sysinfo: `${BASE_URL}/sysinfo`,
  //     },
  //     memory: {
  //       virtual: `${BASE_URL}/memory_stats`,
  //       swap: `${BASE_URL}/swap_stats`,
  //     },
  //     storage: {
  //       iostats: `${BASE_URL}/iostats`,
  //       partitions: `${BASE_URL}/partitions`,
  //     },
  //     network: {
  //       network: `${BASE_URL}/connections`,
  //     },
  //     misc: {
  //       users: `${BASE_URL}/users`,
  //     },
  //     prorcess: {
  //       get_process: `${BASE_URL}/processes`,
  //       kill_process: `${BASE_URL}/kill_process`,
  //     },
  //   };
  //   setLinks(filledLinks);
  // }, [BASE_URL]);
  // console.log(links);
  const values = { set, get, clear, links };
  return (
    <AppContext.Provider value={values}>
      {/* { Object.keys(links).length > 0 ? children : <ActivityIndicator />} */}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContextProvider = () => {
  const context = React.useContext(AppContext);
  if (!context) return;
  else return context;
};
