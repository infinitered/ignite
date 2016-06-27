import React, { PropTypes } from 'react'
import { View, Navigator, StatusBar } from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import { Provider } from 'react-redux'
import Actions from './Actions/Creators'
import Drawer from 'react-native-drawer'
import DebugSettings from './Config/DebugSettings'
import DrawerContent from './Components/DrawerContent'
// import './Config/PushConfig'

// Styles
import styles, {drawerStyles} from './Containers/Styles/RootStyle'

export default class Root extends React.Component {
  constructor (props) {
    super(props)
    this.handlePushRoute = this.handlePushRoute.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
  }

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { dispatch } = this.props.store
    dispatch(Actions.startup())
  }

  componentDidMount () {
    this.refs.drawerContent.navigator = this.navigator
    this.navigator.drawer = this.refs.drawer
  }

  handlePushRoute (route) {
    this.navigator.push(route)
    this.closeDrawer()
  }

  renderDrawerContent () {
    return (
      <DrawerContent ref='drawerContent' onPushRoute={this.handlePushRoute} onClose={this.closeDrawer} />
    )
  }

  closeDrawer () {
    this.refs.drawer.close()
  }

  renderApp () {
    console.disableYellowBox = !DebugSettings.yellowBox
    return (
      <Provider store={this.props.store}>
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />

          <Drawer
            ref='drawer'
            content={this.renderDrawerContent()}
            styles={drawerStyles}
            openDrawerOffset={100}
            type='overlay'
            tapToClose
            panOpenMask={0.05}
            panCloseMask={0.3}
          >
            <Navigator
              ref={(ref) => { this.navigator = ref }}
              initialRoute={Routes.PresentationScreen}
              configureScene={Router.configureScene}
              renderScene={Router.renderScene}
              navigationBar={NavigationBar.render()}
              style={styles.container}
            />
          </Drawer>
        </View>
      </Provider>
    )
  }

  render () {
    return this.renderApp()
  }
}
