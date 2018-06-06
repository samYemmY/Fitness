import React from "react"
import {TextInputLabel, Button, Section, NavBar, TextBox, TouchableImage} from "./common";
import Images from "./Images"
import {TextInput, View, Dimensions, Text, Button as NativeButton, Image, ScrollView} from "react-native"
import {connect} from "react-redux"
import {changeEditExercise} from "../actions/editExerciseActions";

const styles = {
  view: {
    height: Dimensions.get("window").height,
    backgroundColor: "white"
  },
  section: {

  },
  buttonView: {
    marginTop: 10
  },
  sectionTextBox: {
    height: 200
  },
  labelText: {
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  }
}

class EditExercise extends React.Component
{
  state = {
    weight: null,
    reps: null,
    sets: null,
    item: null
  }

  static navigationOptions = ({navigation: {state}}) => ({
        title: "Details",
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff"
  })

  componentWillMount()
  {
    const {store} = this.props
    const {item} = this.props.navigation.state.params
    if(!store[item])
    {
      const {weight, reps, sets} = this.props
      this.props.changeEditExercise("store",{...store, [item]:{weight, reps, sets, selectedExercise: item}})
    }
  }

  saveValues()
  {
    const {weight, reps, sets, selectedExercise, store} = this.props
    this.props.changeEditExercise("store",{...store,[item]:{weight,reps,sets}})
  }

  deleteExercise()
  {
    const {store, stack, selectedRegion, selectedExercise} = this.props
    if(store[selectedExercise])
    {
      delete store[selectedExercise]
    }
    let dataIndex = stack[selectedRegion].data.indexOf(selectedExercise)
    if(dataIndex !== -1)
    {
      stack[selectedRegion].data.splice(dataIndex,1)
    }
    this.props.router.goToPrevious()
  }

  render()
  {
    let {selectedExercise, reps, weight, sets} = this.props.store[this.props.navigation.state.params.item]
    return(
      <ScrollView style={{ padding: 20, backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: "gray", paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ flex: 4 }}><Text style={{ fontSize: 25, fontWeight: "bold"}}>{selex}</Text></View>
        </View>

        <View style={{ marginTop: 40 }}>
          <View><Text style={{ fontWeight: "bold" }}>Gewicht (kg)</Text></View>
          <View style={{ flexDirection: "row", width: "100%", height: 110 }}>
            <View style={{ flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <View style={{ flex: 1, alignItems: "center" }}><Image source={Images.weight} style={{ width: 40, height: 40 }} /></View>
              <View style={{ flex: 3, alignItems: "center" }}><TextInput value={this.props.weight.toString()} keyboardType={"numeric"} onChangeText={(weight) => this.props.changeEditExercise("weight", weight)} style={{ fontSize: 21, borderBottomWidth: 0.5, width: 175 }} placeholder={"50"} /></View>
            </View>
            <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
              <TouchableImage source={Images.plus} width={25} height={25} style={styles.shadow}/>
              <TouchableImage source={Images.minus} width={25} height={25} style={styles.shadow}/>
            </View>
          </View>
        </View>

        <View>
          <View><Text style={{ fontWeight: "bold" }}>Wiederholungen</Text></View>
          <View style={{ flexDirection: "row", width: "100%", height: 110 }}>
            <View style={{ flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <View style={{ flex: 1, alignItems: "center" }}><Image source={Images.reps} style={{ width: 40, height: 40 }} /></View>
              <View style={{ flex: 3, alignItems: "center" }}><TextInput value={this.props.reps.toString()} keyboardType={"numeric"} onChangeText={(reps) => this.props.changeEditExercise("reps", reps)} style={{ fontSize: 21, borderBottomWidth: 0.5, width: 175 }} placeholder={"10"} /></View>
            </View>
            <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
              <TouchableImage source={Images.plus} width={25} height={25} style={ styles.shadow }/>
              <TouchableImage source={Images.minus} width={25} height={25} style={ styles.shadow }/>
            </View>
          </View>
        </View>

        <View>
          <View><Text style={{ fontWeight: "bold" }}>Sets</Text></View>
          <View style={{ flexDirection: "row", width: "100%", height: 110 }}>
            <View style={{ flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <View style={{ flex: 1, alignItems: "center" }}><Image source={Images.sets} style={{ width: 50, height: 50 }} /></View>
              <View style={{ flex: 3, alignItems: "center"}}><TextInput value={this.props.sets.toString()} keyboardType={"numeric"} onChangeText={(sets) => this.props.changeEditExercise("sets", sets)} style={{ fontSize: 21, borderBottomWidth: 0.5, width: 175 }} placeholder={"3"} /></View>
            </View>
            <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
              <TouchableImage source={Images.plus} width={25} height={25} style={ styles.shadow }/>
              <TouchableImage source={Images.minus} width={25} height={25} style={ styles.shadow }/>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center", width: "100%", marginTop: 25 }}>
          <View style={{ width: "75%", height: 120 }}>
            <Button text={"Speichern"} onPress={this.saveValues} backgroundColor={"black"} color={"white"} padding={15} borderRadius={10} fontSize={19} fontWeight={"bold"}  style={ styles.shadow }/>
          </View>
        </View>
      </ScrollView>
        )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {store: state.editExercise.store}
}

export default connect(mapStateToProps,{changeEditExercise})(EditExercise)