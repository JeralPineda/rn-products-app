import React from "react";
import {StyleSheet, View, ViewStyle} from "react-native";
import Animated from "react-native-reanimated";
import Notification from "./Notification";
import {useUistore} from "../../../store";
import {normalize} from "../../../../utils/metrics";
// import {useSafeAreaInsets} from "react-native-safe-area-context";

type Position = "left" | "right";

const Notifications = ({position = "left"}: {position?: Position}) => {
  const notifications = useUistore(state => state.notifications);

  // const top = useSafeAreaInsets();

  return (
    <View
      //
      style={Styles.Container(position)}>
      <Animated.View style={Styles.innerContainer}>
        {notifications?.map(notification => (
          <Notification notification={notification} key={notification.id} />
        ))}
      </Animated.View>
    </View>
  );
};

export default Notifications;

const Styles = StyleSheet.create({
  Container: (position: Position) =>
    ({
      position: "absolute",
      top: normalize(50),
      left: position === "left" ? 0 : undefined,
      right: position === "right" ? 0 : undefined,
    } as ViewStyle),

  innerContainer: {
    padding: normalize(15),
  },
});
