import React, {Component} from "react";
import {TouchableOpacity, View, Text, StyleSheet, Dimensions} from "react-native";

const Button = ({onPress, text, backgroundColor, color, width, height, borderWidth, fontSize, fontWeight, borderRadius, padding, letterSpacing, style}) =>{

  const styles = StyleSheet.create({
    button:
      {
        width: width,
        height: height,
        borderWidth: borderWidth,
        borderColor: color,
        borderRadius: borderRadius,
        justifyContent:  "center",
        alignItems:      "center",
        backgroundColor: backgroundColor,
        margin: 5,
        padding: padding ? padding : 10
      },
    button_text:
      {
        fontSize: fontSize,
        color: color,
        fontWeight: fontWeight,
        letterSpacing: letterSpacing
      }
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={styles.button_text}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export { Button };
