import React, { PropTypes, Component } from 'react'
import Drawer from 'react-native-drawer'
import { DefaultRenderer, Actions as NavigationActions } from 'react-native-router-flux'
import DrawerContent from './DrawerContent'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'


class NavigationDrawer extends Component {
  static propTypes = {
    navigationState: PropTypes.object
  }

  render () {
    const children = this.props.navigationState.children
    return (
      <Drawer
        ref='navigation'
        type='displace'
        content={
          <DrawerContent
            componentExamples={this.props.componentExamples}
            usageExamples={this.props.usageExamples}
            apiTesting={this.props.apiTesting}
            theme={this.props.theme}
            deviceInfo={this.props.deviceInfo}
            />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    componentExamples: NavigationActions.componentExamples,
    usageExamples: NavigationActions.usageExamples,
    apiTesting: NavigationActions.apiTesting,
    theme: NavigationActions.theme,
    deviceInfo: NavigationActions.deviceInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
