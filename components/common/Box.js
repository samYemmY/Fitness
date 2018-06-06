import React, {Component} from "react"
import {View} from "react-native"
import {Button} from "./Button"

const styles = {
  view: {
    margin: 5,
    shadowOpacity: 0.2,
    shadowOffset: {width:0,height:2},
    shadowColor: "black",
    elevation: 1,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: "lightgray"
  }
}

class Box extends Component{
  render(){
    return(
      <View style={styles.view}>
        {this.props.children}
      </View>
    )
  }
}

export { Box }
