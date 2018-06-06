import React from "react"
import { ActivityIndicator, View } from "react-native"

const ProgressBar = ({size, color}) =>
{
  const styles = {
    view: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
  }

  return (
    <View style={styles.view_activityindicator}>
      <ActivityIndicator size={size} color={color}/>
    </View>
  )
}

export { ProgressBar }