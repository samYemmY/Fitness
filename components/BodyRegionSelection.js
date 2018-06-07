import React from "react"
import {View, Text, Dimensions, TouchableOpacity, Image, StatusBar} from "react-native"
import {PaginationIndicator, Button, TouchableImage} from "./common";
import {connect} from "react-redux"
import {selectLanguage} from "../actions/languageActions";
import {selectRegion} from "../actions/exerciseActions"
import Lrc from "./Lrc"

const styles = {
  mainView:  {
    backgroundColor: "white",
    height:          "100%",
    alignItems:      "center"
  },
  titleView: {
    marginTop:      40,
    height:         80,
    justifyContent: "center",
    alignItems:     "center"
  },
  titleText: {
    fontSize:   19,
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
    icons:         [require("../img/biceps.png"), require("../img/back.png")],
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
    this.props.navigation.navigate("ExerciseList", {title: this.props.lrc.ExerciseList.title})
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
    const {title, region, startWorkout, averageTime} = this.props.lrc.BodyRegionSelection
    const selectedRegions = this.state.regions[this.state.indexSelected]
    return (
      <View style={styles.mainView}>

        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />

        <View style={styles.titleView}>
          <Text style={styles.titleText}>{this.state.title}</Text>
        </View>

        <View style={{width: "75%", flexDirection: "row", justifyContent: "space-around", marginTop: 10}}>
          <TouchableImage source={require("../img/arrow_small.png")} style={{
            width:         20, height: 40,
            shadowColor:   '#000',
            shadowOffset:  {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius:  1,
          }} onPress={this.selectPrevious.bind(this)}/>
          <View style={{flexDirection: "row"}}>
            <TouchableImage source={this.state.icons[0]} style={{width: 60, height: 60}}/>
            <TouchableImage source={this.state.icons[1]} style={{width: 60, height: 60}}/>
          </View>
          <TouchableImage source={require("../img/arrow_small.png")} style={{
            width:         20, height: 40, transform: [{scaleX: -1}],
            shadowColor:   '#000',
            shadowOffset:  {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius:  1,
          }} onPress={this.selectNext.bind(this)}/>
        </View>

        <View style={{width: "100%", justifyContent: "center", alignItems: "center", marginTop: 50}}>
          <PaginationIndicator amount={3} indexSelected={this.state.indexSelected}
                               style={{justifyContent: "center", alignItems: "center"}}/>
        </View>

        <View style={{width: "75%", height: 110, justifyContent: "space-between", marginTop: 60}}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}><Text
            style={{fontSize: 19, fontFamily: "Lato-Light"}}>Total Workouts</Text> <Text
            style={{fontSize: 19}}>{this.props.stack[selectedRegions[0]].totalCount}</Text></View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}><Text
            style={{fontSize: 19, fontFamily: "Lato-Light"}}>Average Time</Text> <Text
            style={{fontSize: 19}}>{this.props.averageTime}</Text></View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}><Text
            style={{fontSize: 19, fontFamily: "Lato-Light"}}>Last Time</Text> <Text
            style={{fontSize: 19}}>{this.props.stopwatchTime}</Text></View>
        </View>

        <View style={{width: "75%", height: 120, marginTop: 50}}>
          <Button text={startWorkout} backgroundColor={"black"} color={"white"} padding={15} borderRadius={10}
                  fontSize={19} fontWeight={"bold"}
                  onPress={() => this.handleClick(selectedRegions)} style={{
            shadowColor:   '#000',
            shadowOffset:  {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius:  2,
          }}/>
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  lrc:           state.language.lrc,
  stopwatchTime: state.exercises.stopwatchTime,
  averageTime: state.exercises.averageTime,
  stack: state.exercises.stack
})

export default connect(mapStateToProps, {selectLanguage, selectRegion})(BodyRegionSelection)