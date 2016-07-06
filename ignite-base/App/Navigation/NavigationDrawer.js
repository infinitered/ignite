import React, { PropTypes, Component } from 'react'
import Drawer from 'react-native-drawer'
import { DefaultRenderer } from 'react-native-router-flux'
import DrawerContent from '../Containers/DrawerContent'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Styles from './Styles/NavigationDrawerStyle'

/********************
* Documentation: https://github.com/root-two/react-native-drawer
********************/

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
        content={<DrawerContent />}
        styles={Styles}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
