import React from "react";
import {TextInput, View} from "react-native"

const styles = {
  view: {
    backgroundColor: "#FAF496",
    flex: 1,
    margin: 5,

  },
  textInput: {
    padding: 10
  }
}

class TextBox extends React.Component
{
  render()
  {
    return(
      <View style={styles.view}>
        <TextInput multiline numberOfLines={4} style={[styles.textInput, this.props.style]} {...this.props}/>
      </View>
    )
  }
}

export {TextBox}