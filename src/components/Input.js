import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Input} from "react-native-elements";

const Spacer = ({val, setVal, style, constyle, placeholderTextColor}) => {
    return  <Input 
                value={String(val)}
                onChangeText={setVal}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="go"
                inputStyle={style}
                inputContainerStyle={constyle}
                placeholderTextColor={placeholderTextColor}
            />
}

const styles = StyleSheet.create({
})
   
export default Spacer;