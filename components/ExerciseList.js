import React from "react"
import {
  SectionList,
  Text,
  View,
  TouchableOpacity,
  Button as NativeButton,
  Dimensions,
  ProgressViewIOS,
  Image
} from "react-native"
import {NavBar, Button, TouchableImage} from "./common";
import ListItem from "./ListItem"
import Images from "./Images"
import ModalAddExercise from "./ModalAddExercise"
import {connect} from "react-redux"
import {changeEditExercise} from "../actions/editExerciseActions";
import {
  changeExerciseProp,
  addExercise,
  clearExerciseProgress,
  toggleExerciseClick,
  resetClickedExercises,
  addNewTime,
  incrementTotalWorkoutCount
} from "../actions/exerciseActions";
import {Stopwatch} from "react-native-stopwatch-timer"

const styles = {
  itemText:          {
    lineHeight:  50,
    fontSize:    20,
    paddingLeft: 20
  },
  headerText:        {
    lineHeight: 50,
    fontSize:   14,
    color:      "white",
    fontFamily: "Lato-Bold",
  },
  headerView:        {
    justifyContent:  "center",
    alignItems:      "center",
    backgroundColor: "black",
  },
  seperator:         {
    height:          0.5,
    backgroundColor: "gray",
  },
  sectionFooterText: {
    color:     "blue",
    textAlign: "center"
  }
}

class ExerciseList extends React.Component {
  constructor(props)
  {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.state       = {
      sections:             null,
      title:                "",
      modalVisible:         false,
      modalRegionSelection: null,
      stopwatchReset:       false,
      stopwatchStart:       true,
      exercises:            null
    }
  }

  static navigationOptions = ({navigation: {state}}) =>{
    if (state.params && state.params.title)
    {
      return {
        title: state.params.title,
        headerRight: <TouchableImage source={Images["plus-white"]} style={{marginRight: 20}} width={20} height={20} onPress={() => state.params.navigation.navigate("ModalAddExercise", {})} />,
      }
    }
  }

  test()
  {
    console.log("test")
  }

  componentWillReceiveProps(props)
  {
    this.setState({
      sections: this.formatSections(props)
    })
  }

  componentWillMount()
  {
    this.getTitle()
    const sections = this.formatSections()
    this.setState({
      sections
    })
  }

  componentWillUnmount()
  {
    this.props.clearExerciseProgress()
  }

  renderSeparator()
  {
    return (
      <View>
        <View style={styles.seperator}/>
      </View>
    )
  }

  handleClick(all)
  {
    const {stack}         = this.props
    const {section, item} = all
    this.props.toggleExerciseClick(item, section)
    /*this.props.changeEditExercise("selectedExercise",item)
    this.props.changeEditExercise("selectedRegion", section.regionKey)
    this.props.navigation.navigate("EditExercise")*/
  }

  renderItem(all)
  {
    const {item, index, section}  = all
    let reps, weight, sets, notes = null
    if (this.props.store[item])
    {
      const target = this.props.store[item]
      reps         = target.reps
      weight       = target.weight
      sets         = target.sets
      notes        = target.notes
    }
    const clicked = this.props.stack[section.regionKey].data[item].clicked
    return <ListItem navigation={this.props.navigation} item={item} clicked={clicked} weight={weight} reps={reps}
                     sets={sets} notes={notes} regionKey={section.regionKey} onPress={() => this.handleClick(all)}/>
  }

  onOpenModal(region = "chest")
  {
    this.props.changeExerciseProp("modalPickerValue", region)
    this.setState((prevState) => ({
      modalVisible: true,
      refreshing:   true
    }))
  }

  renderSectionHeader({section: {title, regionKey}})
  {
    const progress = this.props.stack[regionKey].progress
    return (
      <View style={styles.headerView}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Image source={Images[regionKey + "-white"]} style={{ width: 20, height: 20, marginRight: 10 }} />
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={{width: "80%", height: 20}}>
          <ProgressViewIOS progress={progress}/>
        </View>
      </View>
    )
  }

