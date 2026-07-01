import React, { useState, useRef } from 'react';
import {
  AppButton,
  AppColumn,
  AppText,
  AppTextField,
} from '@/components/shared';

import { useNavigation } from '@react-navigation/native';

import { text } from '@/assets';

import { ASContainer, ASForm } from '@/components';

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

const PhoneNativeLogin: React.FC<ScreenProps> = ({ route }) => {
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const navigation = useNavigation();

  const [extAuth0SendPhoneOtp, setExtAuth0SendPhoneOtp] =
    useState<any>(undefined);
  const [extAuth0VerifyPhoneOtp, setExtAuth0VerifyPhoneOtp] =
    useState<any>(undefined);
  const onPressButtonASButton = async (values: FormValues) => {
    const __out = await executeCustomFunction('Auth0Functions.sendPhoneOtp', {
      phone: values?.phone,
    });
    setExtAuth0SendPhoneOtp(__out);
  };
  const onPressButtonASButton2 = async (values: FormValues) => {
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
    }
  };

  const onPressButtonASButton3 = async () => {
    navigation.navigate(Route.PHONE_NATIVE_REGISTER, {});
  };

  useClearHeaderActions(navigation);

  return (
    <ASContainer
      disabledSafeArea={false}
      isScrollable={true}
      backgroundImageResizeMode={'contain'}
      name={'ASContainer-451042'}
      testID={'ed6ea8db-a313-459b-8746-99e72523aa66'}
      style={sharedStyles.container}
      testId={'ASContainer-451042'}
    >
      <ASForm
        enableReinitialize={true}
        name={'ASForm-115639'}
        validationSchema={Yup.object().shape({})}
        initialValues={{ phone: '', code: '' }}
        innerRef={formikRef}
        testId={'ASForm-115639'}
      >
        {(formikProps: FormikProps<FormValues>) => {
          const { values } = formikProps;
          return (
            <AppColumn
              widgetId={'ASColumn-940751'}
              style={sharedStyles.column2}
            >
              <AppColumn
                widgetId={'ASColumn-617065'}
                style={sharedStyles.column}
              >
                <AppText
                  widgetId={'ASText-432611'}
                  style={[text.label.medium, sharedStyles.text6]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeLogin.ASText_432611.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeLogin.ASText_432611.label}
                </AppText>
                <AppText
                  widgetId={'ASText-888217'}
                  style={[text.label.medium, sharedStyles.text4]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeLogin.ASText_888217.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeLogin.ASText_888217.label}
                </AppText>
                <AppText
                  widgetId={'ASText-308690'}
                  style={[text.label.medium, sharedStyles.text3]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeLogin.ASText_308690.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeLogin.ASText_308690.label}
                </AppText>
              </AppColumn>
              <AppColumn
                widgetId={'ASColumn-295113'}
                style={sharedStyles.column5}
              >
                <AppText
                  widgetId={'ASText-471724'}
                  style={[text.label.medium, sharedStyles.text2]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeLogin.ASText_471724.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeLogin.ASText_471724.label}
                </AppText>
                <AppTextField
                  widgetId={'phone'}
                  style={sharedStyles.code}
                  label={STRINGS.PhoneNativeLogin.phone.label}
                  accessibilityLabel={
                    STRINGS.PhoneNativeLogin.phone.accessibilityLabel
                  }
                  placeholder={STRINGS.PhoneNativeLogin.phone.placeholder}
                />
              </AppColumn>
              <AppButton
                widgetId={'ASButton-587521'}
                onPress={async () => {
                  const formik = formikRef.current;
                  if (formik) {
                    if (formik.isValid && formik.dirty) {
                      onPressButtonASButton(values);
                    } else {
                      Object.keys(formik.values).forEach((field) => {
                        formik.setFieldTouched(field, true);
                      });
                    }
                  }
                }}
                style={sharedStyles.button2}
                label={STRINGS.PhoneNativeLogin.ASButton_587521.label}
              >
                <AppText
                  widgetId={'ASText-106411'}
                  style={[text.label.medium, sharedStyles.text]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeLogin.ASText_106411.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeLogin.ASText_106411.label}
                </AppText>
              </AppButton>
              <AppColumn
                widgetId={'ASColumn-521404'}
                style={sharedStyles.column5}
              >
                <AppText
                  widgetId={'ASText-627731'}
                  style={[text.label.medium, sharedStyles.text2]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeLogin.ASText_627731.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeLogin.ASText_627731.label}
                </AppText>
                <AppTextField
                  widgetId={'code'}
                  style={sharedStyles.code}
                  accessibilityLabel={
                    STRINGS.PhoneNativeLogin.code.accessibilityLabel
                  }
                  label={STRINGS.PhoneNativeLogin.code.label}
                  placeholder={STRINGS.PhoneNativeLogin.code.placeholder}
                />
              </AppColumn>
              <AppButton
                widgetId={'ASButton-948173'}
                onPress={async () => {
                  const formik = formikRef.current;
                  if (formik) {
                    if (formik.isValid && formik.dirty) {
                      onPressButtonASButton2(values);
                    } else {
                      Object.keys(formik.values).forEach((field) => {
                        formik.setFieldTouched(field, true);
                      });
                    }
                  }
                }}
                style={sharedStyles.button}
                label={STRINGS.PhoneNativeLogin.ASButton_948173.label}
              >
                <AppText
                  widgetId={'ASText-706244'}
                  style={[text.label.medium, sharedStyles.text5]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeLogin.ASText_706244.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeLogin.ASText_706244.label}
                </AppText>
              </AppButton>
              <AppButton
                widgetId={'ASButton-689374'}
                onPress={() => {
                  onPressButtonASButton3({});
                }}
                style={sharedStyles.button2}
                label={STRINGS.PhoneNativeLogin.ASButton_689374.label}
              >
                <AppText
                  widgetId={'ASText-393244'}
                  style={[text.label.medium, sharedStyles.text]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeLogin.ASText_393244.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeLogin.ASText_393244.label}
                </AppText>
              </AppButton>
            </AppColumn>
          );
        }}
      </ASForm>
    </ASContainer>
  );
};

const styles = StyleSheet.create({});

export default PhoneNativeLogin;
