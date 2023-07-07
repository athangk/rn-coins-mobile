import React, { useState } from 'react';
import { Text, View } from 'react-native';

import {
  fetchAuthUser,
  selectError,
  selectLoading
} from '../../store/reducers/AuthSliceReducer';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { FormSubmitData } from '../../models/ModelsInterfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useAppTheme } from '../../theme/theme';
import { handleCryptoPass } from '../../utilities/utils';
import { styles } from './Styles';

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSubmitData>();
  const {
    colors: { darkOrange, mainWhite, mainYellow }
  } = useAppTheme();
  const [checkBoxRemember, setCheckBoxRemember] = useState(false);

  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(selectError);
  const isLoading = useAppSelector(selectLoading);

  const onSubmit: SubmitHandler<FormSubmitData> = (data) =>
    handleSubmitUser(data);

  const handleSubmitUser = async (data: FormSubmitData) => {
    const hashedPassword = await handleCryptoPass(data.password);
    const username = data.username;
    dispatch(
      fetchAuthUser({
        username: username,
        password: hashedPassword,
        rememberMe: checkBoxRemember
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainLabel}>Login</Text>
      <View style={styles.borderContainer}>
        <View style={styles.innerBorderContainer}>
          <Controller
            control={control}
            rules={{
              maxLength: 20,
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  label="Username"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  mode="outlined"
                />
              </>
            )}
            name="username"
          />
          {errors.username && (
            <Text style={styles.errorLabels}>
              {errors.username.type === 'required'
                ? 'This field is required '
                : ' max legnth surpass'}
            </Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            rules={{
              maxLength: 20,
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Password"
                  mode="outlined"
                  secureTextEntry={true}
                />
              </>
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.errorLabels}>
              {errors.password.type === 'required'
                ? 'This field is required '
                : ' max legnth surpass'}
            </Text>
          )}
          <View style={styles.checkBoxContainer}>
            <BouncyCheckbox
              size={25}
              text="Remember me"
              textStyle={styles.checkBoxLabel}
              fillColor={darkOrange}
              unfillColor="white"
              iconStyle={{ borderColor: mainYellow }}
              innerIconStyle={{ borderWidth: 2 }}
              isChecked={checkBoxRemember}
              onPress={() => setCheckBoxRemember(!checkBoxRemember)}
            />
            <Text style={styles.optionalLabel}>Optional</Text>
          </View>
        </View>
        <View style={{ flexGrow: 1 }}>
          {isLoading && (
            <ActivityIndicator animating={true} color={darkOrange} />
          )}
          {errorMessage && (
            <Text style={[styles.errorLabels, styles.errorTextCenter]}>
              Wrong credentials
            </Text>
          )}
        </View>
      </View>
      <View style={styles.submitContainer}>
        <Button
          icon="login"
          mode="contained"
          buttonColor={darkOrange}
          onPress={handleSubmit(onSubmit)}
          textColor={mainWhite}
        >
          Log in
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
