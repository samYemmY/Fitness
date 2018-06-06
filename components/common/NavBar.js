import React from "react"
import { View, Text, Dimensions, Button } from "react-native"

const styles = {
  view: {
    height: 50,
    width: Dimensions.get("window").width,
    borderColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  navCell: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewLeft: {
    flex: 1
  },
  viewCenter: {
    flex: 2
  },
  viewRight: {
    flex: 1
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
}

class NavBar extends React.Component
{
  renderLeftComponent()
  {
    return this.props.leftComponent ? this.props.leftComponent : null
  }

  renderRightComponent()
  {
    return this.props.rightComponent ? this.props.rightComponent : null
  }


  render()
  {
    return(
      <View style={styles.view}>
        <View style={[styles.navCell, styles.viewLeft]}>
          {this.renderLeftComponent()}
        </View>
        <View style={[styles.navCell, styles.viewCenter]}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
        <View style={[styles.navCell, styles.viewRight]}>
          {this.renderRightComponent()}
        </View>
      </View>
    )
  }
}

export {NavBar}
