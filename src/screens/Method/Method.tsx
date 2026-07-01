import React from 'react';
import { AppButton, AppColumn, AppText } from '@/components/shared';
import { useNavigation } from '@react-navigation/native';

import { space, text } from '@/assets';

import { ASContainer, ASRow } from '@/components';

import { Platform, StyleSheet } from 'react-native';
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

const Method: React.FC<ScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const onPressButtonnativeCard = async () => {
    navigation.navigate(Route.PHONE_NATIVE_LOGIN, {});
  };

  const onPressButtonuniversalCard = async () => {
    navigation.navigate(Route.PHONE, {});
  };

  useClearHeaderActions(navigation);

  return (
    <ASContainer
      disabledSafeArea={false}
      isScrollable={true}
      backgroundImageResizeMode={'contain'}
      name={'ASContainer-696857'}
      testID={'b97dd64d-f627-4ee9-9431-12dd8d4e606b'}
      style={sharedStyles.container}
      testId={'ASContainer-696857'}
    >
      <AppColumn widgetId={'ASColumn-540290'} style={sharedStyles.column3}>
        <AppColumn widgetId={'ASColumn-763486'} style={sharedStyles.column}>
          <AppText
            widgetId={'ASText-686126'}
            style={[text.label.medium, sharedStyles.text6]}
            accessibilityLabel={STRINGS.Method.ASText_686126.accessibilityLabel}
          >
            {STRINGS.Method.ASText_686126.label}
          </AppText>
          <AppText
            widgetId={'ASText-306339'}
            style={[text.label.medium, sharedStyles.text4]}
            accessibilityLabel={STRINGS.Method.ASText_306339.accessibilityLabel}
          >
            {STRINGS.Method.ASText_306339.label}
          </AppText>
          <AppText
            widgetId={'ASText-839487'}
            style={[text.label.medium, sharedStyles.text3]}
            accessibilityLabel={STRINGS.Method.ASText_839487.accessibilityLabel}
          >
            {STRINGS.Method.ASText_839487.label}
          </AppText>
        </AppColumn>
        <AppButton
          widgetId={'nativeCard'}
          onPress={() => {
            onPressButtonnativeCard({});
          }}
          style={styles.nativeCardStyle}
          label={STRINGS.Method.nativeCard.label}
        >
          <ASRow
            spacing={space['2']}
            backgroundImageResizeMode={'contain'}
            scrollable={false}
            scrollDirection={'horizontal'}
            name={'ASRow-170470'}
            style={styles.aSRowStyle}
            testId={'ASRow-170470'}
          >
            <AppText
              widgetId={'ASText-893190'}
              style={[text.label.medium, styles.aSTextStyle4]}
              accessibilityLabel={
                STRINGS.Method.ASText_893190.accessibilityLabel
              }
            >
              {STRINGS.Method.ASText_893190.label}
            </AppText>
            <AppColumn
              widgetId={'ASColumn-885678'}
              style={sharedStyles.column4}
            >
              <AppText
                widgetId={'ASText-931006'}
                style={[text.label.medium, styles.aSTextStyle5]}
                accessibilityLabel={
                  STRINGS.Method.ASText_931006.accessibilityLabel
                }
              >
                {STRINGS.Method.ASText_931006.label}
              </AppText>
              <AppText
                widgetId={'ASText-256189'}
                style={[text.label.medium, styles.aSTextStyle6]}
                accessibilityLabel={
                  STRINGS.Method.ASText_256189.accessibilityLabel
                }
              >
                {STRINGS.Method.ASText_256189.label}
              </AppText>
            </AppColumn>
          </ASRow>
        </AppButton>
        <AppButton
          widgetId={'universalCard'}
          onPress={() => {
            onPressButtonuniversalCard({});
          }}
          style={styles.universalCardStyle}
          label={STRINGS.Method.universalCard.label}
        >
          <ASRow
            spacing={space['2']}
            backgroundImageResizeMode={'contain'}
            scrollable={false}
            scrollDirection={'horizontal'}
            name={'ASRow-571636'}
            style={styles.aSRowStyle}
            testId={'ASRow-571636'}
          >
            <AppText
              widgetId={'ASText-719482'}
              style={[text.label.medium, styles.aSTextStyle7]}
              accessibilityLabel={
                STRINGS.Method.ASText_719482.accessibilityLabel
              }
            >
              {STRINGS.Method.ASText_719482.label}
            </AppText>
            <AppColumn
              widgetId={'ASColumn-263295'}
              style={sharedStyles.column4}
            >
              <AppText
                widgetId={'ASText-886550'}
                style={[text.label.medium, styles.aSTextStyle8]}
                accessibilityLabel={
                  STRINGS.Method.ASText_886550.accessibilityLabel
                }
              >
                {STRINGS.Method.ASText_886550.label}
              </AppText>
              <AppText
                widgetId={'ASText-565105'}
                style={[text.label.medium, styles.aSTextStyle9]}
                accessibilityLabel={
                  STRINGS.Method.ASText_565105.accessibilityLabel
                }
              >
                {STRINGS.Method.ASText_565105.label}
              </AppText>
            </AppColumn>
          </ASRow>
        </AppButton>
      </AppColumn>
    </ASContainer>
  );
};

const styles = StyleSheet.create({
  nativeCardStyle: {
    padding: 18,
    alignItems: 'flex-start',
    width: '100%',
    borderRadius: 14,
    height: 'auto',
    borderWidth: 1,
    backgroundColor: '#1f2937',
    borderColor: '#374151',
    marginBottom: 14,
    paddingBottom: space['2'],
    paddingLeft: space['3'],
    paddingTop: space['2'],
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: space['3'],
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  aSRowStyle: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    overflow: 'visible',
    flexShrink: 1,
  },
  aSTextStyle4: {
    marginRight: 16,
    fontSize: 30,
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSTextStyle5: {
    fontSize: 17,
    fontWeight: 700,
    color: '#f9fafb',
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSTextStyle6: {
    color: '#9ca3af',
    marginTop: 4,
    fontSize: 13,
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  universalCardStyle: {
    marginBottom: 14,
    backgroundColor: '#1f2937',
    width: '100%',
    height: 'auto',
    borderColor: '#374151',
    padding: 18,
    alignItems: 'flex-start',
    borderRadius: 14,
    borderWidth: 1,
    paddingBottom: space['2'],
    paddingLeft: space['3'],
    paddingTop: space['2'],
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: space['3'],
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
  aSTextStyle7: {
    fontSize: 30,
    marginRight: 16,
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSTextStyle8: {
    fontWeight: 700,
    fontSize: 17,
    color: '#f9fafb',
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  aSTextStyle9: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 4,
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
});

export default Method;
