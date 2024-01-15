import React, { useState,useEffect } from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    Modal,
    View,
    FlatList,
} from 'react-native';
import { calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import typeIcon from '../assets/icons/type.png';
import Categories from '../constants/Categories';

const TypeSelector = ({ setType,type }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const toggleTypeSelection = (item) => {
        const isSelected = selectedTypes.includes(item);

        if (isSelected) {
            setSelectedTypes((prevSelectedTypes) =>
                prevSelectedTypes.filter((type) => type !== item)
            );
        } else {
            setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, item]);
        }
    };

    useEffect(() => {
        // Initialize selectedTypes with the provided type prop
        if (type) {
            setSelectedTypes(Array.isArray(type) ? type : [type]);
        }
    }, [type]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                padding: 10,
                flexDirection: 'row',
                gap: calcWidth(8),
                alignItems: 'center',
                backgroundColor: selectedTypes.includes(item)
                    ? 'rgba(52, 47, 79, 0.3)' // Highlight selected items
                    : 'transparent',
            }}
            onPress={() => toggleTypeSelection(item)}
        >
            <Text
                style={{
                    fontSize: getFontSizeByWindowWidth(15),
                    color: COLOR.TEXT,
                }}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    const applySelectionAndCloseModal = () => {
        setType(selectedTypes);
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity
                style={{
                    backgroundColor: '#342F4F',
                    padding: 10,
                    flexDirection: 'row',
                    gap: calcWidth(8),
                    alignItems: 'center',
                }}
                onPress={() => setModalVisible(true)}
            >
                <Text
                    style={{
                        fontSize: getFontSizeByWindowWidth(15),
                        color: COLOR.TEXT,
                    }}
                >
                    Type
                </Text>
                <Image
                    style={{
                        height: calcWidth(3),
                        width: calcWidth(5),
                    }}
                    source={typeIcon}
                />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View
                        style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 16,
                        }}
                    >
                        <FlatList
                            data={Categories.map((category) => category.name)}
                            renderItem={renderItem}
                            keyExtractor={(item) => item}
                        />
                        <TouchableOpacity
                            onPress={applySelectionAndCloseModal}
                            style={{
                                marginTop: 16,
                                padding: 10,
                                backgroundColor: '#342F4F',
                                alignItems: 'center',
                                borderRadius: 8,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: getFontSizeByWindowWidth(15),
                                    color: COLOR.TEXT,
                                }}
                            >
                                Apply Selection
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                marginTop: 8,
                                padding: 10,
                                backgroundColor: '#342F4F',
                                alignItems: 'center',
                                borderRadius: 8,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: getFontSizeByWindowWidth(15),
                                    color: COLOR.TEXT,
                                }}
                            >
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default TypeSelector;
