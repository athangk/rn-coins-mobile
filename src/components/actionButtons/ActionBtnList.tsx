import React from 'react';
import { IconButton } from 'react-native-paper';
import { useAppTheme } from '../../theme/theme';

interface BtnProps {
  actionTypeAdd: boolean;
  handleTouch: () => void;
}

const ActionBtnList = ({ actionTypeAdd, handleTouch }: BtnProps) => {
  const {
    colors: { darkOrange, mainRed, mainWhite }
  } = useAppTheme();
  return (
    <IconButton
      icon={actionTypeAdd ? 'plus-circle-outline' : 'minus-circle-outline'}
      mode="contained"
      iconColor={mainWhite}
      onPress={handleTouch}
      containerColor={actionTypeAdd ? darkOrange : mainRed}
    ></IconButton>
  );
};

export default ActionBtnList;
