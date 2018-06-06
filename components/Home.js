import React from "react";
import {connect} from "react-redux"
import {ProgressBar} from "./common";

class Home extends React.Component
{
  componentWillMount(){

    this.props.navigation.navigate("BodyRegionSelection",{title: this.props.lrc.BodyRegionSelection.title})
  }

  render(){
    return <ProgressBar color={"#007aff"} size={"large"}/>
  }
}

const mapStateToProps = (state, ownProps) => ({
  lrc: state.language.lrc
})

export default connect(mapStateToProps,null)(Home)