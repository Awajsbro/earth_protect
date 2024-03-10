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

		GAME_START_INFO: "Tap :\t\t\t\tshoot\nHold :\t\t\tざわ-るど\nDouble tap :\t\tmega bomb\nHold double tap :\tcharge beam",

		GAME_OVER_HITS: "Hits",
		GAME_OVER_BONUS: "Precision bonus",

		SCORE_TOTAL_PLAYED: "Number of games played",
		SCORE_TOTAL_HITS: "Total number of hits",
		SCORE_AVERAGE: "Average score",
		SCORE_BEST: "Best score",
		SCORE_PRECISION: "Average precision",
		SCORE_BEST_PRECISION: "Best precision",

		UPGRADE_LIFE: "Life",
		UPGRADE_SHOOTS_FREQUENCY: "Shoots frequency",
		UPGRADE_MEGA_BOMB: "Mega bomb (unlock / number)",
		UPGRADE_MEGA_BOMB_RANGE: "Mega bomb range",
		UPGRADE_MEGA_LASER: "Mega laser (unlock / frequency)",
		UPGRADE_THE_WORLD: "The world (unlock / frequency)",
		UPGRADE_BONUS: "Bonus golds"

	},
	fr: {
		LANG: "Français",

		BUTTON_PLAY: "Jouer",
		BUTTON_UPGRADES: "Amélioration",
		BUTTON_SETTINGS: "Options",
		BUTTON_SCORE: "Score",

		GAME_START_INFO: "Appuyez :\t\t\t\t\tTirer\nMaintenir :\t\t\t\t\tざわ-るど\nAppuyez deux fois :\t\t\t\tMéga bombe\nMaintenez appuyée deux fois :\tFaisceau de charge",

		GAME_OVER_HITS: "Coups",
		GAME_OVER_BONUS: "Bonus de précision",

		SCORE_TOTAL_PLAYED: "Nombre de parties joué",
		SCORE_TOTAL_HITS: "Nombre total de tirs",
		SCORE_AVERAGE: "Score moyen",
		SCORE_BEST: "Meilleur score",
		SCORE_PRECISION: "Précision moyenne",
		SCORE_BEST_PRECISION: "Meilleure précision",

		UPGRADE_LIFE: "Vie",
		UPGRADE_SHOOTS_FREQUENCY: "Fréquence de tire",
		UPGRADE_MEGA_BOMB: "Méga bombe (déverrouiller / numéro)",
		UPGRADE_MEGA_BOMB_RANGE: "Distance méga bombe",
		UPGRADE_MEGA_LASER: "Méga laser (déverrouiller / fréquence)",
		UPGRADE_THE_WORLD: "Le monde (déverrouiller / fréquence)",
		UPGRADE_BONUS: "Or bonus"

	}
}
