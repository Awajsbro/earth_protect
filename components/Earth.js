import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { earthRadius } from "../settings.json"

const Earth = ({ screenHeigth }) => {

	return (
		<View style={{
			position: "absolute",
			backgroundColor: "#66883f",
			height: earthRadius * 2,
			width: earthRadius * 2,
			borderRadius: earthRadius,
			top: screenHeigth - 200,
		}} />
	)
}

export default Earth
