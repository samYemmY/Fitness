import React from "react"
import {View, Text, Dimensions, TouchableOpacity, Image, StatusBar, ImageBackground, PanResponder, LayoutAnimation} from "react-native"
import {PaginationIndicator, Button, TouchableImage, RadioButton} from "./common";
import Images from "./Images"
import {connect} from "react-redux"
import {selectLanguage} from "../actions/languageActions";
import {selectRegion, changeExerciseProp} from "../actions/exerciseActions"
import {changeEditExercise} from "../actions/editExerciseActions";
import {Color} from "./Color"

const styles = {
  mainView:  {
    backgroundColor: Color.COLOR_PRIMARY,
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
    color: "white",
    borderRadius: 100
  }
};


class BodyRegionSelection extends React.Component {

  state = {
    title:         "",
    regions:       [["back", "biceps"], ["chest", "triceps"], ["shoulder", "belly", "legs"]],
    averageTime:   "1:07",
    indexSelected: 0,
    isSwiping: false,
  };

  constructor(props)
  {
    super(props);
    this.getRegionTitle = this.getRegionTitle.bind(this);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ isSwiping: true });
      },
      onPanResponderMove: (evt, gestureState) => {
        this.handlePanResponderMove(evt, gestureState);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {

      },
      onPanResponderTerminate: (evt, gestureState) => {

      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }

  static navigationOptions = ({navigation: {state}}) =>{
    if (state.params && state.params.title)
    {
      return {
        title: state.params.title,
        headerBackTitle: "",
        headerRight:  <TouchableImage source={Images.settings} imageStyle={{ width:25, height:25, marginRight: 20 }} onPress={() => state.params.navigation.navigate("Settings", {title: "Settings"})}/>
      }
    }
  }

  handlePanResponderMove(evt, gestureState)
  {
    const setupReset = (gestureState) => {
      LayoutAnimation.configureNext({
        duration: 500,
        create: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.spring,
        }}); gestureState.dx = 0; this.setState({ isSwiping: false });
    }
    if(gestureState.dx >= 100 && this.state.isSwiping){ setupReset(gestureState); this.selectNext(); }
    if(gestureState.dx <= -100 && this.state.isSwiping){ setupReset(gestureState); this.selectPrevious(); }
  }

  componentDidUpdate(prevProps)
  {
    console.log(prevProps, this.props)
    if(prevProps.selectedLanguage != this.props.selectedLanguage)
    {
      this.setState({ title: this.getRegionTitle(this.state.indexSelected) })
      this.props.navigation.setParams({title: this.props.lrc.BodyRegionSelection.title, navigation: this.props.navigation})
    }
  }

  componentWillMount()
  {
    this.props.navigation.setParams({title: this.props.lrc.BodyRegionSelection.title, navigation: this.props.navigation})
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
        index = this.state.regions.length-1
      }
      return {
        indexSelected: index,
        title:         this.getRegionTitle(index)
      }
    })
  }

  renderIcons()
  {
    let icons = []
    for(let region of this.state.regions[this.state.indexSelected])
    {
      icons.push(<Image key={region} source={Images[region + "-white"]} style={{width: 60, height: 60, marginLeft: 20, marginRight: 20}}/>)
    }
    return icons
  }

  render()
  {
    const {title, region, labelStartWorkout, labelAverageTime, labelTotalWorkouts, labelLastWorkoutTime} = this.props.lrc.BodyRegionSelection
    const selectedRegions = this.state.regions[this.state.indexSelected]
    const {averageTime, lastTime, totalWorkouts} = this.props.stack[selectedRegions[0]]
    const averageTimeFormatted = averageTime.substring(0, averageTime.length - 3)
    const lastTimeFormatted = lastTime.substring(0, lastTime.length - 3)
    const fontColor = {color: "white"};
    return (
        <ImageBackground source={Images["gradient-gray"]} style={styles.mainView}>

          <StatusBar
            barStyle="light-content"
            backgroundColor="#6a51ae"
          />

          <View style={styles.titleView}>
            <Text style={styles.titleText}>{ this.state.title }</Text>
          </View>

          <View style={{flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center", marginTop: 10}} {...this._panResponder.panHandlers}>
            {this.renderIcons()}
          </View>

          <View style={{width: "100%", justifyContent: "center", alignItems: "center", marginTop: 50}}>
            <PaginationIndicator amount={3} indexSelected={this.state.indexSelected}
                                 style={{justifyContent: "center", alignItems: "center"}}/>
          </View>

          <View style={{width: "90%", height: 120, justifyContent: "space-between", marginTop: 80}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}><Text
              style={{fontSize: 18, ...fontColor}}>{ labelTotalWorkouts + ":" }</Text> <Text
              style={{fontSize: 18, letterSpacing: 1, ...fontColor}}>{ totalWorkouts }</Text></View>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}><Text
              style={{fontSize: 18, ...fontColor}}>{ labelLastWorkoutTime + ":" }</Text> <Text
              style={{fontSize: 18, letterSpacing: 1, ...fontColor}}>{ lastTimeFormatted }</Text></View>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}><Text
              style={{fontSize: 18, ...fontColor}}>{ labelAverageTime + ":" }</Text> <Text
              style={{fontSize: 18, letterSpacing: 1, ...fontColor}}>{ averageTimeFormatted }</Text></View>
          </View>

          <View style={{width: "90%", marginTop: 55}}>
            <Button text={labelStartWorkout}
                    backgroundColor={"rgb(73, 73, 73)"}
                    color={"white"}
                    padding={16}
                    borderRadius={10}
                    borderColor={"rgb(86, 86, 86)"}
                    borderWidth={0}
                    fontSize={18}
                    fontWeight={"bold"}
                    onPress={() => this.handleClick(selectedRegions)} />
          </View>

        </ImageBackground>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  lrc:           state.language.lrc,
  selectedLanguage: state.language.selectedLanguage,
  stopwatchTime: state.exercises.stopwatchTime,
  stack: state.exercises.stack,
  store: state.editExercise.store
})

export default connect(mapStateToProps, {selectLanguage, selectRegion, changeEditExercise, changeExerciseProp})(BodyRegionSelection)
