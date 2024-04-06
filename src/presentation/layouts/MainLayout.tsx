/* eslint-disable curly */
/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import {StyleSheet} from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import Icon from "../components/ui/Icon";

interface MainLayoutProps {
  title: string;
  subTitle?: string;
  rightAction?: () => void;
  rightActionIcon?: string;

  children: React.ReactNode;
}

export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children,
}: MainLayoutProps) => {
  const {top} = useSafeAreaInsets();
  const {canGoBack, goBack} = useNavigation();

  const renderBackActions = () => (
    <TopNavigationAction
      icon={<Icon name="arrow-back-outline" />}
      onPress={goBack}
    />
  );

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;

    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<Icon name={rightActionIcon} />}
      />
    );
  };

  return (
    <Layout style={{...styles.container, paddingTop: top}}>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackActions : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />

      <Layout style={styles.container}>{children}</Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
