import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "Lato-Black": require("../assets/fonts/Lato-Black.ttf"),
          "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
          "Lato-Light": require("../assets/fonts/Lato-Light.ttf"),
          "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
          "Lato-Thin": require("../assets/fonts/Lato-Thin.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
