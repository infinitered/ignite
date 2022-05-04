import { FlexStyle } from 'react-native'

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type SizePerCent = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 | 10

export interface CustomStyleProps extends FlexStyle {
  pd?: Spacing
  pdS?: Spacing
  pdE?: Spacing
  pdT?: Spacing
  pdL?: Spacing
  pdB?: Spacing
  pdR?: Spacing
  pdH?: Spacing
  pdV?: Spacing
  mg?: Spacing
  mgS?: Spacing
  mgE?: Spacing
  mgT?: Spacing
  mgL?: Spacing
  mgB?: Spacing
  mgR?: Spacing
  mgH?: Spacing
  mgV?: Spacing
  w?: SizePerCent
  h?: SizePerCent,
  mW?: SizePerCent
  mH?: SizePerCent
}

export interface ItemValue {
  id: number | string
  name: string
}

export interface DropDownItem {
  id: number | string
  title?: string
  subTitle?: string
  rightTitle?: string
}

/**
 * Image data
 *
 * @export
 * @interface Image
 */
export interface Image {
  id?: number;
  uri: string;
  name: string;
  type: string;
}

export interface File {
  id?: number;
  uri: string;
  name: string;
  type: string;
}

export enum CurrencyTypeEnum {
  Left = 0,
  Right = 1,
}

export enum ApplyOnlyOne {
  No = 0,
  Yes = 1
}

/// ///////////////////////// API //////////////////////

export interface CallConfig {
  secure?: boolean
}
