// import { get } from "../storage";

import { createNavigationContainerRef } from "@react-navigation/native";

// async function getIP() {
//   const BASE_URL = await get("ipAddress");
//   return;
// }
// const data: any = {};

// const links = getIP().then((res) => {
//   data["Links"] = res;
// });
// // console.log(links, "link", data);
// const { Links } = data;
// export { Links };
// // export const Links = {
// //   cpu: {
// //     cpucount: `${BASE_URL}/cpucount`,
// //     cputime: `${BASE_URL}/cpu_time`,
// //     cpupercent: `${BASE_URL}/cpu_percent`,
// //     cpu_load: `${BASE_URL}/cpu_load_by_cpu`,
// //     sysinfo: `${BASE_URL}/sysinfo`,
// //   },
// //   memory: {
// //     virtual: `${BASE_URL}/memory_stats`,
// //     swap: `${BASE_URL}/swap_stats`,
// //   },
// //   storage: {
// //     iostats: `${BASE_URL}/iostats`,
// //     partitions: `${BASE_URL}/partitions`,
// //   },
// //   network: {
// //     network: `${BASE_URL}/connections`,
// //   },
// //   misc: {
// //     users: `${BASE_URL}/users`,
// //   },
// //   prorcess: {
// //     get_process: `${BASE_URL}/processes`,
// //     kill_process: `${BASE_URL}/kill_process`,
// //   },
// // };

export const NavigationRef = createNavigationContainerRef();
