import React from "react"
import {View, TouchableOpacity, Text, Image} from "react-native";
import {TouchableImage} from "./common";
import {connect} from "react-redux"
import {changeExerciseProp} from "../actions/exerciseActions";
import Swipeable from "react-native-swipeable"
import Images from "./Images"


class ListItem extends React.Component {
  state = {
    clicked: this.props.clicked
  }

  swipeable = null

  componentWillReceiveProps(props)
  {
    if (props.clicked !== this.state.clicked)
    {
      this.setState({clicked: props.clicked})
    }
  }

  handleClick()
  {
    const {weight, reps, sets, item, navigation} = this.props
    navigation.navigate("EditExercise", {selectedExercise: item, weight, reps, sets})
    this.swipeable.recenter()
  }

  render()
  {
    const bgColor    = this.state.clicked ? "rgba(35,255,75,0.2)" : "rgba(115,173,255,0.1)"
    const textStyle  = {
      fontSize: 16, fontFamily: "Lato-Regular"
    }
    const imgPath    = "../img/" + this.props.regionKey + ".png"
    const EditButton = () => (
      <TouchableOpacity style={{
        backgroundColor: this.state.clicked ? "lightgreen" : "lightblue",
        flex:            1,
        borderLeftWidth: 1,
        borderColor:     "gray"
      }} onPress={this.handleClick.bind(this)}>
        <Image style={{top: 30, left: 25, width: 30, height: 30}} source={Images.edit}/>
      </TouchableOpacity>
    )
    return (
      <Swipeable onRef={ref => this.swipeable = ref} rightButtons={[<EditButton/>]}>
        <TouchableOpacity style={{height: 90, position: "relative", alignItems: "center", backgroundColor: bgColor}}
                          onPress={this.props.onPress}>
          <View style={{position: "absolute", top: 20, left: 30}}> <Image source={Images[this.props.regionKey]}
                                                                          style={{width: 20, height: 20}}/> </View>
          <View style={{}}> <Text
            style={{...textStyle, textAlign: "center", marginTop: 15, fontFamily: "Lato-Bold"}}>{this.props.item}</Text>
          </View>
          <View
            style={{flexDirection: "row", justifyContent: "space-around", flex: 1, alignItems: "center", width: "90%"}}>
            <Text style={textStyle}>{this.props.weight + " kg"}</Text>
            <Text style={textStyle}>{this.props.reps + " x"}</Text>
            <Text style={textStyle}>{this.props.sets + " sets"}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  stack: state.exercises.stack,
})

export default connect(mapStateToProps, {changeExerciseProp})(ListItem)