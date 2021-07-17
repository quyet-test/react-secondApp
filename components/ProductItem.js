import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import DefaultText from './DefaultText';

const ProductItem = props => {
  return (
    <View style={styles.ProductItem}>
      <TouchableOpacity onPress={props.onSelectProduct}>
        <View>
          <View style={{ ...styles.productRow, ...styles.productHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.productRow, ...styles.productDetail }}>
            <DefaultText>{props.position}</DefaultText>
            <DefaultText>{props.weight.toUpperCase()}</DefaultText>
            <DefaultText>{props.long.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductItem: {
    height: 200,
    width: '95%',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: '2.5%'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  productRow: {
    flexDirection: 'row'
  },
  productHeader: {
    height: '85%'
  },
  productDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});

export default ProductItem;
