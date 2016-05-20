import React, { PropTypes } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts, Images } from '../Themes'
import R from 'ramda'

// Styles
import styles from './Styles/ThemeScreenStyle'

// Colors
const colors = R.keys(Colors)
// Font Types
const types = R.keys(Fonts.type)
// Font Styles
const fontStyles = R.keys(Fonts.style)

export default class UsageExamplesScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  renderColor (color) {
    return (
      <View style={styles.colorContainer} key={`${color}Container`}>
        <View style={styles.backgroundContainer} key={`${color}BackgroundContainer`}>
          <Image style={styles.backgroundImage} source={Images.tile_bg} key={`${color}BackgroundImage`} />
          <View style={[styles.colorSquare, {backgroundColor: Colors[color]}]} key={`${color}Square`} />
        </View>
        <Text style={styles.colorName} key={`${color}Text`}>{color}</Text>
      </View>
    )
  }

  renderColors () {
    return colors.map((color) => this.renderColor(color))
  }

  renderFont (font) {
    return (
      <Text style={[styles.fontRow, {fontFamily: Fonts.type[font]}]} key={font}>{
        `${font}: ${Fonts.type[font]}`
      }</Text>
    )
  }

  renderFonts () {
    return types.map((font) => this.renderFont(font))
  }

  renderStyle (fontStyle) {
    return (<Text style={[styles.fontRow, {...Fonts.style[fontStyle]}]} key={fontStyle}>{`This is ${fontStyle} style`}</Text>)
  }

  renderStyles () {
    return fontStyles.map((fontStyle) => this.renderStyle(fontStyle))
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.sectionHeader} key='colors-header'>
          <Text style={styles.subtitle} key='colors'>Colors</Text>
        </View>
        <View style={styles.colorsContainer}>
          {this.renderColors()}
        </View>
        <View style={[styles.sectionHeader, {marginTop: 5}]} key='types-header'>
          <Text style={styles.subtitle} key='types'>Fonts</Text>
        </View>
        {this.renderFonts()}
        <View style={[styles.sectionHeader, {marginTop: 5}]} key='fontStyles-header'>
          <Text style={styles.subtitle} key='fontStyles'>Styles</Text>
        </View>
        {this.renderStyles()}

      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(UsageExamplesScreen)
