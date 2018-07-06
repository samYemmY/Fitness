import React from "react"
import {TextInputLabel, Button, Section, NavBar, TextBox, TouchableImage, ProgressBar} from "./common";
import Images from "./Images"
import {TextInput, View, Dimensions, Text, Button as NativeButton, Image, ScrollView} from "react-native"
import {connect} from "react-redux"
import {changeEditExercise} from "../actions/editExerciseActions";

const styles = {
  view:           {
    height:          Dimensions.get("window").height,
    backgroundColor: "white"
  },
  section:        {},
  buttonView:     {
    marginTop: 10
  },
  sectionTextBox: {
    height: 200
  },
  labelText:      {
    paddingLeft:   20,
    paddingTop:    15,
    paddingBottom: 15
  },
  shadow:         {
    shadowColor:   '#000',
    shadowOffset:  {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius:  1
  },
  shadowButton: {
    shadowColor:   '#000',
    shadowOffset:  {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius:  2
  }
}

class EditExercise extends React.Component {
  state = {
    weight:  null,
    reps:    null,
    sets:    null,
    selectedExercise: null,
    loading: true
  }

  static navigationOptions = ({navigation: {state}}) => ({
    title: "Details"
  })

  componentWillMount()
  {
    this.setState({
      ...this.props.navigation.state.params,
      loading: false
    })
  }

  componentDidMount()
  {
    console.log(this.state)
  }

  saveValues()
  {
    const {weight, reps, sets, selectedExercise} = this.state
    this.props.changeEditExercise("store", {...this.props.store, [selectedExercise]: {weight, reps, sets}})
    this.props.navigation.navigate("ExerciseList")
  }

  deleteExercise()
  {
    const {store, stack, selectedRegion, selectedExercise} = this.props
    if (store[selectedExercise])
    {
      delete store[selectedExercise]
    }
    let dataIndex = stack[selectedRegion].data.indexOf(selectedExercise)
    if (dataIndex !== -1)
    {
      stack[selectedRegion].data.splice(dataIndex, 1)
    }
    this.props.router.goToPrevious()
  }

  changeValue(prop, value)
  {
    this.setState({
      [prop]: value
    })
  }

  incrementValue(prop)
  {
    this.setState(prevState => ({
      [prop]: ++prevState[prop]
    }))
  }

  decrementValue(prop)
  {
    this.setState(prevState => ({
      [prop]: --prevState[prop]
    }))
  }

  renderLoading()
  {
    return (
      <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
        <ProgressBar color={"black"} size={"large"}/>
      </View>
    )
  }

  renderView()
  {
    const {weight, reps, sets, selectedExercise} = this.state
    return (
      <View style={{padding: 20, backgroundColor: "white"}}>
        <View style={{
          flexDirection:  "row",
          justifyContent: "center",
          alignItems:     "center",
          borderColor:    "gray",
          paddingLeft:    10,
          paddingRight:   10
        }}>
          <View style={{flex: 4}}><Text style={{fontSize: 21, fontWeight: "bold"}}>{selectedExercise}</Text></View>
        </View>

        <View style={{ paddingLeft: 10}}>
          <View style={{marginTop: 40, borderBottomWidth: 0.5, borderColor: "gray"}}>
            <View><Text style={{fontWeight: "bold"}}>Gewicht (kg)</Text></View>
            <View style={{flexDirection: "row", width: "100%", height: 95}}>
              <View style={{flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <View style={{flex: 1, alignItems: "center"}}>
                  <Image source={Images.weight} style={{width: 30, height: 30}}/>
                </View>
                <View style={{flex: 3, alignItems: "center"}}>
                  <TextInput value={weight.toString()} keyboardType={"numeric"} onChangeText={(weight) => this.changeValue("weight", weight)} style={{ fontSize:  28, width: 175, fontFamily: "Lato-Light" }} placeholder={"50"}/>
                </View>
              </View>
              <View style={{flex: 1, justifyContent: "space-around", alignItems: "center"}}>
                <TouchableImage source={Images.plus} width={25} height={25} onPress={() => this.incrementValue("weight")}/>
                <TouchableImage source={Images.minus} width={25} height={25} onPress={() => this.decrementValue("weight")}/>
              </View>
            </View>
          </View>

          <View style={{ borderBottomWidth: 0.5, borderColor: "gray", marginTop: 20 }}>
            <View>
              <Text style={{fontWeight: "bold"}}>Wiederholungen</Text>
            </View>
            <View style={{flexDirection: "row", width: "100%", height: 95}}>
              <View style={{flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <View style={{flex: 1, alignItems: "center"}}>
                  <Image source={Images.reps} style={{width: 30, height: 30}}/>
                </View>
                <View style={{flex: 3, alignItems: "center"}}>
                  <TextInput value={reps.toString()} keyboardType={"numeric"} onChangeText={(reps) => this.changeValue("reps", reps)} style={{fontSize: 28, width: 175, fontFamily: "Lato-Light" }} placeholder={"10"}/></View>
              </View>
              <View style={{flex: 1, justifyContent: "space-around", alignItems: "center"}}>
                <TouchableImage source={Images.plus} width={25} height={25} onPress={() => this.incrementValue("reps")}/>
                <TouchableImage source={Images.minus} width={25} height={25} onPress={() => this.decrementValue("reps")}/>
              </View>
            </View>
          </View>

          <View style={{ borderBottomWidth: 0.5, marginTop: 20, borderColor: "gray" }}>
            <View><Text style={{fontWeight: "bold"}}>Sets</Text></View>
            <View style={{flexDirection: "row", width: "100%", height: 95}}>
              <View style={{flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <View style={{flex: 1, alignItems: "center"}}><Image source={Images.sets} style={{width: 40, height: 40}}/></View>
                <View style={{flex: 3, alignItems: "center"}}>
                  <TextInput value={sets.toString()} keyboardType={"numeric"} onChangeText={(sets) => this.changeValue("sets", sets)} style={{fontSize: 28, width: 175, fontFamily: "Lato-Light" }} placeholder={"3"}/>
                </View>
              </View>
              <View style={{flex: 1, justifyContent: "space-around", alignItems: "center"}}>
                <TouchableImage source={Images.plus} width={25} height={25} onPress={() => this.incrementValue("sets")}/>
                <TouchableImage source={Images.minus} width={25} height={25} onPress={() => this.decrementValue("sets")}/>
              </View>
            </View>
          </View>
      </View>

        <View style={{alignItems: "center", width: "100%", marginTop: 38}}>
          <View style={{width: "100%", height: 120}}>
            <Button text={"Speichern"} onPress={this.saveValues.bind(this)} backgroundColor={"black"} color={"white"} padding={16} borderRadius={10} fontSize={21} fontWeight={"bold"}/>
          </View>
        </View>
      </View>
    )
  }
˝¸˝
  render()
  {
    return this.state.loading ? this.renderLoading() : this.renderView()
  }
}


const mapStateToProps = (state, ownProps) =>{
  return state.editExercise
}

export default connect(mapStateToProps,{changeEditExercise})(EditExercise);
