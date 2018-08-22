import React from "react"
import {View, Text, TextInput, Picker} from "react-native";
import {connect} from "react-redux"
import {selectLanguage} from "../actions/languageActions";
import {Button} from "./common";
import Images from "./Images";

class Settings extends React.Component
{
  static navigationOptions = ({navigation: {state}}) =>{
    if (state.params && state.params.title)
    {
      return {
        title: state.params.title,
        headerBackTitle: "",
      }
    }
  }

  renderPickerItems()
  {
    const languages = this.props.languages;
    console.log(languages);
    let ret = [];
    for(let language in languages)
    {
      ret.push(<Picker.Item label={languages[language]} value={language} key={language}/>)
    }
    return ret;
  }

  render()
  {
    const fontSize = 16;
    return(
      <View style={{height: "100%", backgroundColor: "rgb(255,255,255)", padding: 20}}>
        <View>
          <Text style={{ fontSize, fontFamily: "Lato-Black", color: "black" }}>{this.props.lrc.Settings.labelSelectLanguage}</Text>
        </View>
        <Picker itemStyle={{ borderWidth: 0.5, height: 150, marginTop: 20 }} selectedValue={this.props.selectedLanguage} onValueChange={(itemValue) => { this.props.selectLanguage(itemValue); }}>
          {this.renderPickerItems()}
        </Picker>

        <View style={{width: "100%", marginTop: 30}}>
          <Button text={this.props.lrc.back}
                  backgroundColor={"black"}
                  color={"white"}
                  padding={16}
                  borderRadius={10}
                  fontSize={21}
                  onPress={() => this.props.navigation.navigate("BodyRegionSelection")} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  lrc: state.language.lrc,
  selectedLanguage: state.language.selectedLanguage,
  languages: state.language.languages
})

export default connect(mapStateToProps, {selectLanguage})(Settings)
