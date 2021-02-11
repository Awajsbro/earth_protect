import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { shootHeight, shootWidth } from "../settings.json"

const Shoot = ({ x, y, angle }) => {

	return <View style={{
		position: "absolute",
		backgroundColor: "red",
		height: shootHeight,
		width: shootWidth,
		transform: [{ rotate: `${-angle}rad` }],
		top: y - shootHeight / 2,
		left: x - shootWidth / 2,
	}} />
}

export default Shoot
