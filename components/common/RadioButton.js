import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text, View, StyleSheet} from "react-native"

class RadioButton extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      checked: props.defaultValue == null ? true : props.defaultValue === "true",
      borderRadius: props.radius ? props.radius : 20,
    }
    this.radius = props.radius ? props.radius : 20,
    this.color = props.color ? props.color : "blue",
    this.size = props.size ? props.size : 20,
    this.styles = StyleSheet.create({
      view_touchable_inner:    {
        borderRadius: this.size,
        borderColor:  this.color,
        backgroundColor: "rgba(255,255,255,0)",
        borderWidth:  3,
        width: this.size,
        height: this.size,
        justifyContent: "center",
        alignItems: "center"
      },
      view_radiobutton_filled: {
        borderRadius: this.size,
        backgroundColor: this.color,
        width: this.size/2,
        height: this.size/2
      }
    })
    this.toggleRadioButton = this.toggleRadioButton.bind(this)
  }

  toggleRadioButton(){
    this.setState(prevState => ({checked: !prevState.checked}));
  }

  render()
  {
    return (
        <TouchableWithoutFeedback onPress={() => {this.toggleRadioButton()}}>
          <View style={this.styles.view_touchable_inner}>
            {this.state.checked ? <View style={this.styles.view_radiobutton_filled}/> : null}
          </View>
        </TouchableWithoutFeedback>
    )
  }

}

export { RadioButton }
