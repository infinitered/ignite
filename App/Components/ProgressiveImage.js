/* Example Usage
  style={styles.imageStyles}
  source='http://stockphotos.com/photo1.jpg'
  thumbnail='http://stockphotos.com/thumbnail1.jpg'
*/

import React, { Image, Animated, View } from 'react-native'
// import { Images } from '../Themes'

export default class ProgressiveImage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      thumbnailOpacity: new Animated.Value(0)
    }
  }

  static propTypes = {
    key: React.PropTypes.string,
    thumbnail: React.PropTypes.string,
    source: React.PropTypes.string,
    style: React.PropTypes.number
  };

  mainImageLoad () {
    window.requestAnimationFrame((time) => {
      Animated.timing(this.state.thumbnailOpacity, {
        toValue: 0,
        duration: 250
      }).start()
    })
  }

  onThumbnailLoad () {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: 250
    }).start()
  }

  handleImage () {
    if (this.props.source || this.props.thumbnail) {
      return (
        <View>
          <Animated.Image
            resizeMode={'cover'}
            style={[{position: 'absolute'}, this.props.style]}
            source={{uri: this.props.source}}
            onLoad={this.mainImageLoad.bind(this)} />
          <Animated.Image
            resizeMode={'cover'}
            style={[{opacity: this.state.thumbnailOpacity}, this.props.style]}
            source={{uri: this.props.thumbnail}}
            onLoad={this.onThumbnailLoad.bind(this)} />
        </View>
      )
    } else {
      return (
        <Image style={this.props.style} resizeMode={'contain'} />
      )
    }
  }

  render () {
    return (
      <View
        width={this.props.style.width}
        height={this.props.style.height}
        backgroundColor={'#CCC'}
      >
      {this.handleImage()}
      </View>
    )
  }
}
