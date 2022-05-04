import React, { FunctionComponent } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ViewStyle,
  TextStyle
} from 'react-native';
import { NativeIcon, Text, View } from '..';
import { color, spacing } from '../../theme';
import { useSafeArea } from 'react-native-safe-area-context';

const MODAL_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: 'rgba(0,0,0,0.4)',
  zIndex: 4
};

const CONTENT_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingVertical: spacing[2],
  width: '100%'
};

const BUTTON_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[2],
  alignItems: 'center'
};
const BUTTON_TEXT: TextStyle = {
  fontWeight: '500',
  marginStart: spacing[5]
};

interface PickerImageAlertProps {
  onPressCamera: () => void;
  onPressGalery: () => void;
  onPressClose: () => void;
  visible?: boolean;
}

export const PhotoPickerAlert: FunctionComponent<PickerImageAlertProps> = ({
  onPressCamera,
  onPressGalery,
  onPressClose,
  visible
}: PickerImageAlertProps) => {
  const insets = useSafeArea()

  return (
    <Modal
      animated
      animationType="fade"
      transparent
      visible={visible}
    >
      <TouchableWithoutFeedback onPress={onPressClose}>
        <View style={MODAL_CONTAINER}>
          <TouchableWithoutFeedback>
            <View style={[CONTENT_CONTAINER, { paddingBottom: insets.bottom + spacing[2] }]}>
              <TouchableOpacity
                onPress={onPressCamera}
                style={BUTTON_CONTAINER}
              >
                <NativeIcon
                  directory="AntDesign"
                  name="camera"
                  size={30}
                />
                <Text
                  style={BUTTON_TEXT}
                  text="Prendre photo"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressGalery}
                style={BUTTON_CONTAINER}
              >
                <NativeIcon
                  directory="AntDesign"
                  name="picture"
                  size={30}
                />
                <Text
                  style={BUTTON_TEXT}
                  text="Choisir photo"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressClose}
                style={BUTTON_CONTAINER}
              >
                <NativeIcon
                  directory="AntDesign"
                  name="close"
                  size={30}
                />
                <Text
                  style={BUTTON_TEXT}
                  text="Annuler"
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
