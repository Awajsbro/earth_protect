import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Button } from 'react-native'
import { } from "./settings.json"
import GamePage from "./components/GamePage"
import UpgradesPage from "./components/UpgradesPage"
import OptionsPage from "./components/OptionsPage"

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
              <View style={{ height: 35, width: 9 * screenWidth / 10, margin: 10 }}>
                <Button
                  title="Play"
                  onPress={() => setCurrentPage(1)}
                />
              </View>
              <View style={{ height: 35, width: 9 * screenWidth / 10, margin: 10 }}>
                <Button
                  title="Upgrades"
                  onPress={() => setCurrentPage(2)}
                />
              </View>
              <View style={{ height: 35, width: 9 * screenWidth / 10, margin: 10 }}>
                <Button
                  title="Options"
                  onPress={() => setCurrentPage(3)}
                />
              </View>
              <View style={{ height: 35, width: 9 * screenWidth / 10, margin: 10 }}>
                <Button
                  title="Score"
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
})
