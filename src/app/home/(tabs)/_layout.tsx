import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AppHeader from "../../../components/AppHeader";

const ACTIVE = "#111111";
const INACTIVE = "#222222";
const ACTIVE_BACKGROUND = "#F1F1F1";
const SCREEN_BACKGROUND = "#FBF8FF";

const TAB_BAR_HEIGHT = 60;
const TAB_ITEM_HEIGHT = 48;

function TabIcon({
  name,
  label,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemActive]}>
      <Ionicons name={name} size={20} color={focused ? ACTIVE : INACTIVE} />

      <Text
        style={[styles.label, focused && styles.labelActive]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

function TabButton(props: any) {
  return (
    <Pressable
      {...props}
      android_ripple={{ color: "transparent" }}
      style={({ pressed }) => [
        styles.tabButton,
        pressed && styles.tabButtonPressed,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  /*
   * Individual navigation button.
   *
   * This provides the horizontal space for each tab.
   */
  tabButton: {
    flex: 1,
    height: TAB_BAR_HEIGHT,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 2,
  },

  tabButtonPressed: {
    opacity: 0.85,
  },

  /*
   * Actual tab/pill.
   *
   * 48px high inside a 60px outer wrapper.
   *
   * This gives:
   *
   * 6px top
   * 48px pill
   * 6px bottom
   */
  tabItem: {
    width: "100%",
    height: TAB_ITEM_HEIGHT,

    borderRadius: TAB_ITEM_HEIGHT / 2,

    alignItems: "center",
    justifyContent: "center",

    gap: 1,

    /*
     * IMPORTANT:
     * No background here.
     */
    backgroundColor: "transparent",
  },

  /*
   * Only the focused tab gets this background.
   */
  tabItemActive: {
    backgroundColor: ACTIVE_BACKGROUND,
  },

  label: {
    marginTop: 2,

    fontSize: 10,
    lineHeight: 12,

    fontWeight: "400",

    color: INACTIVE,

    textAlign: "center",
  },

  labelActive: {
    color: ACTIVE,
    fontWeight: "500",
  },
});

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,

        header: () => <AppHeader />,

        lazy: false,

        /*
         * We render our own labels.
         */
        tabBarShowLabel: false,

        /*
         * Custom button.
         */
        tabBarButton: (props) => <TabButton {...props} />,

        /*
         * IMPORTANT:
         * Remove React Navigation's default
         * active/inactive background.
         *
         * Our TabIcon controls the background.
         */
        tabBarActiveBackgroundColor: "transparent",
        tabBarInactiveBackgroundColor: "transparent",

        /*
         * Equal width tabs.
         */
        tabBarItemStyle: {
          flex: 1,

          height: TAB_BAR_HEIGHT,

          margin: 0,
          padding: 0,

          alignItems: "center",
          justifyContent: "center",
        },

        /*
         * Let our custom TabIcon occupy
         * the tab area.
         */
        tabBarIconStyle: {
          width: "100%",
          height: TAB_BAR_HEIGHT,

          margin: 0,
          padding: 0,

          alignItems: "center",
          justifyContent: "center",
        },

        /*
         * OUTER WHITE PILL
         */
        tabBarStyle: {
          position: "absolute",

          left: 60,
          right: 60,
          bottom: 30,

          height: TAB_BAR_HEIGHT,
          width: "90%",
          marginHorizontal: "5%",

          paddingHorizontal: 12,
          paddingVertical: 6,

          borderRadius: TAB_BAR_HEIGHT / 2,

          borderTopWidth: 0,
          borderWidth: 0,

          backgroundColor: "#FFFFFF",

          shadowColor: "#000000",
          shadowOpacity: 0.08,
          shadowRadius: 14,
          shadowOffset: {
            width: 0,
            height: 5,
          },

          elevation: 5,
        },

        sceneStyle: {
          backgroundColor: SCREEN_BACKGROUND,

          paddingBottom: TAB_BAR_HEIGHT + 40,
        },
      }}
    >
      {/* VAULT */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Vault",

          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "layers" : "layers-outline"}
              label="Vault"
              focused={focused}
            />
          ),
        }}
      />

      {/* CATEGORIES */}
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",

          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "list" : "list-outline"}
              label="Categories"
              focused={focused}
            />
          ),
        }}
      />

      {/* REMINDERS */}
      <Tabs.Screen
        name="reminders"
        options={{
          title: "Reminders",

          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "notifications" : "notifications-outline"}
              label="Reminders"
              focused={focused}
            />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "person" : "person-outline"}
              label="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
