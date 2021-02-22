import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Button } from 'react-native'
import GamePage from "./components/GamePage"
import UpgradesPage from "./components/UpgradesPage"
import OptionsPage, { getLang } from "./components/OptionsPage"
import ScorePage from "./components/ScorePage"

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const [currentPage, setCurrentPage] = useState(0)

  // HTML
  return (
    <View style={styles.container}>
      {(() => {
        switch (currentPage) {
          case 0:
            return <View>
              <View style={[styles.button, { width: 9 * screenWidth / 10 }]}>
                <Button
                  title={getLang('BUTTON_PLAY')}
                  onPress={() => setCurrentPage(1)}
                />
              </View>
              <View style={[styles.button, { width: 9 * screenWidth / 10 }]}>
                <Button
                  title={getLang('BUTTON_UPGRADES')}
                  onPress={() => setCurrentPage(2)}
                />
              </View>
              <View style={[styles.button, { width: 9 * screenWidth / 10 }]}>
                <Button
                  title={getLang('BUTTON_SETTINGS')}
                  onPress={() => setCurrentPage(3)}
                />
              </View>
              <View style={[styles.button, { width: 9 * screenWidth / 10 }]}>
                <Button
                  title={getLang('BUTTON_SCORE')}
                  onPress={() => setCurrentPage(4)}
                />
              </View>
            </View>
          case 1:
            return <GamePage screenHeight={screenHeight} screenWidth={screenWidth} backHome={() => setCurrentPage(0)} />
          case 2:
            return <UpgradesPage screenHeight={screenHeight} screenWidth={screenWidth} backHome={() => setCurrentPage(0)} />
          case 3:
            return <OptionsPage screenHeight={screenHeight} screenWidth={screenWidth} backHome={() => setCurrentPage(0)} />
          case 4:
            return <ScorePage screenHeight={screenHeight} screenWidth={screenWidth} backHome={() => setCurrentPage(0)} />
        }
      })()}
    </View >
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
  button: {
    height: 35,
    margin: 10
  },
})
