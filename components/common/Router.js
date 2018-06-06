import React from "react"
import {View, Button, Text, Animated, Dimensions} from "react-native"
import NavBar from "./NavBar"
import {PaginationIndicator} from "./PaginationIndicator";

class Router extends React.Component
{
  constructor(props)
  {
    super(props)
    this.goToViewIndex = this.goToViewIndex.bind(this)
    this.goToViewKey = this.goToViewKey.bind(this)
    this.goToNext = this.goToNext.bind(this)
    this.goToPrevious = this.goToPrevious.bind(this)
    this.state={
      views: null,
      selectedView: null
    }
  }

  componentWillMount()
  {
    let newViews = []
    for(let view of [...this.props.children])
    {
      newViews.push(this.assignProps(view))
    }
    const initialView = this.getInitialView(newViews)
    this.setState({views: newViews, selectedView: initialView})
  }

  componentDidUpdate()
  {
    console.log(this.state)
  }

  componentDidMount()
  {

  }

  goToViewIndex(index)
  {
    const {selectedView, views} = this.state
    if(index >= views.length || index < 0){ console.log("index is out of range. index: " + index); return false }
    this.setState({ selectedView: views[index] })
  }

  goToViewKey(key, animationType = "")
  {
    this.setState({selectedView: this.getViewByKey(key)})
  }

  getViewByKey(key)
  {
    let ret = null
    this.state.views.map((view) => {
      if(view.key === key) ret = view
    })
    return ret
  }

  goToNext()
  {
    const {selectedView, views} = this.state
    let viewIndex = views.indexOf(selectedView)
    this.goToViewIndex(++viewIndex)
  }

  goToPrevious()
  {
    const {selectedView, views} = this.state
    console.log(selectedView)
    let viewIndex = views.indexOf(selectedView)
    this.goToViewIndex(--viewIndex)
  }

  assignProps(view)
  {
    let props = {router: {goToNext: this.goToNext, goToPrevious: this.goToPrevious, goToViewIndex: this.goToViewIndex, goToViewKey: this.goToViewKey}}
    if(view.props.children === undefined)
    {
      return React.cloneElement(view, props)
    }
    else if(view.props.children[0] === undefined)
    {
      let newChild = React.cloneElement(view.props.children)
      newChild = this.assignProps(newChild)
      return React.cloneElement(view, props, newChild)
    }
    else
      {
        let newChildren = []
        for(let child of view.props.children)
        {
          if(React.isValidElement(child))
          {
            let newChild = React.cloneElement(child)
            newChild = this.assignProps(newChild)
            newChildren.push(newChild)
          }
        }
        return React.cloneElement(view, props, ...newChildren)
    }
  }

  getInitialView(views)
  {
    let initial = null
    for(let view of views)
    {
      if(view.props["initial"])
      {
        if(initial == null)
        {
          initial = view
        }
        else
          {
            throw new Error("Router has multiple initial views.")
          }
      }
    }
    return initial
  }

  render()
  {
    return(
      <View>
        {this.state.selectedView}
      </View>
    )
  }
}

export {Router}