import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { screenHeight, earthRadius } from "../settings"

const Earth = () => {

	return (
		<View style={{
			position: "absolute",
			backgroundColor: "#66883f",
			height: earthRadius * 2,
			width: earthRadius * 2,
			borderRadius: earthRadius,
			top: screenHeight - 200,
		}} />
	)
}

export default Earth
