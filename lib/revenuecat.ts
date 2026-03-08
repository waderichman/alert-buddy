import Purchases, { LOG_LEVEL } from "react-native-purchases";

const API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_API_KEY;

export async function configureRevenueCat(userId?: string) {
  if (!API_KEY) {
    return false;
  }

  Purchases.setLogLevel(LOG_LEVEL.INFO);
  await Purchases.configure({ apiKey: API_KEY, appUserID: userId });
  return true;
}

export async function getRevenueCatOfferings() {
  try {
    return await Purchases.getOfferings();
  } catch {
    return null;
  }
}
