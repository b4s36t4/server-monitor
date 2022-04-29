import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MMKV } from "react-native-mmkv";

// const stroage = new MMKV();

export const set = async (key: string, value: string) => {
  return await AsyncStorage.setItem(key, value);
};

export const get = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const clear = async () => {
  return await AsyncStorage.clear();
};
