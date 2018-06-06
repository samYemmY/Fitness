import React from "react"
import {View, TextInput, Text} from "react-native"

const styles = {
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 50
  },
  text: {
    flex: 2,
    paddingLeft: 20
  },
  textInput: {
    flex: 1,
    paddingRight: 20
  }
}

const TextInputLabel = ({label, placeholder, onChangeText, secureTextEntry, value, style}) => (
  <View style={styles.view}>
    <Text style={styles.text}>{label}</Text>
    <TextInput value={value} placeholder={placeholder} onChangeText={onChangeText} style={styles.textInput} secureTextEntry={secureTextEntry}/>
  </View>
)

export {TextInputLabel}