import React from "react"
import {View} from "react-native"

const styles = {
  view: {
    borderTopWidth: 1,
    borderColor: "lightgray",
    justifyContent: "center",
    minHeight: 70
  }
}

export const Section = ({style, children}) => (
  <View style={[styles.view,style]}>
    {children}
  </View>
)