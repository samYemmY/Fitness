import React from "react"
import {View} from "react-native"

const Point = ({width, height, selected}) => (
  <View style={{
    backgroundColor: selected ? "rgb(133,148,164)" : "rgb(192,204,218)",
    width: width,
    height: height,
    borderRadius: 100
  }}/>
)

class PaginationIndicator extends React.Component
{
  render()
  {
    let points = []
    let {amount, indexSelected} = this.props
    for(let i = 0; i < amount; i++)
    {
      let selected = i === indexSelected
      points.push(<Point width={7} height={7} selected={selected} key={i}/>)
    }
    return (
      <View style={{flexDirection: "row", width: 55, justifyContent: "space-between"}}>
        {points}
      </View>
    )
  }
}

export {PaginationIndicator}
