import React, {Component} from "react";
import {TouchableOpacity, View, StyleSheet, Dimensions, Image} from "react-native";


const TouchableImage = ({onPress, source, width, height, top, left, position, style}) => {
  const styles = StyleSheet.create({
    image: {
      width:  width,
      height: height,
      top: top,
      left: left
    }
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={[styles.image,style]} />
    </TouchableOpacity>
  );
}

export { TouchableImage }