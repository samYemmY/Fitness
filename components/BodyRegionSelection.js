import React from "react"
import {View, Text, Dimensions, TouchableOpacity, Image, StatusBar} from "react-native"
import {PaginationIndicator, Button, TouchableImage} from "./common";
import Images from "./Images"
import {connect} from "react-redux"
import {selectLanguage} from "../actions/languageActions";
import {selectRegion, changeExerciseProp} from "../actions/exerciseActions"
import {changeEditExercise} from "../actions/editExerciseActions";
import Lrc from "./Lrc"

const styles = {
  mainView:  {
    backgroundColor: "white",
    height:          "100%",
    alignItems:      "center",
    paddingLeft: 30,
    paddingRight: 30
  },
  titleView: {
    height:         100,
    justifyContent: "center",
    alignItems:     "center"
  },
  titleText: {
    fontSize:   21,
    fontWeight: "bold"
  }
}


class BodyRegionSelection extends React.Component {
  constructor(props)
  {
    super(props)
    this.getRegionTitle = this.getRegionTitle.bind(this)
  }

  state = {
    title:         "",
    regions:       [["back", "biceps"], ["chest", "triceps"], ["shoulder", "belly", "legs"]],
    icons:         [Images.biceps, Images.back],
    averageTime:   "1:07",
    indexSelected: 0
  }

  static navigationOptions = ({navigation: {state}}) =>{
    if (state.params && state.params.title)
    {
      return {
        title: state.params.title
      }
    }
  }

  componentWillMount()
  {
    this.props.navigation.setParams({title: this.props.lrc.BodyRegionSelection.title})
    this.setState({title: this.getRegionTitle(this.state.indexSelected)})
    if(!this.props.store.isInitialized)
    {
      this.initStore()
    }
  }

  initStore()
  {
    let store = {}
    for (const region in this.props.stack)
    {
      for (const exercise in this.props.stack[region].data)
      {
        store[exercise] = {weight: 10, reps: 10, sets: 3}
      }
    }
    store.isInitialized = true
    this.props.changeEditExercise("store", store)
  }

  getRegionTitle(index)
  {
    let title = ""
    for (let region of this.state.regions[index])
    {
      region = this.props.lrc.BodyRegionSelection[region]
      title += region.charAt(0).toUpperCase() + region.substring(1).toLowerCase() + "-"
    }
    return title.substring(0, title.length - 1)
  }

  shouldComponentUpdate(nextState, nextProps)
  {
    if (nextState.indexSelected !== this.state.indexSelected)
    {
      return true
    }
    return false
  }

  handleClick(regions)
  {
    this.props.selectRegion(regions)
    this.props.navigation.navigate("ExerciseList", {title: this.props.lrc.ExerciseList.title, labelAdd: this.props.lrc.add, navigation: this.props.navigation})
  }

  selectNext()
  {
    this.setState((prevState) =>{
      let index = ++prevState.indexSelected
      if (index >= this.state.regions.length)
      {
        index = 0
      }
      return {
        indexSelected: index,
        title:         this.getRegionTitle(index)
      }
    })
  }

  selectPrevious()
  {
    this.setState((prevState) =>{
      let index = --prevState.indexSelected
      if (index < 0)
      {
        index = this.state.regions.length
      }
      return {
        indexSelected: index,
        title:         this.getRegionTitle(index)
      }
    })
  }

  render()
  {
    const {title, region, labelStartWorkout, labelAverageTime, labelTotalWorkouts, labelLastWorkoutTime} = this.props.lrc.BodyRegionSelection
    const selectedRegions = this.state.regions[this.state.indexSelected]
    const {averageTime, lastTime, totalWorkouts} = this.props.stack[selectedRegions[0]]
    const averageTimeFormatted = averageTime.substring(0, averageTime.length - 3)
    const lastTimeFormatted = lastTime.substring(0, lastTime.length - 3)
    return (
      <View style={styles.mainView}>

        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />

        <View style={styles.titleView}>
          <Text style={styles.titleText}>{ this.state.title }</Text>
        </View>

        <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
          <TouchableImage source={require("../img/arrow_small.png")} style={{width: 10, height: 15}} onPress={this.selectPrevious.bind(this)}/>
          <View style={{flexDirection: "row"}}>
            <TouchableImage source={this.state.icons[0]} style={{width: 60, height: 60}}/>
            <TouchableImage source={this.state.icons[1]} style={{width: 60, height: 60}}/>
          </View>
          <TouchableImage source={require("../img/arrow_small.png")} style={{
            width: 10, height: 15, transform: [{scaleX: -1}]}} onPress={this.selectNext.bind(this)}/>
        </View>

        <View style={{width: "100%", justifyContent: "center", alignItems: "center", marginTop: 50}}>
          <PaginationIndicator amount={3} indexSelected={this.state.indexSelected}
                               style={{justifyContent: "center", alignItems: "center"}}/>
        </View>

        <View style={{width: "90%", height: 120, justifyContent: "space-between", marginTop: 80}}>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}><Text
            style={{fontSize: 17}}>{ labelTotalWorkouts + ":" }</Text> <Text
            style={{fontSize: 19, letterSpacing: 1}}>{ totalWorkouts }</Text></View>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}><Text
            style={{fontSize: 17}}>{ labelLastWorkoutTime + ":" }</Text> <Text
            style={{fontSize: 19, letterSpacing: 1}}>{ lastTimeFormatted }</Text></View>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}><Text
            style={{fontSize: 17}}>{ labelAverageTime + ":" }</Text> <Text
            style={{fontSize: 19, letterSpacing: 1}}>{ averageTimeFormatted }</Text></View>
        </View>

        <View style={{width: "90%", marginTop: 55}}>
          <Button text={labelStartWorkout}
                  backgroundColor={"black"}
                  color={"white"}
                  padding={16}
                  borderRadius={10}
                  fontSize={21}
                  onPress={() => this.handleClick(selectedRegions)} />
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  lrc:           state.language.lrc,
  stopwatchTime: state.exercises.stopwatchTime,
  stack: state.exercises.stack,
  store: state.editExercise.store
})

export default connect(mapStateToProps, {selectLanguage, selectRegion, changeEditExercise, changeExerciseProp})(BodyRegionSelection)
