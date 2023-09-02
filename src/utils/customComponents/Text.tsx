import React, {Component} from 'react';

import {
  RecursiveArray,
  Text as TextRN,
  TextProps,
  TextStyle,
} from 'react-native';

interface Props extends TextProps {
  style?: RecursiveArray<TextStyle> | TextStyle;
  weight?:
    | 'bold'
    | 'bold-italic'
    | 'semi-bold'
    | 'semi-bold-italic'
    | 'italic'
    | 'regular'
    | 'medium';
}
export default class Text extends Component<Props, {}> {
  static getFont(weight?: string) {
    let fontFamily;
    switch (weight) {
      case 'bold':
        fontFamily = 'Inter-Bold';
        break;
      case 'bold-italic':
        fontFamily = 'Inter-Bold';
        break;
      case 'semi-bold':
        fontFamily = 'Inter-SemiBold';
        break;
      case 'semi-bold-italic':
        fontFamily = 'Inter-SemiBold';
        break;
      case 'italic':
        fontFamily = 'Inter-Regular';
        break;
      case 'regular':
        fontFamily = 'Inter-Regular';
        break;
      case 'medium':
        fontFamily = 'Inter-Medium';
        break;
      default:
        fontFamily = 'Inter-Medium';
        break;
    }
    return fontFamily;
  }

  render() {
    const {style, weight, children, ...restProps} = this.props;
    return (
      <TextRN
        {...restProps}
        allowFontScaling={false}
        style={[{fontFamily: Text.getFont(weight), letterSpacing: 0}, style]}>
        {children}
      </TextRN>
    );
  }
}
