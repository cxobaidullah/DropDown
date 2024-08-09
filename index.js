import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet,
    Platform,
} from 'react-native'
import Color from '../style/Color'
import Style from '../style/Style'
import DropDown from '../assets/svg/drop-down.svg'

const TestDropDown = ({
    data,
    placeholder,
    onSelect,
    label,
    error,
    validation,
    value,
    defaultValue,
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const [search, setSearch] = useState('')

    const toggleDropdown = () => {
        setIsVisible(!isVisible)
    }

    const handleSelect = (item) => {
        setSelectedValue(item.label)
        setIsVisible(false)
        onSelect(item)
    }

    const filteredData = data.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <View style={[styles.container]}>
            <Text style={[Style.label14, Style.fontMedium, Style.colorBlack]}>
                {label}
            </Text>
            <Spacing />
            <TouchableOpacity
                onPress={toggleDropdown}
                style={[
                    styles.dropdownButton,
                    validation && value.length == 0 && styles.errorBorder,
                ]}>
                <Text
                    style={[
                        Style.fontSemiBold,
                        Style.label14,
                        value?.length > 0
                            ? Style.colorBlack
                            : Style.colorTextDisabled,
                    ]}>
                    {selectedValue || defaultValue}
                </Text>
                <DropDown />
            </TouchableOpacity>
            {validation && value.length == 0 && (
                <>
                    <Spacing />
                    <Text
                        style={[
                            Style.subTitle,
                            Style.fontSemiBold,
                            Style.colorError,
                        ]}>
                        {error}
                    </Text>
                </>
            )}
            {isVisible && (
                <View style={styles.dropdown}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={placeholder}
                        value={search}
                        onChangeText={setSearch}
                        placeholderStyle={[
                            Style.fontSemiBold,

                            value?.length > 0
                                ? Style.colorBlack
                                : Style.colorTextDisabled,
                        ]}
                    />
                    <FlatList
                    nestedScrollEnabled={true}
                        data={filteredData}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                style={styles.item}>
                                <Text
                                    style={[
                                        styles.itemText,
                                        Style.fontSemiBold,
                                        Style.label14,
                                        Style.colorBlack,
                                    ]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.value}
                    />
                </View>
            )}
        </View>
    )
}

export default TestDropDown

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    dropdownButton: {
        padding: 10,
        backgroundColor: Color.inputBackground,
        borderRadius: 10,
        height: 38,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownText: {
        fontSize: 16,
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 10,
        // right: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 8,
        maxHeight: 250, // Adjust as needed
        zIndex: 6,
        shadowColor: Color.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        elevation:5,
        width: '95%',
    },
    searchInput: {
        borderColor: Color.tertiaryGray,
        borderWidth: 1,
        // borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 8,
        height: Platform.OS == 'android' ? 38 : 40,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    itemText: {
        fontSize: 16,
    },
    errorBorder: {
        borderBottomWidth: 2.5,
        borderBottomColor: Color.errorTextColor,
    },
})
