import React, {Component} from "react";
import {TouchableOpacity, View, Text, StyleSheet, Dimensions, Image} from "react-native";
import Images from "../Images"

const Button = ({onPress, text, backgroundColor, color, width, height, borderWidth, fontSize, fontWeight, borderRadius, borderColor, padding, letterSpacing, style, icon}) =>{

  const styles = StyleSheet.create({
    button:
      {
        flexDirection: "row",
        justifyContent: "center",
        width: width,
        height: height,
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
        alignItems:      "center",
        backgroundColor: backgroundColor,
        margin: 5,
        padding: padding ? padding : 10,
      },
    button_text:
      {
        fontSize: fontSize,
        color: color,
        fontWeight: fontWeight,
        letterSpacing: letterSpacing
      }
  });

  const iconComp = () => {
    return icon ? <Image source={icon} style={{width: 35, height: 35, marginRight: 10}}/> : null
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>
        {iconComp()}
        <Text style={styles.button_text}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export { Button };
