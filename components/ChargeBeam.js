import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { chargeBeamWidth, shootStartY } from "../settings.json"

const ChargeBeam = ({ x, y, angle, screenHeight }) => {

	return <View style={{
		position: "absolute",
		backgroundColor: "red",
		height: screenHeight,
		width: chargeBeamWidth,
		transform: [{ rotate: `${-angle}rad` }],
		top: y,
		left: x - chargeBeamWidth / 2,
		// left: 0,
	}} />
}

export default ChargeBeam
