import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { getDecks, saveDeckTitle } from '../utils/api'
import { AppLoading } from 'expo'
import Deck from './Deck'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class DeckList extends Component {

  state = {
    ready: false
  }

  componentDidMount() {
    getDecks().then(results => {
      const decks = JSON.parse(results)
      this.props.receiveDecks(decks)
      this.setState({ ready: true })
    })
  }

  render() {
    const { ready } = this.state
    const { decks } = this.props

    const data = Object.keys(decks).map(key => {
      return decks[key]
    })

    if (ready === false) {
      return (
        <AppLoading />
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={({item}) => <Deck item={item} {...this.props} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }

}

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)