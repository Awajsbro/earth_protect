import { Dimensions } from "react-native"

export const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const earthRadius = 1000
export const asteroidRadius = 15
export const shootHeight = 8
export const shootWidth = 4
export const chargeBeamWidth = 10
export const asteroidSpeed = 4
export const shootSpeed = 10
export const shootStartY = 150
export const life = 5
export const asteroidRng = 0.96
export const precisionMinBonus = 0.7
export const delayBetweenShoot = 200
export const radiusBlast = 200
export const megaBombSpeed = 7
export const nbUpgrade = 7
export const lang = "fr"

export const language = {
	en: {
		LANG: "English",
		BUTTON_PLAY: "Play",
		BUTTON_UPGRADES: "Upgrades",
		BUTTON_SETTINGS: "Settings",
		BUTTON_SCORE: "Score",
		GAME_OVER_HITS: "Hits",
		GAME_OVER_BONUS: "Precision bonus"

	},
	fr: {
		LANG: "Français",
		BUTTON_PLAY: "Jouer",
		BUTTON_UPGRADES: "Amélioration",
		BUTTON_SETTINGS: "Options",
		BUTTON_SCORE: "Score",
		GAME_OVER_HITS: "Coups",
		GAME_OVER_BONUS: "Bonus de précision"

	}
}

