import { Options } from 'react-native-image-crop-picker';
import { Platform, Dimensions } from 'react-native';
import { ItemValue } from './types';

export const API_TOKEN_STORAGE_KEY = '@gapp-token'

export const REFERENCE_STORAGE_KEY = '@app-reference'

export const SEATS_IO_TOKEN_STORAGE_KEY = '@app-seats-io-token'

export const NOTIF_ENABLED_STORAGE_KEY = '@gapp-notif-enabled'

export const isIos = Platform.OS === 'ios'

export const deviceSize = Dimensions.get('window')

export const BOTTOM_NAV_HEIGHT = 56

export const HEADER_HEIGHT = 74

export const MEDIUM_HEADER_HEIGHT = 84

export const BIG_HEADER_HEIGHT = 122

export const PICKER_IMAGE_CONFIG: Options = {
  width: 800,
  height: 800,
  compressImageMaxWidth: 800,
  compressImageMaxHeight: 800,
  mediaType: 'photo',
  cropping: false
};

export const MAX_SIZE = 4000000;
export const ERROR_SIZE = 'La taille maximale du fichier est 4 MB';
export const MAX_IMAGES_SIZE = 6;
export const MAX_IMAGES_SIZE_ERROR = 'Le nombre maximal des images est 6';

export const regexes = {
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
}

export const errorMessages = {
  required: 'Ce champ est obligatoire.',
  passwrod: 'Le mot de passe doit avoir au moins 8 caractères.',
  confirmPassword: 'Veuillez fournir encore la même valeur.',
  email: 'Veuillez fournir une adresse électronique valide.',
  internetError: 'Erreur de connexion à internet.',
  timeoutError: 'Le service est momentanément indisponible.\nVeuillez réessayer ultérieurement.'
}

/// /////////////////////////////// FAKE DATA /////////////////////////////////////////

export const FAKE_LANGS: ItemValue[] = [
  {
    id: 1,
    name: 'Arabe'
  },
  {
    id: 2,
    name: 'Français'
  },
  {
    id: 3,
    name: 'Anglais'
  }
]

/// /////////////////////////////// FAKE DATA /////////////////////////////////////////
