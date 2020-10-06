import React from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker'
import RNPickerSelect from 'react-native-picker-select';

const CustomPicker = ({items, onChange, label}) => {
    
    return <RNPickerSelect 
                items={items}
                onValueChange={onChange}
                style={{ ...pickerSelectStyles }}
                useNativeAndroidPickerStyle={true}
                placeholder={{
                    label: label,
                    value: null,
                }}  
            /> 
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: '#0056d8',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        marginBottom: 10
    },
});

export default CustomPicker;