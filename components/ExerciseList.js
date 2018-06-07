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
    height:          1,
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
        title: state.params.title
      }
    }
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
    this.initStore()
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
    this.props.changeEditExercise("store", store)
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
    else
    {
      weight = "10 kg"
      reps   = "x10"
      sets   = "3 Sets"
      notes  = ""
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
        <Text style={styles.headerText}>{title}</Text>
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
    this.props.navigation.navigate("BodyRegionSelection")
    this.props.addNewTime(this.props.stopwatchTime)
    this.props.incrementTotalWorkoutCount(this.props.selectedRegions)
  }

  renderFooter()
  {
    return (
      <View style={{
        backgroundColor: "black",
        justifyContent:  "space-around",
        alignItems:      "center",
        width:           "100%",
        height:          50,
        flexDirection:   "row",
        borderTopWidth:  0.5,
        borderColor:     "gray"
      }}>
        <View style={{flex: 1}}>
          <Button text={"Reset"} color={"white"} fontWeight={"bold"} onPress={this.resetState.bind(this)}/>
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
          <Button text={"Finish"} color={"white"} fontWeight={"bold"} onPress={this.finishExercise.bind(this)}/>
        </View>
      </View>
    )
  }

  render()
  {
    const {lrc, stack} = this.props
    return (
      <View style={{height: "100%", backgroundColor: "white"}}>
        <SectionList renderItem={this.renderItem.bind(this)}
                     keyExtractor={this._keyExtractor}
                     renderSectionHeader={this.renderSectionHeader.bind(this)}
                     sections={this.state.sections}
                     ItemSeparatorComponent={this.renderSeparator}
        />
        <ModalAddExercise visible={this.state.modalVisible} onCloseModal={this.onCloseModal.bind(this)}
                          animationType={"fade"} transparent={true}/>
        {this.renderFooter()}
      </View>
    )

  }
}

const mapStateToProps = (state, ownProps) => ({
  lrc:             state.language.lrc,
  selectedRegions: state.exercises.selectedRegions,
  stack:           state.exercises.stack,
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

