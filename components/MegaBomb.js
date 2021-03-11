import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { shootHeight, shootWidth } from "../settings"

const MegaBomb = ({ x, y, angle, radius }) => {

	if (radius === 0)
		return <View style={{
			position: "absolute",
			backgroundColor: "red",
			height: shootHeight,
			width: shootWidth,
			transform: [{ rotate: `${-angle}rad` }],
			top: y,
			left: x,
		}} />
	else
		return <View style={{
			position: "absolute",
			backgroundColor: "yellow",
			height: radius * 2,
			width: radius * 2,
			borderRadius: radius,
			top: y - radius,
			left: x - radius,
		}} />
}

export default MegaBomb
