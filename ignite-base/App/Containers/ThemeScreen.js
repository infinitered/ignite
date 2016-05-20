import React, { PropTypes } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../Themes'
import { Images } from '../Themes'

// Styles
import styles from './Styles/ThemeScreenStyle'

// Colors
const colors = ['clear', 'ocean', 'deepOcean', 'wave', 'facebook', 'silver', 'steel', 'error', 'ricePaper', 'windowTint', 'panther', 'charcoal', 'coal', 'bloodOrange', 'bloodOrangeJuice']
// Fonts
const fonts = ['HelveticaNeue', 'HelveticaNeue-Bold', 'HelveticaNeue-Italic']
// Headings
const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
// Paragraphs
const paragraphs = ['lead', 'unclassified', 'secondary', 'tertiary']

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
      <Text style={[styles.fontRow, {fontFamily: font}]} key={font}>{font}</Text>
    )
  }

  renderFonts () {
    return fonts.map((font) => this.renderFont(font))
  }

  renderHeading (heading) {
    return (<Text style={[styles.fontRow, {...Fonts[heading]}]} key={heading}>{`This is a ${heading} heading!`}</Text>)
  }

  renderHeadings () {
    return headings.map((heading) => this.renderHeading(heading))
  }

  renderParagraph (paragraph) {
    return (<Text style={[styles.fontRow, {...Fonts[paragraph]}]} key={paragraph}>This is a {paragraph} paragraph.</Text>)
  }

  renderParagraphs () {
    return paragraphs.map((paragraph) => this.renderParagraph(paragraph))
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.sectionHeader} key='colors-header'>
          <Text style={styles.subtitle} key='colors'>Colors</Text>
        </View>
        <View style={styles.colorsContainer}>
          { this.renderColors() }
        </View>
        <View style={[styles.sectionHeader, {marginTop: 5}]} key='fonts-header'>
          <Text style={styles.subtitle} key='fonts'>Fonts</Text>
        </View>
        { this.renderFonts() }
        <View style={[styles.sectionHeader, {marginTop: 5}]} key='headings-header'>
          <Text style={styles.subtitle} key='headings'>Headings</Text>
        </View>
        { this.renderHeadings() }
        <View style={[styles.sectionHeader, {marginTop: 5}]} key='paragraphs-header'>
          <Text style={styles.subtitle} key='paragraphs'>Paragraphs</Text>
        </View>
        { this.renderParagraphs() }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(UsageExamplesScreen)
