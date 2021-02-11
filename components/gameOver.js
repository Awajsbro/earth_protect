import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { precisionMinBonus } from "../settings.json"
import Svg, { G, Path } from 'react-native-svg'

const GameOver = ({ hits, shootsCount, restart, backHome }) => {
	const bonus = hits / shootsCount > precisionMinBonus ? Number.parseFloat((hits / shootsCount).toFixed(2) - precisionMinBonus) : 0

	return <>
		<Text style={{ color: "white", zIndex: 0, }}>
			{`Hits: ${hits}\nPrecision bonus ${Math.round(bonus * 100)}%\n`}
			<Text style={{ fontSize: 18, color: "white", zIndex: 0, }}>
				{`Score : ${Math.round(hits * (1 + bonus))}\n\n`}
			</Text>
		</Text>
		<View style={{ display: "flex", flexDirection: "row" }}>
			<TouchableOpacity style={{ margin: 10 }} onPress={() => backHome()}>
				<Svg x="0px" y="0px" width="50" height="50" viewBox="0 0 460.298 460.297">
					<G>
						<G>
							<Path fill="white" d="M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041 c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629 c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939 z" />
							<Path fill="white" d="M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816 c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245 c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136 c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998 L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125 c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z" />
						</G>
					</G>
				</Svg>
			</TouchableOpacity>
			<TouchableOpacity style={{ margin: 10 }} onPress={() => restart()}>
				<Svg id="gameOver" height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 0 }}>
					<G id="Solid">
						<Path id="gameOver" fill="white" d="m464.022 232h-.022a24 24 0 0 0 -23.98 24.021 184.063 184.063 0 0 1 -289.527 150.688c-83.1-58.188-103.369-173.136-45.181-256.237s173.137-103.372 256.237-45.182a184.078 184.078 0 0 1 34.012 30.71h-67.54a24 24 0 0 0 0 48h112a24 24 0 0 0 24-24v-112a24 24 0 0 0 -48 0v39.967a234.175 234.175 0 0 0 -26.94-22 231.982 231.982 0 1 0 -266.119 380.061 230.285 230.285 0 0 0 132.567 42.015 234.971 234.971 0 0 0 40.776-3.585 232.025 232.025 0 0 0 191.716-228.479 24 24 0 0 0 -23.999-23.979z" />
					</G>
				</Svg>
			</TouchableOpacity>
		</View>
	</>
}

export default GameOver
