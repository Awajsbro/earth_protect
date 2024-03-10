import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import GamePage from './components/GamePage';
import UpgradesPage from './components/UpgradesPage';
import OptionsPage, { getLang } from './components/OptionsPage';
import ScorePage from './components/ScorePage';
import { screenWidth } from './settings';
import logo from './assets/images/logo.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      {(() => {
        switch (currentPage) {
          case 0:
            return <View>
              <img style={{width: 350, height: 350, margin: '0 auto'}} src={logo} />
              <View style={[styles.button, { width: 9 * screenWidth / 10 }]}>
                <Button title={getLang('BUTTON_PLAY')} onPress={() => setCurrentPage(1)} />
              </View>
              <View style={[styles.button, { width: 9 * screenWidth / 10 }]}>
                <Button title={getLang('BUTTON_UPGRADES')} onPress={() => setCurrentPage(2)} />
              </View>
              <View style={[styles.button, { width: 9 * screenWidth / 10 }]}>
                <Button title={getLang('BUTTON_SCORE')} onPress={() => setCurrentPage(4)} />
              </View>
              <View style={[styles.button, { width: 9 * screenWidth / 10 }]}>
                <Button title={getLang('BUTTON_SETTINGS')} onPress={() => setCurrentPage(3)} />
              </View>
            </View>
          case 1:
            return <GamePage backHome={() => setCurrentPage(0)} />
          case 2:
            return <UpgradesPage backHome={() => setCurrentPage(0)} />
          case 3:
            return <OptionsPage backHome={() => setCurrentPage(0)} />
          case 4:
            return <ScorePage backHome={() => setCurrentPage(0)} />
        }
      })()}
    </View >
  )
}

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
  }
})
