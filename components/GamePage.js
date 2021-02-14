import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { asteroidRadius, asteroidSpeed, shootWidth, shootStartY, shootSpeed, asteroidRng, life, chargeBeamWidth, delayBetweenShoot, radiusBlast } from "../settings.json"
import Asteroid from "./Asteroid"
import Earth from "./Earth"
import Shoot from "./Shoot"
import ChargeBeam from "./ChargeBeam"
import MegaBomb from "./MegaBomb"
import HealthBar from "./HealthBar"
import GameOver from "./gameOver"

const GamePage = ({ screenHeight, screenWidth, backHome }) => {
	const [asteroids, setAsteroids] = useState({})
	const [shoots, setShoots] = useState({})
	const [newShoot, setNewShoot] = useState(null)
	const [blockShoot, setBlockShoot] = useState(false)
	const [chargeBeam, setChargeBeam] = useState(false)
	const [megaBomb, setMegaBomb] = useState(null)
	const [nbAsteroidsDestroyed, setNbAsteroidsDestroyed] = useState(0)
	const [nbAsteroidsLand, setNbAsteroidsLand] = useState(0)
	const [shootsCount, setShootsCount] = useState(0)
	const [newTap, setNewTap] = useState(false)
	const [newTapForLong, setNewTapForLong] = useState(false)
	const [gameStart, setGameStart] = useState(false)
	const [gameOver, setGameOver] = useState(false)
	const [theWorld, setTheWorld] = useState(false)
	let asteroidsTimerId
	let shootsTimerId
	let megaBombTimerId


	const [tmp, settmp] = useState([])


	// Vector calculator
	const angleCalculator = (x, y, targetX, targetY) => {
		const angle = Math.atan(Math.abs(x - targetX) / Math.abs(y - targetY))

		return x < targetX ? -angle : angle
	}


	// Distance calculator
	const distCalculator = (x, y, targetX, targetY) => {
		return Math.sqrt(Math.pow(x - targetX, 2) + Math.pow(y - targetY, 2))
	}


	// linear interpolation
	const linearInterpolation = (x, y, targetX, targetY, t) => {
		const angle = -angleCalculator(x, y, targetX, targetY)
		const dist = distCalculator(x, y, targetX, targetY)
		const deltaY = y < targetY ? -dist * Math.cos(angle) * t : dist * Math.cos(angle) * t

		return [x + (dist * Math.sin(angle) * t), y - deltaY]
	}


	// Restart
	const restartGame = () => {
		clearInterval(asteroidsTimerId)
		clearInterval(shootsTimerId)
		setTimeout(() => {
			setNbAsteroidsDestroyed(0)
			setNbAsteroidsLand(0)
			setShootsCount(0)
			setAsteroids({})
			setShoots({})
			setNewShoot(null)
			setGameOver(false)
			console.log("restart")
		}, 100)
	}


	// Tap handler for double tap detect
	const tapHandler = (x, y) => {
		if (!gameStart)
			setGameStart(true)
		else
			if (newTap) {
				setNewTap(false)
				sendMegaBomb(x, y)
			} else {
				if (!chargeBeam || !blockShoot)
					shootMaker(x, y)
				setNewTapForLong(true)
				setNewTap(true)
				setTimeout(() => { setNewTap(false) }, 200)
				setTimeout(() => { setNewTapForLong(false) }, 550)
			}
	}


	const longPressHandler = (x, y) => {
		if (newTapForLong && !chargeBeam) {
			setNewTapForLong(false)
			chargeBeamGenerator(x, y)
		} else
			stopTime()
	}


	// Za warudo
	const stopTime = () => {
		setTheWorld(true), setTimeout(() => { setTheWorld(false) }, 2000)
	}


	// ===============================  Shoots ===============================

	// MegaBomb create
	const sendMegaBomb = (targetX, targetY) => {
		const dist = distCalculator(screenWidth / 2, screenHeight - shootStartY, targetX, targetY)
		const angle = angleCalculator(screenWidth / 2, screenHeight - shootStartY, targetX, targetY)
		const distMidPt = (dist / 2) / Math.cos(0.3)
		let angleMidPt

		if (angle > 0.5)
			angleMidPt = 0.3
		else if (angle > 0.3)
			angleMidPt = angle - 0.3
		else if (angle < -0.5)
			angleMidPt = -0.3
		else if (angle < -0.3)
			angleMidPt = angle + 0.3
		else
			angleMidPt = 0
		setMegaBomb({
			t: 0,
			x: screenWidth / 2,
			y: shootStartY,
			midPtX: screenWidth / 2 - Math.sin(angleMidPt) * distMidPt,
			midPtY: screenHeight - shootStartY - Math.cos(angleMidPt) * distMidPt,
			targetX,
			targetY,
			radius: 0,
			angle: 0,
		})
	}


	// MegaBomb interact
	useEffect(() => {
		megaBombTimerId = setInterval(() => {
			if (megaBomb)
				if (theWorld) {
					setMegaBomb({ ...megaBomb })
				} else if (megaBomb.t < 1) {
					const pt1 = linearInterpolation(screenWidth / 2, screenHeight - shootStartY, megaBomb.midPtX, megaBomb.midPtY, megaBomb.t)
					const pt2 = linearInterpolation(megaBomb.midPtX, megaBomb.midPtY, megaBomb.targetX, megaBomb.targetY, megaBomb.t)
					const ptMegaBomb = linearInterpolation(pt1[0], pt1[1], pt2[0], pt2[1], megaBomb.t)

					setMegaBomb({
						...megaBomb,
						t: megaBomb.t + 0.01,
						x: ptMegaBomb[0],
						y: ptMegaBomb[1],
						angle: pt1[1] > pt2[1] ? angleCalculator(pt1[0], pt1[1], pt2[0], pt2[1]) : -angleCalculator(pt1[0], pt1[1], pt2[0], pt2[1]),
					})
				} else if (megaBomb.radius < radiusBlast && !megaBomb.maxSize) {
					setMegaBomb({
						...megaBomb,
						radius: megaBomb.radius + 5,
						maxSize: megaBomb.radius + 5 < radiusBlast ? megaBomb.maxSize : true
					})
				} else if (megaBomb.radius > 20) {
					setMegaBomb({
						...megaBomb,
						radius: megaBomb.radius - 20
					})
				} else {
					setMegaBomb(null)
				}
		}, 30)
		return () => { clearInterval(megaBombTimerId) }
	}, [megaBomb])


	// Charge beam generator
	const chargeBeamGenerator = (targetX, targetY) => {
		const angle = angleCalculator(screenWidth / 2, screenHeight - shootStartY, targetX, targetY)

		setChargeBeam({
			x: (screenWidth - screenHeight * Math.sin(angle)) / 2,
			y: - shootStartY + screenHeight / 2 - Math.cos(angle) * screenHeight / 2,
			angle,
		})
		setTimeout(() => {
			setChargeBeam(false)
		}, delayBetweenShoot);
	}


	// Shoots generator
	const shootMaker = (targetX, targetY) => {
		const id = Math.random()
		const angle = angleCalculator(screenWidth / 2, screenHeight - shootStartY, targetX, targetY)

		setBlockShoot(true)
		setNewShoot({
			id,
			x: screenWidth / 2,
			y: screenHeight - shootStartY,
			deltaHitbox1: [-2 * Math.sin(angle), 2 * Math.cos(angle)],
			deltaHitbox2: [2 * Math.sin(angle), -2 * Math.cos(angle)],
			vectorX: Math.sin(angle),
			vectorY: Math.cos(angle),
			angle,
		})
		setTimeout(() => {
			setBlockShoot(false)
		}, 1000);
	}


	// Shoots event
	useEffect(() => {
		shootsTimerId = setInterval(() => {
			let idA = Object.keys(asteroids).map(id => id)
			let shootsTmp = { ...shoots }

			// Add new shoot
			if (newShoot && !Object.keys(shootsTmp).includes(newShoot.id)) {
				shootsTmp[newShoot.id] = newShoot
				setNewShoot(null)
				setShootsCount(shootsCount + 1)
			}

			// Shoots OOB
			Object.keys(shootsTmp).forEach(idS => {
				if (shootsTmp[idS].y < 0 || shootsTmp[idS].x < 0 || shootsTmp[idS].x > screenWidth) {
					delete shootsTmp[idS]
				}
			})

			// Shoots hit
			for (let i = 0; i < idA.length; i++) {
				Object.keys(shootsTmp).forEach(idS => {
					let dist1 = distCalculator((shootsTmp[idS].x + shootsTmp[idS].deltaHitbox1[0]), (shootsTmp[idS].y + shootsTmp[idS].deltaHitbox1[1]), asteroids[idA[i]].x, asteroids[idA[i]].y)
					let dist2 = distCalculator((shootsTmp[idS].x + shootsTmp[idS].deltaHitbox2[0]), (shootsTmp[idS].y + shootsTmp[idS].deltaHitbox2[1]), asteroids[idA[i]].x, asteroids[idA[i]].y)
					if (dist1 < asteroidRadius + shootWidth || dist2 < asteroidRadius + shootWidth) {
						delete shootsTmp[idS]
					}
				})
			}

			// Shoots move
			if (!theWorld)
				Object.keys(shootsTmp).map(id => {
					shootsTmp[id] = {
						...shootsTmp[id],
						x: shootsTmp[id].x - shootsTmp[id].vectorX * shootSpeed,
						y: shootsTmp[id].y - shootsTmp[id].vectorY * shootSpeed
					}
				})
			setShoots(shootsTmp)
		}, 30)
		return () => { clearInterval(shootsTimerId) }
	}, [shoots])


	// ===============================  Asteroid ===============================

	// Asteroid
	useEffect(() => {
		asteroidsTimerId = setInterval(() => {
			let idS = Object.keys(shoots).map(id => id)
			let asteroidsTmp = { ...asteroids }

			Object.keys(asteroidsTmp).forEach(idA => {

				// Asteroids land
				if (asteroidsTmp[idA].y > screenHeight) {
					setNbAsteroidsLand(nbAsteroidsLand => nbAsteroidsLand + 1)
					delete asteroidsTmp[idA]
					if (nbAsteroidsLand >= life - 1)
						setGameOver(true)

					// Destruction by chargeBeam
				} else if (chargeBeam) {
					const dist = distCalculator(screenWidth / 2, screenHeight - shootStartY, asteroidsTmp[idA].x, asteroidsTmp[idA].y)
					const angle = angleCalculator(screenWidth / 2, screenHeight - shootStartY, asteroidsTmp[idA].x, asteroidsTmp[idA].y)
					if (dist * Math.abs(Math.sin(angle - chargeBeam.angle)) < asteroidRadius - chargeBeamWidth / 3)
						delete asteroidsTmp[idA]

					// Destruction by megaBomb
				} else if (megaBomb && megaBomb.radius > 0) {
					if (megaBomb.radius > distCalculator(megaBomb.x, megaBomb.y, asteroidsTmp[idA].x, asteroidsTmp[idA].y))
						delete asteroidsTmp[idA]
				}
			})

			// Asteroids shootes
			for (let i = 0; i < idS.length; i++) {
				Object.keys(asteroidsTmp).forEach(idA => {
					let dist1 = distCalculator((shoots[idS[i]].x + shoots[idS[i]].deltaHitbox1[0]), (shoots[idS[i]].y + shoots[idS[i]].deltaHitbox1[1]), asteroidsTmp[idA].x, asteroidsTmp[idA].y)
					let dist2 = distCalculator((shoots[idS[i]].x + shoots[idS[i]].deltaHitbox2[0]), (shoots[idS[i]].y + shoots[idS[i]].deltaHitbox2[1]), asteroidsTmp[idA].x, asteroidsTmp[idA].y)

					if (dist1 < asteroidRadius + shootWidth || dist2 < asteroidRadius + shootWidth) {
						setNbAsteroidsDestroyed(nbAsteroidsDestroyed => nbAsteroidsDestroyed + 1)
						delete asteroidsTmp[idA]
					}
				})
			}


			if (!theWorld) {
				// Asteroids move
				Object.keys(asteroidsTmp).map(id => {
					asteroidsTmp[id] = {
						...asteroidsTmp[id],
						x: asteroids[id].x - asteroids[id].horizontalSpeed,
						y: asteroids[id].y + asteroids[id].verticalSpeed
					}
				})

				// Asteroids generator
				if (gameStart && Math.random() > asteroidRng) {
					const id = Math.random()
					const x = Math.random() * (screenWidth - asteroidRadius * 2) + asteroidRadius
					const angle = angleCalculator(x, 0, Math.random() * screenWidth, screenHeight)
					const ownSpeed = asteroidSpeed * (Math.random() + 0.5)

					asteroidsTmp[id] = {
						id,
						x,
						y: -asteroidRadius,
						horizontalSpeed: Math.sin(angle) * ownSpeed,
						verticalSpeed: Math.cos(angle) * ownSpeed,
					}
				}
			}
			setAsteroids(asteroidsTmp)

		}, 30)

		return () => { clearInterval(asteroidsTimerId) }
	}, [asteroids])


	// ===============================  Render ===============================

	// Asteroids render
	const asteroidsRender = () => {
		return <>
			{Object.keys(asteroids).map(id => {
				return <Asteroid
					key={"asteroid" + id}
					x={asteroids[id].x}
					y={asteroids[id].y}
				/>
			})}
		</>
	}


	// MegaBomb render
	const megaBombRender = () => {
		return <MegaBomb
			x={megaBomb.x}
			y={megaBomb.y}
			angle={megaBomb.angle}
			radius={megaBomb.radius}
		/>
	}


	// Shoots render
	const shootsRender = () => {
		return <>
			{Object.keys(shoots).map(id => {
				return <Shoot
					key={"shoot" + id}
					x={shoots[id].x}
					y={shoots[id].y}
					angle={shoots[id].angle}
				/>
			})}
		</>
	}


	// HTML
	return (
		<TouchableOpacity
			delayLongPress={300}
			activeOpacity={1}
			onPress={e => gameOver ? null : tapHandler(e.nativeEvent.pageX, e.nativeEvent.pageY)}
			onLongPress={e => gameOver || chargeBeam ? null : longPressHandler(e.nativeEvent.pageX, e.nativeEvent.pageY)}
			style={{
				position: "absolute",
				alignItems: 'center',
				justifyContent: 'center',
				height: screenHeight,
				width: screenWidth
			}}
		>
			{gameStart ? null :
				<Text style={{ color: "white" }}>
					{`Tap\t\t\t\tshoot\nHold\t\t\tざわ-るど\nDouble tap\t\tmega bomb\nHold double tap\tcharge beam`}
				</Text>
			}
			<Earth screenHeigth={screenHeight} />
			{asteroidsRender()}
			{shootsRender()}
			{megaBomb ? megaBombRender() : null}
			{chargeBeam ? <ChargeBeam
				x={chargeBeam.x}
				y={chargeBeam.y}
				angle={chargeBeam.angle}
				screenHeight={screenHeight}
			/>
				: null}
			<HealthBar screenWidth={screenWidth} hits={nbAsteroidsLand} />
			{gameOver ? <GameOver
				shootsCount={shootsCount}
				hits={nbAsteroidsDestroyed}
				restart={restartGame}
				backHome={backHome}
			/>
				: null}
			{/* {tmp.map(t => {
				// return <View style={{ backgroundColor: "green", height: 10, width: 10, position: "absolute", top: t[1], left: t[0] }} />
			})} */}
			{/* <View style={{ position: "absolute", bottom: shootStartY, height: 200, width: 20, left: screenWidth / 2, backgroundColor: "red", transform: [{ rotate: `${0}rad` }], }} /> */}
		</TouchableOpacity>
	)
}


// CSS
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: "hidden"
	},
})

export default GamePage
