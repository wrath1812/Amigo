import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    Modal,
    View,
    FlatList,
    Pressable,
} from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import typeIcon from '../assets/icons/type.png';
import Categories from '../constants/Categories';
import { AntDesign } from '@expo/vector-icons';
import CheckBox from '../components/CheckBox';
import { getCategoryIcon } from '../constants/Categories';
import { useExpense } from '../stores/expense';

const TypeSelector = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const {loading,setType,fetchExpense,type}=useExpense();
    useEffect(() => {
        // Initialize selectedTypes with the provided type prop
        if (type) {
            setSelectedTypes(Array.isArray(type) ? type : [type]);
        }
        return ()=>setSelectedTypes([]);
    }, [type]);

    if (loading)
        return (
            <View
                style={{
                    backgroundColor: '#342F4F',
                    padding: 10,
                    flexDirection: 'row',
                    gap: calcWidth(4),
                    alignItems: 'center',
                    borderRadius: 5,
                }}
            >
                <Text
                    style={{
                        fontSize: getFontSizeByWindowWidth(15),
                        color: COLOR.TEXT,
                        opacity: 0, // Hide the text
                    }}
                >
                    Type
                </Text>
                <Image
                    style={{
                        height: calcWidth(3),
                        width: calcWidth(5),
                        opacity: 0, // Hide the icon
                    }}
                    source={typeIcon}
                />
            </View>
        );

    const toggleTypeSelection = (item) => {
        const isSelected = selectedTypes.includes(item);

        if (isSelected) {
            setSelectedTypes((prevSelectedTypes) =>
                prevSelectedTypes.filter((type) => type !== item),
            );
        } else {
            setSelectedTypes((prevSelectedTypes) => [
                ...prevSelectedTypes,
                item,
            ]);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                paddingVertical: calcHeight(2),
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            onPress={() => toggleTypeSelection(item.name)}
        >
            <View
                style={{
                    flexDirection: 'row',
                    gap: calcWidth(8),
                }}
            >
                {item.icon}
                <Text
                    style={{
                        fontSize: getFontSizeByWindowWidth(12),
                        color: COLOR.TEXT,
                    }}
                >
                    {item.name}
                </Text>
            </View>
            <CheckBox selected={selectedTypes.includes(item.name)} />
        </TouchableOpacity>
    );

    const applySelectionAndCloseModal = () => {
        setType(selectedTypes);
        fetchExpense();
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity
                style={{
                    backgroundColor: '#342F4F',
                    padding: 10,
                    flexDirection: 'row',
                    gap: calcWidth(4),
                    alignItems: 'center',
                    borderRadius: 5,
                }}
                onPress={() => setModalVisible(true)}
            >
                {selectedTypes.length == 0 ? (
                    <>
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
                    </>
                ) : (
                    <>
                        {getCategoryIcon(selectedTypes[0])}
                        <Text
                            style={{
                                fontSize: getFontSizeByWindowWidth(15),
                                color: COLOR.TEXT,
                            }}
                        >
                            {selectedTypes[0]}
                        </Text>
                        {selectedTypes.length > 1 && (
                            <View
                                style={{
                                    backgroundColor: COLOR.BUTTON,
                                    padding: calcWidth(1),
                                    borderRadius: calcWidth(5),
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLOR.TEXT,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    +{selectedTypes.length - 1}
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <Pressable
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: calcHeight(4),
                            backgroundColor: COLOR.APP_BACKGROUND,
                            paddingBottom: calcHeight(7),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: calcHeight(2),
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: getFontSizeByWindowWidth(15),
                                    fontWeight: 'bold',
                                    color: COLOR.TEXT,
                                }}
                            >
                                Type
                            </Text>
                            <TouchableOpacity
                                onPress={applySelectionAndCloseModal}
                            >
                                <Text
                                    style={{
                                        fontSize: getFontSizeByWindowWidth(15),
                                        fontWeight: 'bold',
                                        color: COLOR.BUTTON,
                                    }}
                                >
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={Categories}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.name}
                        />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

export default TypeSelector;
