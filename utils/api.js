import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'STORAGE_KEY'

export function getDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
}

export function getDeck (id) {
  return AsyncStorage.getItem(STORAGE_KEY)
            .then(results => {
              const data = JSON.parse(results)
              return data[id]
            })
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(STORAGE_KEY)
            .then(results => {
              const data = JSON.parse(results)
              data[title].questions.push(card)
              AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            })
}