import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { life } from "../settings.json"

const HealthBar = ({ hits, screenWidth }) => {

	const spliter = () => {
		let splitLife = []

		for (let i = 1; i < life; i++) {
			splitLife.push(<View key={"spliter" + i}
				style={{
					position: "absolute",
					height: 10,
					left: i * screenWidth / life,
					borderWidth: 1,
					borderColor: "dark",
				}} />)
		}
		return splitLife
	}

	return <View
		style={{
			position: "absolute",
			width: screenWidth,
			height: 10,
			bottom: 0,
			backgroundColor: "#8B0000",
			// borderWidth: 3,
			// borderColor: "black"
		}}>
		<View
			style={{
				position: "absolute",
				padding: 0,
				margin: 0,
				width: (life - hits) * screenWidth / life,
				height: 10,
				bottom: 0,
				left: 0,
				backgroundColor: "red",
			}}
		/>
		{spliter()}
		<View
			style={{
				position: "absolute",
				padding: 0,
				margin: 0,
				width: screenWidth,
				height: 10,
				bottom: 0,
				left: 0,
				borderWidth: 3,
				borderColor: "black"
			}}
		/>
	</View>
}

export default HealthBar
