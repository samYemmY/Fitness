import React from "react"
import {Modal, Picker, View, Text, Button as NativeButton, TextInput, Image, ScrollView} from "react-native"
import {NavBar, TextInputLabel, Button, Section, Box} from "./common";
import Images from "./Images"
import {connect} from "react-redux"
import {changeExerciseProp, addExercise} from "../actions/exerciseActions"
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

  onPickerValueChange(value)
  {
    this.props.changeExerciseProp("modalPickerValue",value)
  }

  onInputValueChange(text)
  {
    this.props.changeExerciseProp("modalTextInputValue",text)
  }

  onSave()
  {
    const {modalPickerValue,modalTextInputValue} = this.props
    this.props.addExercise(modalPickerValue, modalTextInputValue)
    this.props.onCloseModal()
  }

  render()
  {
    const {lrc,regions,modalPickerValue,modalTextInputValue} = this.props
    const fontSize = 16
    const imageSize = 20
    return(
      <View>
        <View style={{height: "100%", backgroundColor: "rgb(255,255,255)", padding: 20}}>
          <View>
            <Text style={{ fontSize, fontFamily: "Lato-Black" }}>Region</Text>
          </View>
          <Picker>
            {this.renderPickerItems()}
          </Picker>

          <View style={{ marginTop: 20}}>
            <Text style={{ fontSize, fontFamily: "Lato-Black" }}>Name</Text>
          </View>
          <View style={{width: "100%", marginTop: 20}}>
            <TextInput style={{ fontSize }} placeholder={"Bankdrücken"}/>
          </View>

          <View style={{ marginTop: 20}}>
            <Text style={{ fontSize, marginTop: 20, fontFamily: "Lato-Black" }}>Anfangswerte</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, alignItems: "center", marginTop: 10, height: 95 }}>
            <View style={{ justifyContent: "space-between", alignItems: "center", height: "100%" }}>
              <Text style={{ fontSize }}>weight (kg)</Text>
              <View style={{ alignItems: "center", flexDirection: "row", width: 60, justifyContent: "space-between"}}>
                <Image source={Images.weight} style={{ width: imageSize, height: imageSize}}/>
                <TextInput placeholder={"10"} style={{ fontSize: fontSize * 1.3 }}/>
              </View>
            </View>

            <View style={{ justifyContent: "space-between", alignItems: "center", height: "100%" }}>
              <Text style={{ fontSize }}>reps</Text>
              <View style={{ alignItems: "center", flexDirection: "row", width: 60, justifyContent: "space-between"}}>
                <Image source={Images.reps} style={{ width: imageSize, height: imageSize}}/>
                <TextInput placeholder={"10"} style={{ fontSize: fontSize * 1.3 }}/>
              </View>
            </View>

            <View style={{ justifyContent: "space-between", alignItems: "center", height: "100%" }}>
              <Text style={{ fontSize }}>sets</Text>
              <View style={{ alignItems: "center", flexDirection: "row", width: 60, justifyContent: "space-between"}}>
                <Image source={Images.sets} style={{ width: imageSize * 1.2, height: imageSize * 1.2, paddingTop: 10}}/>
                <TextInput placeholder={"10"} style={{ fontSize: fontSize * 1.3 }}/>
              </View>
            </View>
          </View>

          <View style={{width: "100%", marginTop: 10}}>
            <Button text={"Speichern"}
                    backgroundColor={"black"}
                    color={"white"}
                    padding={16}
                    borderRadius={10}
                    fontSize={21}
                    onPress={() => this.handleClick(selectedRegions)} />
          </View>

        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const regions = Object.keys(state.exercises.stack)
  const { modalPickerValue, modalTextInputValue } = state.exercises
  const lrc = state.language.lrc
  return { regions, modalPickerValue, modalTextInputValue, lrc }
}

export default connect(mapStateToProps, {changeExerciseProp, addExercise})(ModalAddExercise)
