import React from "react"
import {View, TouchableOpacity, Text, Image, Dimensions} from "react-native";
import {TouchableImage} from "./common";
import {connect} from "react-redux"
import {changeExerciseProp} from "../actions/exerciseActions";
import {deleteExerciseFromStore} from "../actions/editExerciseActions"
import {changeEditExercise, deleteExerciseFromStack} from "../actions/exerciseActions"
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
    const {weight, reps, sets, item, navigation, deleteExerciseFromStore, deleteExerciseFromStack, regionKey, lrc} = this.props
    navigation.navigate("EditExercise", {selectedExercise: item, weight, reps, sets, navigation, deleteExerciseFromStore, deleteExerciseFromStack, region: regionKey, lrc})
    this.swipeable.recenter()
  }

  render()
  {
    const bgColor    = this.state.clicked ? "rgb(192, 253, 192)" : "white"
    const textStyle  = {
      fontSize: 16,
      fontFamily: "Lato-Regular"
    }
    const iconWidth = 35
    const EditButton = () => (
      <TouchableOpacity style={{
        backgroundColor: this.state.clicked ? "lightgreen" : "white",
        flex:            1,
        borderLeftWidth: 1,
        borderColor:     "gray"
      }} onPress={this.handleClick.bind(this)}>
        <Image style={{top: 30, left: 25, width: 30, height: 30}} source={Images.edit}/>
      </TouchableOpacity>
    )
    return (
      <Swipeable onRef={ref => this.swipeable = ref} rightButtons={[<EditButton/>]}>
        <TouchableOpacity style={{height: 90, backgroundColor: bgColor}}
                          onPress={this.props.onPress}>

          <View style={{ marginTop: 15, alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={{...textStyle, paddingLeft: 10, fontFamily: "Lato-Bold"}}>{this.props.item}</Text>
          </View>

            <View>
            </View>

            <View style={{
              marginTop: 15,
              width: "75%",
              alignSelf: "center",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"}}>
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
  lrc: state.language.lrc
})

export default connect(mapStateToProps, {changeExerciseProp, deleteExerciseFromStore, deleteExerciseFromStack, changeEditExercise})(ListItem)
