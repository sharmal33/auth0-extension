import React, { useState } from 'react';
import { AppButton } from '@/components/shared';

import { useNavigation } from '@react-navigation/native';

import { text } from '@/assets';

import { ASContainer, ASText } from '@/components';

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';
import { executeCustomFunction } from '@/extensions';

import { STRINGS } from '@/strings';

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const Dashboard: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const [extAuth0Logout, setExtAuth0Logout] = useState<any>(undefined);
  const onPressLogoutASButton = async () => {
    const __out = await executeCustomFunction('Auth0Functions.logout', {});
    setExtAuth0Logout(__out);
    navigation.navigate(Route.PHONE_AUTH, { ext_auth0_logout: __out });
  };

  useClearHeaderActions(navigation);

  return (
    <ASContainer
      disabledSafeArea={false}
      isScrollable={true}
      backgroundImageResizeMode={'contain'}
      name={'ASContainer-795022'}
      testID={'527cb4cb-9937-4dab-bfd3-b60254dec36d'}
      style={sharedStyles.container}
      testId={'ASContainer-795022'}
    >
      <ASText
        labelType={'string'}
        name={'ASText-240484'}
        dragStyle={sharedStyles.textDrag}
        style={[text.label.medium, sharedStyles.dashEmail]}
        accessibilityLabel={STRINGS.Dashboard.ASText_240484.accessibilityLabel}
        testId={'ASText-240484'}
      >
        {STRINGS.Dashboard.ASText_240484.label}
      </ASText>
      <ASText
        labelType={'string'}
        name={'dashEmail'}
        dragStyle={sharedStyles.textDrag}
        style={[text.label.medium, sharedStyles.dashEmail]}
        testId={'dashEmail'}
      >
        {route.params?.ext_auth0_verifyPhoneOtp?.email}
      </ASText>
      <AppButton
        widgetId={'ASButton-413886'}
        onPress={() => {
          onPressLogoutASButton({});
        }}
        style={sharedStyles.button}
        accessibilityLabel={
          STRINGS.Dashboard.ASButton_413886.accessibilityLabel
        }
        label={STRINGS.Dashboard.ASButton_413886.label}
      />
    </ASContainer>
  );
};

const styles = StyleSheet.create({});

export default Dashboard;
