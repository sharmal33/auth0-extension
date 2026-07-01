import React, { useState } from 'react';
import { AppButton, AppColumn, AppText } from '@/components/shared';

import { useNavigation } from '@react-navigation/native';

import { text } from '@/assets';

import { ASContainer } from '@/components';

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

const Phone: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const [extAuth0Login, setExtAuth0Login] = useState<any>(undefined);
  const onPressButtonASButton = async () => {
    const __out = await executeCustomFunction('Auth0Functions.login', {});
    setExtAuth0Login(__out);
    switch (__out?.status) {
      case 'authenticated': {
        navigation.navigate(Route.DASHBOARD, { ext_auth0_login: __out });
        break;
      }
    }
  };
  const onPressButtonASButton2 = async () => {
    const __out = await executeCustomFunction('Auth0Functions.login', {
      signup: 'true',
    });
    setExtAuth0Login(__out);
    switch (__out?.status) {
      case 'authenticated': {
        navigation.navigate(Route.DASHBOARD, { ext_auth0_login: __out });
        break;
      }
    }
  };

  useClearHeaderActions(navigation);

  return (
    <ASContainer
      disabledSafeArea={false}
      isScrollable={true}
      backgroundImageResizeMode={'contain'}
      name={'ASContainer-839213'}
      testID={'d667e846-87e0-466f-96cd-18567bdd8151'}
      style={sharedStyles.container}
      testId={'ASContainer-839213'}
    >
      <AppColumn widgetId={'ASColumn-495636'} style={sharedStyles.column2}>
        <AppColumn widgetId={'ASColumn-634477'} style={sharedStyles.column}>
          <AppText
            widgetId={'ASText-728838'}
            style={[text.label.medium, sharedStyles.text6]}
            accessibilityLabel={STRINGS.Phone.ASText_728838.accessibilityLabel}
          >
            {STRINGS.Phone.ASText_728838.label}
          </AppText>
          <AppText
            widgetId={'ASText-453523'}
            style={[text.label.medium, sharedStyles.text4]}
            accessibilityLabel={STRINGS.Phone.ASText_453523.accessibilityLabel}
          >
            {STRINGS.Phone.ASText_453523.label}
          </AppText>
          <AppText
            widgetId={'ASText-698134'}
            style={[text.label.medium, sharedStyles.text3]}
            accessibilityLabel={STRINGS.Phone.ASText_698134.accessibilityLabel}
          >
            {STRINGS.Phone.ASText_698134.label}
          </AppText>
        </AppColumn>
        <AppButton
          widgetId={'ASButton-263238'}
          onPress={() => {
            onPressButtonASButton({});
          }}
          style={sharedStyles.button}
          label={STRINGS.Phone.ASButton_263238.label}
        >
          <AppText
            widgetId={'ASText-628682'}
            style={[text.label.medium, sharedStyles.text5]}
            accessibilityLabel={STRINGS.Phone.ASText_628682.accessibilityLabel}
          >
            {STRINGS.Phone.ASText_628682.label}
          </AppText>
        </AppButton>
        <AppButton
          widgetId={'ASButton-280519'}
          onPress={() => {
            onPressButtonASButton2({});
          }}
          style={sharedStyles.button2}
          label={STRINGS.Phone.ASButton_280519.label}
        >
          <AppText
            widgetId={'ASText-236760'}
            style={[text.label.medium, sharedStyles.text]}
            accessibilityLabel={STRINGS.Phone.ASText_236760.accessibilityLabel}
          >
            {STRINGS.Phone.ASText_236760.label}
          </AppText>
        </AppButton>
      </AppColumn>
    </ASContainer>
  );
};

const styles = StyleSheet.create({});

export default Phone;
