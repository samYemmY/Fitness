import React, {Component} from 'react';
import {
  Text,
  View,
  AppState,
  AsyncStorage,
  LayoutAnimation,
  YellowBox
} from 'react-native';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from "./reducers"
import {Router, EaseOut} from "./components/common"
import ModalAddExercise  from "./components/ModalAddExercise"
import BodyRegionSelection from "./components/BodyRegionSelection"
import ExerciseList from "./components/ExerciseList"
import EditExercise from "./components/EditExercise"
import Home from "./components/Home"
import {createStackNavigator} from 'react-navigation';

const RootStack = createStackNavigator({
  BodyRegionSelection: {
    screen: BodyRegionSelection,
    navigationOptions: {
      headerBackTitle: " "
    }
  },
  ExerciseList:        {
    screen: ExerciseList,
    navigationOptions: {
      headerBackTitle: " "
    }
  },
  EditExercise:        {
    screen: EditExercise,
    navigationOptions: {
      headerBackTitle: " "
    }
  },
  ModalAddExercise: {
    screen: ModalAddExercise,
    navigationOptions: {
      headerBackTitle: " "
    }
  }
}, {

  initialRouteName: "BodyRegionSelection",

  navigationOptions: {
    headerStyle:      {
      backgroundColor: 'black',
    },
    headerTintColor:  '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitle: ""
  }
})

let store = createStore(reducers)

export default class App extends Component<Props> {

  constructor(props)
  {
    super(props)
    this.state = {
      isStoreLoading: false,
      store:          store,
      persistance:    false
    }
  }

  componentWillMount()
  {
    if (this.state.persistance)
    {
      AppState.addEventListener('change', this.handleAppStateChange.bind(this));
      this.setState({isStoreLoading: true});
      AsyncStorage.getItem('completeStore').then((value) =>{
        if (value && value.length)
        {
          let initialStore = JSON.parse(value)
          this.setState({store: createStore(reducers, initialStore)});
        }
        else
        {
          this.setState({store: store});
        }
        this.setState({isStoreLoading: false});
      }).catch((error) =>{
        this.setState({store: store});
        this.setState({isStoreLoading: false});
      })
    }
    else
    {
      this.setState({store: store})
    }
    YellowBox.ignoreWarnings(['Warning: isMounted(...)', "Remote debugger",
                              "Warning: Cannot update during an existing state transition"
    ]);
  }

  componentDidMount()
  {
    console.log(this.state.store.getState())
  }

  componentWillUnmount()
  {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }

  handleAppStateChange()
  {
    let storingValue = JSON.stringify(this.state.store.getState())
    AsyncStorage.setItem('completeStore', storingValue);
  }

  render()
  {
    if (this.state.isStoreLoading)
    {
      return <Text>Loading Store ...</Text>
    }
    else
    {
      return (
        <Provider store={this.state.store}>
          <RootStack/>
        </Provider>
      )
    }
  }
}
