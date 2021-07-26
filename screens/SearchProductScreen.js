import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, Input, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import CustomHeaderButton from '../components/HeaderButon'
import Colors from '../constants/colors';
import { POSITIONS, PRODUCTS, PRODUCT_ITEMS } from '../data/dummy-data';
import language from '../constants/language';


const languages = language['vn'];

import { applyFilter } from '../store/actions/ProductItems';

const SearchDropdown = props => {
    const translate = lable => languages[lable] || lable;
    return <View style={styles.dropdownsRow}>
        <Text style={styles.lableText}>{props.label}</Text>
        <SelectDropdown
            defaultButtonText={props.label}
            data={props.selectableData}
            onSelect={props.onSelect}
            buttonTextAfterSelection={(selectedItem, index) => {
                return translate(selectedItem['title']);
            }}
            rowTextForSelection={(item, index) => {
                return translate(item['title']);
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={() => {
                return (
                    <FontAwesome name="chevron-down" color={"#444"} size={18} />
                );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
        />
    </View>
}


const searchProducts = (searchInfo, products) => {
    console.log(searchInfo);

    if (!Array.isArray(products)) {

        return [];
    }

    const foundProducts = products.filter(product => {
        if (searchInfo.productId != '' && product.id != searchInfo.productId) {
            return false;
        }
        if (searchInfo.positionId != 'All' && product.positionId != searchInfo.positionId) {
            return false;
        }
        if (searchInfo.productType != 'All' && product.productId != searchInfo.productType) {
            return false;
        }

        return true;
    });

    console.log(foundProducts.length);
    return foundProducts;
}

const SearchProductScreen = props => {
    const { navigation } = props;
    const displayedProducts = useSelector(state => state.productItems.items);

    const [productId, setProductId] = useState('');
    const [productType, setProductType] = useState('All');
    const [zone, setZone] = useState('All');
    const [scanning, setScanning] = useState(false);

    const selectableProductTypes = [{ id: 'All', title: 'All' }, ...PRODUCTS]
    const positions = POSITIONS.map(position => { return { id: position.id, title: `${position.zone} - ${position.column}` } })
    const selectablePositions = [{ id: 'All', title: 'All' }, ...positions]

    const dispatch = useDispatch();

    const savedFilters = useCallback(() => {
        const searchInfo = {
            positionId: zone,
            productType: productType,
            productId: productId,
        }
        console.log(searchInfo)
        const foundProducts = searchProducts(searchInfo, displayedProducts)
        navigation.navigate({
            routeName: 'FoundProducts',
            params: {
                foundProducts
            }
        });
    }, [searchProducts, productId, productType, zone]);

    useEffect(() => {
        navigation.setParams({ save: savedFilters });
    }, [savedFilters]);

    const cancelHandler = () => {

    }

    const scanSearchingProductHandler = () => {
        setScanning(true);
        props.navigation.navigate({
            routeName: 'ScanBarcode',
            params: {
                originScreen: 'Search',
            }
        })
    }
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available filters / Restrictions</Text>
            <SearchDropdown
                label='Product Type'
                isTranslated={true}
                index={productType}
                selectableData={selectableProductTypes}
                onSelect={(item, index) => { console.log(index), setProductType(item.id) }}
            />
            <SearchDropdown
                label='Position'
                titleLabel='title'
                index={zone}
                selectableData={selectablePositions}
                onSelect={(item, index) => { setZone(item.id) }}
            />
            <Text>{languages['Product Code']}</Text>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title={languages['Cancel']} onPress={cancelHandler} color={Colors.accent} />
                </View>
                <View style={styles.button}>
                    <Button title={languages['OK']} onPress={navigation.getParam('save')} color={Colors.primary} />
                </View>
                <View style={styles.button}>
                    <Button title={languages['Scan']} onPress={scanSearchingProductHandler} color={Colors.primary} />
                </View>
            </View>
        </View>
    );
};

// SearchProductScreen.navigationOptions = (navData) => {

//     return {
//         headerTitle: 'Filter products',
//         headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//             <Item
//                 title='Menu'
//                 iconName='ios-menu'
//                 onPress={() => { navData.navigation.openDrawer() }}
//             />
//         </HeaderButtons>,
//         headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//             <Item
//                 title='Save'
//                 iconName='ios-save'
//                 onPress={navData.navigation.getParam('save')}
//             />
//         </HeaderButtons>
//     }
// };

SearchProductScreen.navigationOptions = (navData) => {

    return {
        headerTitle: languages['Search Product'],
    }
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        height: 400
    },
    lableText: {
        height: 50,
        width: '30%',
        alignItems: 'center',
        textAlign: 'left'
    },
    dropdownsRow: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: "5%",
    },

    dropdown1BtnStyle: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#444",
    },
    dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdown1DropdownStyle: { backgroundColor: "#EFEFEF", width: '80%' },
    dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
    button: {
        width: 75,
        fontSize: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginTop: 10,
    },
    input: {
        textAlign: 'center',
        width: 50,
    },
});

export default SearchProductScreen;