  onCloseModal()
  {
    this.setState({
      modalVisible: false,
      refreshing:   false
    })
  }

  _keyExtractor = (item, index) => item + index

  formatSections(props)
  {
    let actionProps = null
    if (props)
    {
      actionProps = props
    }
    else
    {
      actionProps = this.props
    }
    let sections = []
    for (let region of actionProps.selectedRegions)
    {
      let sectionData = {...actionProps.stack[region], data: Object.keys(actionProps.stack[region].data)}
      sections.push({...sectionData, title: actionProps.lrc.BodyRegionSelection[region], regionKey: region})
    }
    return sections
  }

  getTitle()
  {
    const {lrc, selectedRegions} = this.props
    let title                    = ""
    for (let region of selectedRegions)
    {
      title += lrc.BodyRegionSelection[region] + " - "
    }
    this.props.navigation.setParams({title: title.substring(0, title.length - 3)})
  }

  getStopwatchTime(time)
  {
    this.props.changeExerciseProp("stopwatchTime", time)
  }

  resetState()
  {
    this.props.clearExerciseProgress()
    this.props.resetClickedExercises()
    this.setState({stopwatchStart: false, stopwatchReset: true}, () => this.setState({
      stopwatchReset: false,
      stopwatchStart: true
    }))
  }

  finishExercise()
  {
    this.setState({stopwatchStart: false})
    this.props.addNewTime(this.props.stopwatchTime, this.props.selectedRegions)
    this.props.incrementTotalWorkoutCount(this.props.selectedRegions)
    this.props.navigation.navigate("BodyRegionSelection")
  }

  renderFooter()
  {
    const {lrc} = this.props
    return (
      <View style={{
        backgroundColor: "black",
        alignItems:      "center",
        width:           "100%",
        padding: 10,
        height:          70,
        flexDirection:   "row",
        borderTopWidth:  0.5,
        borderColor:     "gray"
      }}>
        <View style={{flex: 1}}>
          <Button text={lrc.reset} color={"white"} fontWeight={"bold"} borderWidth={1} borderRadius={20} borderColor={"white"} onPress={this.resetState.bind(this)}/>
        </View>
        <View style={{flex: 1}}>
          <View style={{paddingLeft: 15}}>
            <Stopwatch
              start={this.state.stopwatchStart}
              reset={this.state.stopwatchReset}
              getTime={this.getStopwatchTime.bind(this)} options={options}/>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Button text={lrc.finish} color={"white"} borderWidth={1} borderRadius={20} borderColor={"lime"} fontSize={13} fontWeight={"bold"} onPress={this.finishExercise.bind(this)}/>
        </View>
      </View>
    )
  }

  render()
  {
    const {lrc, stack, store} = this.props
    return (
      <View style={{height: "100%", backgroundColor: "rgb(240, 247, 255)"}}>
        <SectionList renderItem={this.renderItem.bind(this)}
                     keyExtractor={this._keyExtractor}
                     renderSectionHeader={this.renderSectionHeader.bind(this)}
                     sections={this.state.sections}
                     ItemSeparatorComponent={this.renderSeparator}
        />
      {this.renderFooter()}
      </View>
    )

  }
}

const mapStateToProps = (state, ownProps) => ({
  lrc:             state.language.lrc,
  selectedRegions: state.exercises.selectedRegions,
  stack:           state.exercises.stack,
  modalVisible:    state.exercises.modalVisible,
  store:           state.editExercise.store,
  stopwatchTime:   state.exercises.stopwatchTime
})

const options = {
  container: {},
  text:      {
    fontSize:   19,
    color:      '#FFF',
    marginLeft: 7,
  }
};

export default connect(mapStateToProps, {
  changeEditExercise,
  addExercise,
  changeExerciseProp,
  clearExerciseProgress,
  toggleExerciseClick,
  resetClickedExercises,
  addNewTime,
  incrementTotalWorkoutCount
})(ExerciseList)
