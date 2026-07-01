import React, { useState, useRef } from 'react';
import { AppButton, AppTextField } from '@/components/shared';

import { useNavigation } from '@react-navigation/native';

import { color, text, space, radius, border, component } from '@/assets';

import { ASContainer, ASForm, ASText } from '@/components';

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import { FormikProps } from 'formik';
import * as Yup from 'yup';
import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';
import { executeCustomFunction } from '@/extensions';

import { STRINGS } from '@/strings';

type FormValues = {
  phone?: string;
  code?: string;
};

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const PhoneAuth: React.FC<ScreenProps> = ({ route }) => {
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const navigation = useNavigation();

  const [extAuth0SendPhoneOtp, setExtAuth0SendPhoneOtp] =
    useState<any>(undefined);
  const [extAuth0VerifyPhoneOtp, setExtAuth0VerifyPhoneOtp] =
    useState<any>(undefined);
  const onPressSendcodeASButton = async (values: FormValues) => {
    const __out = await executeCustomFunction('Auth0Functions.sendPhoneOtp', {
      phone: values?.phone,
    });
    setExtAuth0SendPhoneOtp(__out);
  };
  const onPressVerifyASButton = async (values: FormValues) => {
    const __out = await executeCustomFunction('Auth0Functions.verifyPhoneOtp', {
      phone: values?.phone,
      code: values?.code,
    });
    setExtAuth0VerifyPhoneOtp(__out);
    switch (__out?.status) {
      case 'authenticated': {
        navigation.navigate(Route.DASHBOARD, {
          ext_auth0_verifyPhoneOtp: __out,
        });
        break;
      }
      case 'failed': {
        navigation.navigate(Route.LOGIN_FAILED, {
          ext_auth0_verifyPhoneOtp: __out,
        });
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
      name={'ASContainer-157487'}
      testID={'e8936db3-c526-496e-8f41-26d0f96c40c1'}
      style={sharedStyles.container}
      testId={'ASContainer-157487'}
    >
      <ASForm
        enableReinitialize={true}
        name={'ASForm-788350'}
        validationSchema={Yup.object().shape({})}
        initialValues={{ phone: '', code: '' }}
        innerRef={formikRef}
        testId={'ASForm-788350'}
      >
        {(formikProps: FormikProps<FormValues>) => {
          const { values } = formikProps;
          return (
            <>
              <ASText
                labelType={'string'}
                name={'ASText-544217'}
                dragStyle={sharedStyles.textDrag}
                style={[text.label.medium, sharedStyles.dashEmail]}
                accessibilityLabel={
                  STRINGS.PhoneAuth.ASText_544217.accessibilityLabel
                }
                testId={'ASText-544217'}
              >
                {STRINGS.PhoneAuth.ASText_544217.label}
              </ASText>
              <AppTextField
                widgetId={'phone'}
                labelTextStyle={[text.label.medium, styles.phoneLabelTextStyle]}
                prefixIconStyles={styles.phonePrefixIconStyles}
                suffixIconStyles={styles.phoneSuffixIconStyles}
                style={styles.phoneStyle}
                inputTextStyle={[text.body.medium, styles.phoneInputTextStyle]}
                errorMessageTextStyle={[
                  text.label.small,
                  styles.phoneErrorMessageTextStyle,
                ]}
                prefixTextStyle={[
                  text.body.medium,
                  styles.phonePrefixTextStyle,
                ]}
                contentContainerStyle={styles.phoneContentContainerStyle}
                accessibilityLabel={STRINGS.PhoneAuth.phone.accessibilityLabel}
                label={STRINGS.PhoneAuth.phone.label}
                placeholder={STRINGS.PhoneAuth.phone.placeholder}
              />
              <AppButton
                widgetId={'ASButton-664267'}
                onPress={async () => {
                  const formik = formikRef.current;
                  if (formik) {
                    if (formik.isValid && formik.dirty) {
                      onPressSendcodeASButton(values);
                    } else {
                      Object.keys(formik.values).forEach((field) => {
                        formik.setFieldTouched(field, true);
                      });
                    }
                  }
                }}
                style={sharedStyles.button}
                label={STRINGS.PhoneAuth.ASButton_664267.label}
                accessibilityLabel={
                  STRINGS.PhoneAuth.ASButton_664267.accessibilityLabel
                }
              />
              <AppTextField
                widgetId={'code'}
                labelTextStyle={[text.label.medium, styles.codeLabelTextStyle]}
                prefixIconStyles={styles.codePrefixIconStyles}
                suffixIconStyles={styles.codeSuffixIconStyles}
                style={styles.codeStyle}
                inputTextStyle={[text.body.medium, styles.codeInputTextStyle]}
                errorMessageTextStyle={[
                  text.label.small,
                  styles.codeErrorMessageTextStyle,
                ]}
                prefixTextStyle={[text.body.medium, styles.codePrefixTextStyle]}
                contentContainerStyle={styles.codeContentContainerStyle}
                label={STRINGS.PhoneAuth.code.label}
                accessibilityLabel={STRINGS.PhoneAuth.code.accessibilityLabel}
                placeholder={STRINGS.PhoneAuth.code.placeholder}
              />
              <AppButton
                widgetId={'ASButton-413167'}
                onPress={async () => {
                  const formik = formikRef.current;
                  if (formik) {
                    if (formik.isValid && formik.dirty) {
                      onPressVerifyASButton(values);
                    } else {
                      Object.keys(formik.values).forEach((field) => {
                        formik.setFieldTouched(field, true);
                      });
                    }
                  }
                }}
                style={sharedStyles.button}
                accessibilityLabel={
                  STRINGS.PhoneAuth.ASButton_413167.accessibilityLabel
                }
                label={STRINGS.PhoneAuth.ASButton_413167.label}
              />
            </>
          );
        }}
      </ASForm>
    </ASContainer>
  );
};

const styles = StyleSheet.create({
  phoneLabelTextStyle: {
    maxWidth: '97%',
    paddingRight: 0,
    zIndex: 1,
    paddingLeft: 0,
    position: 'absolute',
  },
  phonePrefixIconStyles: { color: color.text.primary, iconSize: 22 },
  phoneSuffixIconStyles: { iconSize: 22, color: color.text.primary },
  phoneStyle: {
    height: component.input.height,
    borderColor: color.border.default,
    borderRadius: radius.sm,
    borderWidth: border.default,
    paddingLeft: space['3'],
    width: '100%',
    backgroundColor: color.surface.default,
    paddingRight: space['3'],
  },
  phoneInputTextStyle: {
    height: '100%',
    color: color.text.primary,
    textAlign: 'left',
  },
  phoneErrorMessageTextStyle: { color: color.status.danger },
  phonePrefixTextStyle: {},
  phoneContentContainerStyle: {
    flexDirection: 'row',
    gap: space['2'],
    height: '100%',
    alignItems: 'center',
  },
  codeLabelTextStyle: {
    maxWidth: '97%',
    paddingRight: 0,
    zIndex: 1,
    paddingLeft: 0,
    position: 'absolute',
  },
  codePrefixIconStyles: { color: color.text.primary, iconSize: 22 },
  codeSuffixIconStyles: { iconSize: 22, color: color.text.primary },
  codeStyle: {
    height: component.input.height,
    borderColor: color.border.default,
    borderRadius: radius.sm,
    borderWidth: border.default,
    paddingLeft: space['3'],
    width: '100%',
    backgroundColor: color.surface.default,
    paddingRight: space['3'],
  },
  codeInputTextStyle: {
    height: '100%',
    color: color.text.primary,
    textAlign: 'left',
  },
  codeErrorMessageTextStyle: { color: color.status.danger },
  codePrefixTextStyle: {},
  codeContentContainerStyle: {
    flexDirection: 'row',
    gap: space['2'],
    height: '100%',
    alignItems: 'center',
  },
});

export default PhoneAuth;
