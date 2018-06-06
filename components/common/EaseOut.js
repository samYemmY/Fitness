import React from "react"
import {View,LayoutAnimation,Animated,Dimensions,Easing} from "react-native"

class EaseOut extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      top: new Animated.Value(0),
      left: new Animated.Value(0)
    }
  }

  componentDidMount()
  {
    const {swipeLeft, swipeRight, swipeDown, swipeUp} = this.props
    let prop = null
    let toValue = null
    if(swipeRight)
    {
      prop = this.state.left
      toValue = Dimensions.get("window").width
    }
    else if(swipeLeft)
    {
      prop = this.state.left
      toValue = -Dimensions.get("window").width
    }
    else if(swipeUp)
    {
      prop = this.state.top
      toValue = -Dimensions.get("window").height
    }
    else if(swipeDown)
    {
      prop = this.state.top
      toValue = Dimensions.get("window").height
    }
    Animated.timing(prop, {toValue: toValue, duration: 10000, easing: Easing.out(Easing.ease)}).start(this.onAnimationFinished)
  }

  onAnimationFinished(){
    console.log("done")
  }

  render()
  {
    return <Animated.View style={{
      position: "absolute",
      top: this.state.top,
      left: this.state.left
    }}>{this.props.children}</Animated.View>
  }
}

export {EaseOut}