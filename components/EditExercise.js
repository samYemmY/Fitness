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
  static navigationOptions = ({navigation: {state}}) => ({
        title: "Details",
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff"
  })

  saveValues()
  {
    const {weight, reps, sets, note, selectedExercise, store} = this.props
    this.props.changeEditExercise("store",{...store,[selectedExercise]:{weight,reps,sets,note}})
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
    //let {item, reps, weight, sets, notes, icon} = this.props.navigation.state.params
    let item = "S-Z-Stange Langhantel Frei"; let reps=10; let weight=25; let sets=3; let icon=Images.biceps
    return(
      <ScrollView style={{ padding: 20, backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: "gray", paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ flex: 4 }}><Text style={{ fontSize: 25, fontWeight: "bold"}}>{item}</Text></View>
        </View>

        <View style={{ marginTop: 40 }}>
          <View><Text style={{ fontWeight: "bold" }}>Gewicht (kg)</Text></View>
          <View style={{ flexDirection: "row", width: "100%", height: 110 }}>
            <View style={{ flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <View style={{ flex: 1, alignItems: "center" }}><Image source={Images.weight} style={{ width: 40, height: 40 }} /></View>
              <View style={{ flex: 3, alignItems: "center" }}><TextInput onChangeText={} style={{ fontSize: 21, borderBottomWidth: 0.5, width: 175 }} placeholder={"50"} /></View>
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
              <View style={{ flex: 3, alignItems: "center" }}><TextInput style={{ fontSize: 21, borderBottomWidth: 0.5, width: 175 }} placeholder={"10"} /></View>
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
              <View style={{ flex: 3, alignItems: "center"}}><TextInput style={{ fontSize: 21, borderBottomWidth: 0.5, width: 175 }} placeholder={"3"} /></View>
            </View>
            <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
              <TouchableImage source={Images.plus} width={25} height={25} style={ styles.shadow }/>
              <TouchableImage source={Images.minus} width={25} height={25} style={ styles.shadow }/>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center", width: "100%", marginTop: 25 }}>
          <View style={{ width: "75%", height: 120 }}>
            <Button text={"Speichern"} backgroundColor={"black"} color={"white"} padding={15} borderRadius={10} fontSize={19} fontWeight={"bold"}  style={ styles.shadow } onPress={() => {}}/>
          </View>
        </View>
      </ScrollView>
        )
  }
}

const mapStateToProps = (state, ownProps) => ({

})

export default connect(mapStateToProps,{changeEditExercise})(EditExercise)