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

class TextInputLabel extends React.Component
{

  renderText()
  {
    if(this.props.label)
    {
      return <Text style={styles.text}>{this.props.label}</Text>
    }
  }

  render()
  {
    const {value, placeholder, onChangeText, secureTextEntry} = this.props
    return (
      <View style={styles.view}>
        {this.renderText()}
        <TextInput value={value} onEnterText={()=>console.log("entered")} placeholder={placeholder} onChangeText={onChangeText} style={styles.textInput} secureTextEntry={secureTextEntry}/>
      </View>
    )
  }
}

export {TextInputLabel}