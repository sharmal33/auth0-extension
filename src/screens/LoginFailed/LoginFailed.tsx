import React from 'react';
import { AppButton } from '@/components/shared';
import { useNavigation } from '@react-navigation/native';

import { text } from '@/assets';

import { ASContainer, ASText } from '@/components';

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';

import { STRINGS } from '@/strings';

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const LoginFailed: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const onPressTryagainASButton = async () => {
    navigation.navigate(Route.PHONE_AUTH, {});
  };

  useClearHeaderActions(navigation);

  return (
    <ASContainer
      disabledSafeArea={false}
      isScrollable={true}
      backgroundImageResizeMode={'contain'}
      name={'ASContainer-335473'}
      testID={'6da033f1-80e5-4584-81c5-6bc7b186287d'}
      style={sharedStyles.container}
      testId={'ASContainer-335473'}
    >
      <ASText
        labelType={'string'}
        name={'ASText-212149'}
        dragStyle={sharedStyles.textDrag}
        style={[text.label.medium, sharedStyles.dashEmail]}
        accessibilityLabel={
          STRINGS.LoginFailed.ASText_212149.accessibilityLabel
        }
        testId={'ASText-212149'}
      >
        {STRINGS.LoginFailed.ASText_212149.label}
      </ASText>
      <AppButton
        widgetId={'ASButton-611714'}
        onPress={() => {
          onPressTryagainASButton({});
        }}
        style={sharedStyles.button}
        accessibilityLabel={
          STRINGS.LoginFailed.ASButton_611714.accessibilityLabel
        }
        label={STRINGS.LoginFailed.ASButton_611714.label}
      />
    </ASContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginFailed;
