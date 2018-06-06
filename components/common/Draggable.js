import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text, Image,
  View, AppRegistry,
  Dimensions, PanResponder, Animated, Easing
} from 'react-native';
import PropTypes from "prop-types";

let {width, height} = Dimensions.get("window");

const iconWidth = 50
const borderWidth = 3
const backgroundColor = "white"

class Draggable extends Component<Props> {

  constructor(props)
  {
    super(props);
    this.animation = new Animated.Value(1);
    this.animation.addListener(({value}) => this.setState({animationVal: value}));
    this.panAnimationXY = new Animated.ValueXY();
    this.state          = {
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "white",
      iconWidth:       iconWidth,
      animationVal:    this.animation._value,
      visible:         true
    };
    this.panResponder   = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove:           Animated.event([null, {
          dx: this.panAnimationXY.x,
          dy: this.panAnimationXY.y
        }
        ], {listener: this._onPanResponderMoveListener.bind(this)}),
        onPanResponderRelease:        (event, gestureState) =>{
          this._onPanResponderRelease(event, gestureState)
        },
        onPanResponderStart: this._onPanResponderStart.bind(this)
      }
    );
    this.styles         = this.createStyles();
  }

  _onPanResponderStart(event, gestureState){

  }

  _onPanResponderMoveListener(event, gestureState)
  {

  }

  _onPanResponderRelease(event, gestureState)
  {

  }

  renderDraggable()
  {
    return (
      <View style={this.styles.container_draggable}>
        <Animated.View {...this.panResponder.panHandlers}
                       style={[this.panAnimationXY.getLayout(), this.getDraggableStyle()["view"]]}>
          <Image source={this.props.source} style={this.getDraggableStyle()["image"]}/>
        </Animated.View>
      </View>
    )
  }

  render()
  {
    return this.renderDraggable()
  }

  getDraggableStyle()
  {
    return ({
      view:  {
        width:           this.state.iconWidth,
        height:          this.state.iconWidth,
        justifyContent:  "center",
        alignItems:      "center",
        borderWidth:     borderWidth,
        borderRadius:    100,
        borderColor:     "black",
        backgroundColor: backgroundColor
      },
      image: {
        width:      0.5 * this.state.iconWidth,
        height:     0.5 * this.state.iconWidth,
        marginLeft: 0,
        marginTop:  0,
        opacity:    1   * this.state.animationVal
      }
    })
  }

  createStyles()
  {
    return StyleSheet.create({
      container_draggable: {
        position: "absolute",
        top:      this.props.top,
        left:     this.props.left,
      }
    });
  }
}

Draggable.propTypes = {
  onEnterArea:     PropTypes.func,
  onLeaveArea:     PropTypes.func,
  onReleaseInArea: PropTypes.func,
  backgroundColor: PropTypes.string,
  top:             PropTypes.number,
  left:            PropTypes.number,
  imgWidth:        PropTypes.number,
  imgHeight:       PropTypes.number,
  imgMarginLeft:   PropTypes.number,
  imgMarginTop:    PropTypes.number
};

export { Draggable }