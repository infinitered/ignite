import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './Styles/SearchBarStyle'
import { connect } from 'react-redux'
// import Actions from '../Actions/Creators'
import I18n from 'react-native-i18n'
import { Colors, Metrics } from '../Themes/'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import R from 'ramda'

class SearchBar extends React.Component {

  static propTypes = {
    onPress: React.PropTypes.func,
    onCancelPress: React.PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      searchText: this.props.searchText,
      onSearch: this.props.onSearch
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.searchText !== newProps.searchText) {
      this.setState({
        searchText: newProps.searchText
      })
    }
  }

  shouldComponentUpdate (newProps, newState) {
    return R.not(R.equals(this.state, newState)) || R.not(R.equals(this.props, newProps))
  }

  handleChange = (searchText) => {
    this.setState({searchText})
    if (searchText.length < 3) {
      // this.props.clearSearch()
    } else {
      setTimeout(() => {
        this.refs.searchText.props.onSubmitEditing(this.state.searchText)
      }, 300)
    }
  }

  get value () {
    return this.state.searchText
  }

  handleCancelSearch = () => {
    this.props.onCancelPress()
    // this.props.hideSearchModal()
    // this.props.clearSearch()
    this.refs.searchText.clear()
  }

  handleSearch () {
    // this.props.performSearch(this.state.searchText)
    // this.props.showSearchModal()
    this.props.setSearchStatus(true)
  }

  render () {
    return (
      <Animatable.View animation='slideInRight' duration={250} style={styles.container}>
        <TextInput
          ref='searchText'
          autoFocus
          placeholder={I18n.t('search')}
          placeholderTextColor={Colors.snow}
          underlineColorAndroid='transparent'
          style={styles.searchInput}
          value={this.state.searchText}
          onChangeText={(text) => this.handleChange(text)}
          onSubmitEditing={() => this.handleSearch()}
          returnKeyType={'done'}
          autoCorrect={false}
          clearButtonMode='unless-editing'
          clearButtonColor='red'
          selectionColor={Colors.snow}
        />
        <View style={styles.searchIconContainer}>
          <Icon
            name='search'
            size={Metrics.icons.tiny}
            style={styles.searchIcon}
          />
        </View>
        <TouchableOpacity onPress={this.handleCancelSearch} style={styles.cancelButton}>
          <Text style={styles.buttonLabel}>Cancel</Text>
        </TouchableOpacity>
      </Animatable.View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // performSearch: (searchTerm) => dispatch(Actions.search(searchTerm)),
    // setSearchStatus: (searchStatus) => dispatch(Actions.setSearchStatus(searchStatus)),
    // clearSearch: () => dispatch(Actions.clearSearch()),
    // showSearchModal: () => dispatch(Actions.showSearchModal()),
    // hideSearchModal: () => dispatch(Actions.hideSearchModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
