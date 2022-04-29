/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import * as React from "react";
import { ColorSchemeName, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../components/Themed";

import Colors from "../constants/Colors";
import { AppContextProvider } from "../context/appContext";
import useColorScheme from "../hooks/useColorScheme";
import EnterIP from "../screens/EnterIP";
import Home from "../screens/Home";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Settings from "../screens/Settings";
import { NavigationRef } from "../constants/Links";
const queryClient = new QueryClient();
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={{
        colors: { ...DefaultTheme.colors, background: "white" },
        dark: DefaultTheme.dark,
      }}
      documentTitle={{
        enabled: true,
        formatter: (options, route) => {
          // console.log(route, options);
          return `Server Monitor - ${route?.name} `;
        },
      }}
      ref={NavigationRef}
    >
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NativeBaseProvider theme={theme}>
            <AppContextProvider>
              <RootNavigator />
            </AppContextProvider>
          </NativeBaseProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="EnterIP"
        component={EnterIP}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      // initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: { backgroundColor: "white" },
      }}
      tabBar={({ state, descriptors, navigation }) => {
        const Icons = {
          Home: <FontAwesome name="home" size={22} />,
          Settings: <Ionicons name="settings" size={22} />,
        };
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              shadowColor: "rgb(128, 107, 107)",
              shadowOpacity: 0.8,
              shadowRadius: 10,
            }}
          >
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
              // console.log(label, "lab");

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation.navigate({ name: route.name, merge: true });
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key,
                });
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{ flex: 1, alignItems: "center", paddingVertical: 5 }}
                >
                  {Icons[label]}
                  <Text
                    style={{
                      color: isFocused ? "#673ab7" : "#222",
                      fontWeight: "bold",
                      marginTop: 5,
                    }}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <BottomTab.Screen name="Settings" component={Settings} />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
