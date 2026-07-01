import React, { useState } from 'react';
import { AppButton, AppColumn, AppText } from '@/components/shared';

import { useNavigation } from '@react-navigation/native';

import { space, text } from '@/assets';

import { ASContainer, ASRow, ASSpacer } from '@/components';

import { Platform, StyleSheet } from 'react-native';
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
  const onPressButtonASButton = async () => {
    const __out = await executeCustomFunction('Auth0Functions.logout', {});
    setExtAuth0Logout(__out);
    navigation.navigate(Route.METHOD, { ext_auth0_logout: __out });
  };

  useClearHeaderActions(navigation);

  return (
    <ASContainer
      disabledSafeArea={false}
      isScrollable={true}
      backgroundImageResizeMode={'contain'}
      name={'ASContainer-618625'}
      testID={'6b58a95a-2028-4ccf-906f-05099e087958'}
      style={sharedStyles.container}
      testId={'ASContainer-618625'}
    >
      <AppColumn widgetId={'ASColumn-707968'} style={sharedStyles.column3}>
        <ASRow
          spacing={space['2']}
          backgroundImageResizeMode={'contain'}
          scrollable={false}
          scrollDirection={'horizontal'}
          name={'ASRow-937975'}
          style={styles.aSRowStyle}
          testId={'ASRow-937975'}
        >
          <AppColumn widgetId={'ASColumn-989178'} style={sharedStyles.column4}>
            <AppText
              widgetId={'ASText-697033'}
              style={[text.label.medium, styles.aSTextStyle]}
              accessibilityLabel={
                STRINGS.Dashboard.ASText_697033.accessibilityLabel
              }
            >
              {STRINGS.Dashboard.ASText_697033.label}
            </AppText>
            <AppText
              widgetId={'ASText-947411'}
              style={[text.label.medium, styles.aSTextStyle2]}
              accessibilityLabel={
                STRINGS.Dashboard.ASText_947411.accessibilityLabel
              }
            >
              {STRINGS.Dashboard.ASText_947411.label}
            </AppText>
          </AppColumn>
          <AppColumn widgetId={'ASColumn-741914'} style={styles.aSColumnStyle3}>
            <AppText
              widgetId={'ASText-581787'}
              style={[text.label.medium, styles.aSTextStyle3]}
              accessibilityLabel={
                STRINGS.Dashboard.ASText_581787.accessibilityLabel
              }
            >
              {STRINGS.Dashboard.ASText_581787.label}
            </AppText>
          </AppColumn>
        </ASRow>
        <AppColumn widgetId={'ASColumn-826636'} style={styles.aSColumnStyle4}>
          <AppText
            widgetId={'ASText-244510'}
            style={[text.label.medium, styles.aSTextStyle4]}
            accessibilityLabel={
              STRINGS.Dashboard.ASText_244510.accessibilityLabel
            }
          >
            {STRINGS.Dashboard.ASText_244510.label}
          </AppText>
          <AppText
            widgetId={'ASText-919855'}
            style={[text.label.medium, styles.aSTextStyle5]}
            accessibilityLabel={
              STRINGS.Dashboard.ASText_919855.accessibilityLabel
            }
          >
            {STRINGS.Dashboard.ASText_919855.label}
          </AppText>
          <ASRow
            spacing={space['2']}
            backgroundImageResizeMode={'contain'}
            scrollable={false}
            scrollDirection={'horizontal'}
            name={'ASRow-153358'}
            style={styles.aSRowStyle2}
            testId={'ASRow-153358'}
          >
            <AppColumn
              widgetId={'ASColumn-405866'}
              style={styles.aSColumnStyle5}
            >
              <AppText
                widgetId={'ASText-788508'}
                style={[text.label.medium, styles.aSTextStyle6]}
                accessibilityLabel={
                  STRINGS.Dashboard.ASText_788508.accessibilityLabel
                }
              >
                {STRINGS.Dashboard.ASText_788508.label}
              </AppText>
              <AppText
                widgetId={'dashEmail'}
                style={[text.label.medium, styles.dashEmailStyle]}
              >
                {route.params?.ext_auth0_verifyPhoneOtp?.email}
              </AppText>
            </AppColumn>
            <AppColumn
              widgetId={'ASColumn-803435'}
              style={styles.aSColumnStyle6}
            >
              <AppText
                widgetId={'ASText-773898'}
                style={[text.label.medium, styles.aSTextStyle7]}
                accessibilityLabel={
                  STRINGS.Dashboard.ASText_773898.accessibilityLabel
                }
              >
                {STRINGS.Dashboard.ASText_773898.label}
              </AppText>
            </AppColumn>
          </ASRow>
        </AppColumn>
        <ASSpacer
          name={'ASSpacer-441524'}
          style={styles.aSSpacerStyle}
          testId={'ASSpacer-441524'}
        />
        <AppButton
          widgetId={'ASButton-234372'}
          onPress={() => {
            onPressButtonASButton({});
          }}
          style={sharedStyles.button}
          label={STRINGS.Dashboard.ASButton_234372.label}
        >
          <AppText
            widgetId={'ASText-403262'}
            style={[text.label.medium, sharedStyles.text5]}
            accessibilityLabel={
              STRINGS.Dashboard.ASText_403262.accessibilityLabel
            }
          >
            {STRINGS.Dashboard.ASText_403262.label}
          </AppText>
        </AppButton>
      </AppColumn>
    </ASContainer>
  );
};

const styles = StyleSheet.create({
  aSRowStyle: {
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 24,
    alignItems: 'center',
    overflow: 'visible',
    flexShrink: 1,
  },
  aSTextStyle: {
    color: '#9ca3af',
    fontSize: 14,
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSTextStyle2: {
    fontSize: 22,
    fontWeight: 800,
    color: '#f9fafb',
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSColumnStyle3: {
    justifyContent: 'center',
    height: 48,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    width: 48,
    borderRadius: 999,
    flexShrink: 1,
    overflow: 'visible',
  },
  aSTextStyle3: {
    fontSize: 20,
    fontWeight: 700,
    color: '#ffffff',
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSColumnStyle4: {
    borderRadius: 16,
    borderWidth: 1,
    width: '100%',
    padding: 20,
    borderColor: '#374151',
    backgroundColor: '#1f2937',
    flexShrink: 1,
    overflow: 'visible',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  aSTextStyle4: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: 700,
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSTextStyle5: {
    marginBottom: 18,
    fontWeight: 700,
    color: '#f9fafb',
    marginTop: 18,
    fontSize: 22,
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSRowStyle2: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    overflow: 'visible',
    flexShrink: 1,
  },
  aSColumnStyle5: {
    flexShrink: 1,
    overflow: 'visible',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  aSTextStyle6: {
    fontWeight: 700,
    fontSize: 11,
    color: '#9ca3af',
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  dashEmailStyle: {
    color: '#f9fafb',
    fontSize: 14,
    fontWeight: 600,
    marginTop: 4,
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSColumnStyle6: {
    paddingBottom: 4,
    paddingRight: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(16,185,129,0.15)',
    paddingLeft: 12,
    paddingTop: 4,
    flexShrink: 1,
    overflow: 'visible',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  aSTextStyle7: {
    fontWeight: 700,
    color: '#10b981',
    fontSize: 11,
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSSpacerStyle: { height: 24, width: space['2'] },
});

export default Dashboard;
