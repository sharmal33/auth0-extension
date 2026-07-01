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

const PhoneNativeRegister: React.FC<ScreenProps> = ({ route }) => {
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
    navigation.navigate(Route.PHONE_NATIVE_LOGIN, {});
  };

  useClearHeaderActions(navigation);

  return (
    <ASContainer
      disabledSafeArea={false}
      isScrollable={true}
      backgroundImageResizeMode={'contain'}
      name={'ASContainer-828911'}
      testID={'79d790ce-2519-4f8c-8695-c8e7606682a0'}
      style={sharedStyles.container}
      testId={'ASContainer-828911'}
    >
      <ASForm
        enableReinitialize={true}
        name={'ASForm-221137'}
        validationSchema={Yup.object().shape({})}
        initialValues={{ phone: '', code: '' }}
        innerRef={formikRef}
        testId={'ASForm-221137'}
      >
        {(formikProps: FormikProps<FormValues>) => {
          const { values } = formikProps;
          return (
            <AppColumn
              widgetId={'ASColumn-801938'}
              style={sharedStyles.column2}
            >
              <AppColumn
                widgetId={'ASColumn-464032'}
                style={sharedStyles.column}
              >
                <AppText
                  widgetId={'ASText-928901'}
                  style={[text.label.medium, sharedStyles.text6]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeRegister.ASText_928901.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeRegister.ASText_928901.label}
                </AppText>
                <AppText
                  widgetId={'ASText-338828'}
                  style={[text.label.medium, sharedStyles.text4]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeRegister.ASText_338828.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeRegister.ASText_338828.label}
                </AppText>
                <AppText
                  widgetId={'ASText-574475'}
                  style={[text.label.medium, sharedStyles.text3]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeRegister.ASText_574475.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeRegister.ASText_574475.label}
                </AppText>
              </AppColumn>
              <AppColumn
                widgetId={'ASColumn-338308'}
                style={sharedStyles.column5}
              >
                <AppText
                  widgetId={'ASText-463925'}
                  style={[text.label.medium, sharedStyles.text2]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeRegister.ASText_463925.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeRegister.ASText_463925.label}
                </AppText>
                <AppTextField
                  widgetId={'phone'}
                  style={sharedStyles.code}
                  label={STRINGS.PhoneNativeRegister.phone.label}
                  accessibilityLabel={
                    STRINGS.PhoneNativeRegister.phone.accessibilityLabel
                  }
                  placeholder={STRINGS.PhoneNativeRegister.phone.placeholder}
                />
              </AppColumn>
              <AppButton
                widgetId={'ASButton-490184'}
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
                label={STRINGS.PhoneNativeRegister.ASButton_490184.label}
              >
                <AppText
                  widgetId={'ASText-693993'}
                  style={[text.label.medium, sharedStyles.text]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeRegister.ASText_693993.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeRegister.ASText_693993.label}
                </AppText>
              </AppButton>
              <AppColumn
                widgetId={'ASColumn-118981'}
                style={sharedStyles.column5}
              >
                <AppText
                  widgetId={'ASText-223834'}
                  style={[text.label.medium, sharedStyles.text2]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeRegister.ASText_223834.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeRegister.ASText_223834.label}
                </AppText>
                <AppTextField
                  widgetId={'code'}
                  style={sharedStyles.code}
                  accessibilityLabel={
                    STRINGS.PhoneNativeRegister.code.accessibilityLabel
                  }
                  label={STRINGS.PhoneNativeRegister.code.label}
                  placeholder={STRINGS.PhoneNativeRegister.code.placeholder}
                />
              </AppColumn>
              <AppButton
                widgetId={'ASButton-751846'}
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
                label={STRINGS.PhoneNativeRegister.ASButton_751846.label}
              >
                <AppText
                  widgetId={'ASText-236971'}
                  style={[text.label.medium, sharedStyles.text5]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeRegister.ASText_236971.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeRegister.ASText_236971.label}
                </AppText>
              </AppButton>
              <AppButton
                widgetId={'ASButton-958851'}
                onPress={() => {
                  onPressButtonASButton3({});
                }}
                style={sharedStyles.button2}
                label={STRINGS.PhoneNativeRegister.ASButton_958851.label}
              >
                <AppText
                  widgetId={'ASText-215378'}
                  style={[text.label.medium, sharedStyles.text]}
                  accessibilityLabel={
                    STRINGS.PhoneNativeRegister.ASText_215378.accessibilityLabel
                  }
                >
                  {STRINGS.PhoneNativeRegister.ASText_215378.label}
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

export default PhoneNativeRegister;
