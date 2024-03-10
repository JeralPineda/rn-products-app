/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  Layout,
} from "react-native-reanimated";

import {Text, useTheme} from "@ui-kitten/components";
import Icon from "../Icon";
import {Notification as INotification, useUistore} from "../../../store";
import {normalize} from "../../../../utils/metrics";

const Notification = ({notification}: {notification: INotification}) => {
  const theme = useTheme();
  // const notifications = useUistore(state => state.notifications);
  const removeNotification = useUistore(state => state.removeNotification);

  const getBackgroundColor = (type: INotification["type"]) => {
    switch (type) {
      case "success":
        return theme["color-success-200"];

      case "error":
        return theme["color-danger-200"];
    }
  };

  const getIcon = (type: INotification["type"]) => {
    switch (type) {
      case "success":
        return (
          <Icon
            name="checkmark-circle-2-outline"
            color="color-success-800"

            // size={normalize(18)}
          />
        );

      case "error":
        return (
          <Icon
            name="close-circle-outline"
            color="color-danger-800"
            // size={normalize(18)}
          />
        );
    }
  };

  const getIconClose = (type: INotification["type"]) => {
    const styleIconclose = {width: 20, height: 20};

    switch (type) {
      case "success":
        return (
          <Icon
            handlePress={() => removeNotification(notification.id!)}
            name="close-outline"
            color="color-success-900"
            style={styleIconclose}
          />
        );

      case "error":
        return (
          <Icon
            handlePress={() => removeNotification(notification.id!)}
            name="close-outline"
            color="color-danger-800"
            style={styleIconclose}
          />
        );
    }
  };

  const getColor = (type: INotification["type"]) => {
    switch (type) {
      case "success":
        return theme["color-success-900"];

      case "error":
        return theme["color-danger-800"];
    }
  };

  useEffect(() => {
    setTimeout(() => {
      removeNotification(notification.id);
    }, 3000);
  }, []);

  return (
    <Animated.View
      layout={Layout.delay(200)}
      key={notification.id}
      entering={FadeInRight}
      exiting={FadeOutRight}
      style={Styles.notification(getBackgroundColor(notification.type)!)}>
      <View style={Styles.decoration(getColor(notification.type)!)} />
      {getIcon(notification.type)}
      <View>
        {Array.isArray(notification?.message) ? (
          notification?.message.map(msg => (
            <Text key={msg} style={Styles.text(getColor(notification.type)!)}>
              {msg}
            </Text>
          ))
        ) : (
          <Text style={Styles.text(getColor(notification.type)!)}>
            {notification?.message}
          </Text>
        )}
      </View>
      {getIconClose(notification.type)}
    </Animated.View>
  );
};

export default Notification;

const Styles = StyleSheet.create({
  notification: (backgroundColor: string) =>
    ({
      paddingVertical: normalize(10),
      paddingHorizontal: normalize(10),
      borderRadius: normalize(10),
      backgroundColor,
      marginBottom: normalize(10),
      alignSelf: "flex-start",
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
    } as ViewStyle),

  text: (color: string) => ({
    color,
    marginLeft: normalize(5),
    marginRight: normalize(30),
  }),

  decoration: (backgroundColor: string) =>
    ({
      width: normalize(5),
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      alignContent: "flex-start",
      borderBottomLeftRadius: normalize(10),
      backgroundColor,
    } as ViewStyle),
});
