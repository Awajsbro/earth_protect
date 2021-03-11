import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { asteroidRadius } from "../settings"

const Asteroid = ({ x, y }) => {

	return (
		<View style={{
			position: "absolute",
			backgroundColor: "grey",
			height: asteroidRadius * 2,
			width: asteroidRadius * 2,
			borderRadius: asteroidRadius,
			top: y - asteroidRadius,
			left: x - asteroidRadius
		}} />
	)
}

export default Asteroid
