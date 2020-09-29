import React, { useState } from "react";
import {StyleSheet, View} from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const AuthForm = ({ backgroundColor, isAllAvailable, chooseTrack}) => {
    const [track, setTrack] = useState("1");

    let radio_props = [
      {label: 'TM', value: 0, color: 'green'},
      {label: 'TL', value: 1, color: 'blue' },
      {label: 'EB', value: 2, color: 'red' },
    ];

    if(isAllAvailable) {
      radio_props = [
        {label: 'TM', value: 0, color: 'green'},
        {label: 'TL', value: 1, color: 'blue' },
        {label: 'EB', value: 2, color: 'red' },
        {label: 'Svi', value: 3, color: 'orange' },
      ];
    }

    return (
        <View>

          <RadioForm
            formHorizontal={true}
            animation={true}
            style={styles.radio}
            >
            {/* To create radio buttons, loop through your array of options */}
            {
              radio_props.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i} >
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    borderWidth={1}
                    onPress={(value) => {chooseTrack(value); setTrack(value)}}
                    isSelected={track === i}
                    buttonInnerColor={obj.color}
                    buttonOuterColor={obj.color}
                    buttonSize={30}
                    buttonOuterSize={40}
                    buttonStyle={{}}
                    buttonWrapStyle={{marginLeft: 10}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    labelStyle={{fontSize: 20, color: obj.color, fontWeight: 'bold'}}
                    labelWrapStyle={{}}
                    disabled={true}
                  />
                </RadioButton>
              ))
            }  
          </RadioForm> 
        </View>
    )
}

const styles = StyleSheet.create({ 
    radio: {
      alignSelf: 'center',
    }

});

export default AuthForm;