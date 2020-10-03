import React, { useState} from 'react';
import { View, StyleSheet} from 'react-native';
import {Button} from "react-native-elements";

import {Picker} from '@react-native-community/picker'
import RNPickerSelect from 'react-native-picker-select';


const EvaluationScreenCommon = ({filterSessions}) => {
    const [day, setDay] = useState();
    const [track, setTrack] = useState();

    return <View>  
                <RNPickerSelect useNativeAndroidPickerStyle={true}
                    onValueChange={setDay}
                    placeholder={{
                        label: 'Izaberite dan',
                        value: null,
                    }}   style={{ ...pickerSelectStyles }}
                    items={[
                        { label: 'Dan 1', value: '1', key: 'dan1'},
                        { label: 'Dan 2', value: '2', key: 'dan2'},
                        { label: 'Dan 3', value: '3', key: 'dan3' },
                        { label: 'Dan 4', value: '4', key: 'dan4' },
                        { label: 'Dan 5', value: '5', key: 'dan5' },
                ]}/> 

                <RNPickerSelect useNativeAndroidPickerStyle={true}
                    onValueChange={setTrack}
                    placeholder={{
                        label: 'Izaberite track',
                        value: null,
                    }} style={{ ...pickerSelectStyles }}
                    items={[
                        { label: 'TM', value: 'TM', key: 'TM'},
                        { label: 'TL', value: 'TL', key: 'TL'},
                        { label: 'EB', value: 'EB', key: 'EB' },
                        { label: 'Common', value: 'Common', key: 'Common' },
                ]}/> 

                    <Button buttonStyle={styles.submit}
                        title="Pretraži"
                        onPress={() => {filterSessions({day, track})}}
                    /> 
        </View>

    
}

const styles = StyleSheet.create({
    submit: {
        backgroundColor:'#E01A4F',
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 10
      },    
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        marginBottom: 10
    },
});

export default EvaluationScreenCommon;