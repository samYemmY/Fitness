import React from "react"
import {Modal, Picker, View, Text, Button as NativeButton} from "react-native"
import {NavBar, TextInputLabel, Button, Section, Box} from "./common";
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
    return(
      <Modal {...this.props}>
        <View style={{height: "100%", backgroundColor: "rgba(255,255,255,0.75)", justifyContent: "center"}}>
          <Box style={styles.view}>
            <NavBar title={lrc.Modal.labelNavBar} />
              <Text style={styles.labelText}>{lrc.Modal.labelSelectRegion}</Text>
              <Picker selectedValue={modalPickerValue} onValueChange={(value) => this.onPickerValueChange(value)}>
                {this.renderPickerItems()}
              </Picker>
              <TextInputLabel label={lrc.Modal.labelExerciseName} value={modalTextInputValue} placeholder={"Bankdrücken"} onChangeText={(text) => this.onInputValueChange(text)}/>
              <Button onPress={this.onSave.bind(this)} color={"blue"} borderWidth={1} text={lrc.save}/>
              <Button onPress={this.onSave.bind(this)} color={"red"} borderWidth={1} text={lrc.cancel}/>
          </Box>
        </View>
      </Modal>
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
