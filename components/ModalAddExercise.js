import React from "react"
import {Modal, Picker, View, Text, Button as NativeButton, TextInput, Image, ScrollView} from "react-native"
import {NavBar, TextInputLabel, Button, Section, Box} from "./common";
import Images from "./Images"
import {connect} from "react-redux"
import {
  changeExerciseProp,
  addExerciseToStack
} from "../actions/exerciseActions"
import {addExerciseToStore} from "../actions/editExerciseActions"
const styles = {
  view: {
    height: "100%",
    backgroundColor: "rgba(255,255,255,1)",
    opacity: 1
  },
  labelText: {
    padding: 20
  }
}

class ModalAddExercise extends React.Component
{
  constructor(props)
  {
    super(props)
    this.changeValue.bind(this)
  }

  state={
    region: "chest",
    name: "Test",
    weight: 10,
    reps: 10,
    sets: 3
  }

  static navigationOptions = ({navigation: {state}}) =>{
      return {
        title: "Add Exercise",
      }
  }

  renderPickerItems()
  {
    const {regions,lrc} = this.props
    let ret = []
    for(let region of regions)
    {
      const label = lrc.BodyRegionSelection[region]
      ret.push(<Picker.Item label={label} value={region} key={region}/>)
    }
    return ret
  }

  changeValue(prop, value)
  {
    this.setState({[prop]: value})
  }

  onSave()
  {
    const {addExerciseToStack, addExerciseToStore, stack, store} = this.props
    const {region, name, weight, reps, sets} = this.state
    addExerciseToStack(region, name)
    addExerciseToStore(name, {weight, reps, sets})
    this.props.navigation.navigate("ExerciseList")
  }

  render()
  {
    const {lrc,regions} = this.props
    const fontSize = 16
    const imageSize = 20
    return(
      <View>
        <View style={{height: "100%", backgroundColor: "rgb(255,255,255)", padding: 20}}>
          <View>
            <Text style={{ fontSize, fontFamily: "Lato-Black" }}>{lrc.Modal.labelSelectRegion}</Text>
          </View>
          <Picker itemStyle={{ borderWidth: 0.5, height: 150, marginTop: 30 }} selectedValue={this.state.region} onValueChange={(itemValue, itemIndex) => {this.changeValue("region", itemValue)}}>
            {this.renderPickerItems()}
          </Picker>

          <View style={{ marginTop: 30}}>
            <Text style={{ fontSize, fontFamily: "Lato-Black" }}>{lrc.Modal.labelExerciseName}</Text>
          </View>
          <View style={{width: "100%", marginTop: 30}}>
            <TextInput style={{ fontSize }} placeholder={lrc.benchPress} onChangeText={(text) => this.changeValue("name", text)} defaultValue={"Test"}/>
          </View>

          <View style={{ marginTop: 0}}>
            <Text style={{ fontSize, marginTop: 30, fontFamily: "Lato-Black" }}>{lrc.initialValues}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, alignItems: "center", marginTop: 20, height: 95 }}>
            <View style={{ justifyContent: "space-between", alignItems: "center", height: "100%" }}>
              <Text style={{ fontSize }}>{lrc.weight + " (kg)"}</Text>
              <View style={{ alignItems: "center", flexDirection: "row", width: 60, justifyContent: "space-between"}}>
                <Image source={Images.weight} style={{ width: imageSize, height: imageSize}}/>
                <TextInput placeholder={"10"} style={{ fontSize: fontSize * 1.3 }} onChangeText={(text) => this.changeValue("weight", text)} defaultValue={"10"}/>
              </View>
            </View>

            <View style={{ justifyContent: "space-between", alignItems: "center", height: "100%" }}>
              <Text style={{ fontSize }}>{lrc.reps.trim(9)}</Text>
              <View style={{ alignItems: "center", flexDirection: "row", width: 60, justifyContent: "space-between"}}>
                <Image source={Images.reps} style={{ width: imageSize, height: imageSize}}/>
                <TextInput placeholder={"10"} style={{ fontSize: fontSize * 1.3 }} onChangeText={(text) => this.changeValue("reps", text)} defaultValue={"10"}/>
              </View>
            </View>

            <View style={{ justifyContent: "space-between", alignItems: "center", height: "100%" }}>
              <Text style={{ fontSize }}>{lrc.sets}</Text>
              <View style={{ alignItems: "center", flexDirection: "row", width: 60, justifyContent: "space-between"}}>
                <Image source={Images.sets} style={{ width: imageSize * 1.2, height: imageSize * 1.2, paddingTop: 10}}/>
                <TextInput placeholder={"10"} style={{ fontSize: fontSize * 1.3 }} onChangeText={(text) => this.changeValue("sets", text)} defaultValue={"3"}/>
              </View>
            </View>
          </View>

          <View style={{width: "100%", alignItems: "center", marginTop: 20}}>
            <View style={{width: "90%"}}>
              <Button
                      text={lrc.save}
                      backgroundColor={"rgb(73, 73, 73)"}
                      color={"white"}
                      padding={16}
                      borderRadius={10}
                      borderColor={"rgb(86, 86, 86)"}
                      borderWidth={0}
                      fontSize={18}
                      onPress={this.onSave.bind(this)}
              />
            </View>
          </View>

        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const regions = Object.keys(state.exercises.stack)
  const lrc = state.language.lrc
  const {stack} = state.exercises
  const {store} = state.editExercise
  return { regions, lrc, stack, store }
}

export default connect(mapStateToProps, {changeExerciseProp, addExerciseToStack, addExerciseToStore})(ModalAddExercise)
