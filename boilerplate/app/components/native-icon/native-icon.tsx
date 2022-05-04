import React, { FunctionComponent } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { NativeIconProps } from './native-icon.props';

/**
 * Native Icon component
 *
 * @param {NativeIconProps} {
 *   name,
 *   directory,
 *   size,
 *   color,
 *   ...rest
 * }
 * @returns
 */
export const NativeIcon: FunctionComponent<NativeIconProps> = ({
  name,
  directory,
  size,
  color,
  ...rest
}: NativeIconProps) => {
  if (!name) {
    return null;
  }
  switch (directory) {
    case 'Ionicons': {
      return <Ionicons
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'AntDesign': {
      return <AntDesign
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'Entypo': {
      return <Entypo
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'Feather': {
      return <Feather
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'FontAwesome': {
      return <FontAwesome
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'FontAwesome5': {
      return <FontAwesome5
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'MaterialCommunityIcons': {
      return (
        <MaterialCommunityIcons
          color={color}
          name={name}
          size={size}
          {...rest}
        />
      );
    }

    case 'SimpleLineIcons': {
      return (
        <SimpleLineIcons
          color={color}
          name={name}
          size={size}
          {...rest}
        />
      );
    }

    case 'Foundation': {
      return <Foundation
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'Fontisto': {
      return <Fontisto
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'EvilIcons': {
      return <EvilIcons
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'Octicons': {
      return <Octicons
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'MaterialIcons': {
      return <MaterialIcons
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    case 'Zocial': {
      return <Zocial
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
    }

    default:
      return <Ionicons
        color={color}
        name={name}
        size={size}
        {...rest}
      />;
  }
};
