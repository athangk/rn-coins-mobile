import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams
} from 'react-native-draggable-flatlist';
import { CoinData } from '../../models/ModelsInterfaces';
import ActionBtnList from '../actionButtons/ActionBtnList';
import { styles } from './Styles';

interface CoinsListProps {
  coins: CoinData[];
  actionTypeAdd: boolean;
  handleTouch: (coin: CoinData) => void;

  handleSetOrder?: (coins: CoinData[]) => void | null;
}

interface DraggableItemProps extends RenderItemParams<CoinData> {
  actionTypeAdd: boolean;
  handleTouch: (coin: CoinData) => void;
  isDraggable: boolean;
}

const DraggableItem = ({
  item,
  drag,
  isActive,
  handleTouch,
  isDraggable,
  actionTypeAdd
}: DraggableItemProps) => {
  const draggable = isDraggable ? { onLongPress: drag } : null;

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        isActive ? styles.actionBtnDragStart : styles.actionBtnDragStop
      ]}
      {...draggable}
    >
      <Text style={styles.cardText}>{item.name}</Text>
      <ActionBtnList
        handleTouch={() => handleTouch(item)}
        actionTypeAdd={actionTypeAdd}
      ></ActionBtnList>
    </TouchableOpacity>
  );
};

const CoinsList = ({
  coins,
  actionTypeAdd,
  handleTouch,
  handleSetOrder = undefined
}: CoinsListProps) => {
  const [data, setData] = useState(coins);
  useEffect(() => {
    if (coins.length > 0) {
      setData(coins);
    }
  }, [coins, coins.length]);

  const handleSetData = (coins: CoinData[]) => {
    if (handleSetOrder && coins) {
      handleSetOrder(coins);
    }

    setData(coins);
  };

  return (
    <View style={styles.listContainer}>
      {data.length > 0 && (
        <DraggableFlatList
          data={data}
          renderItem={(props) => (
            <DraggableItem
              {...props}
              handleTouch={handleTouch}
              actionTypeAdd={actionTypeAdd}
              isDraggable={!actionTypeAdd}
            />
          )}
          keyExtractor={(item) => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => handleSetData(data)}
        />
      )}
    </View>
  );
};

export default CoinsList;
