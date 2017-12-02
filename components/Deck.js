import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, black } from '../utils/colors'

class Deck extends Component {

  onPress = () => {
    const { item } = this.props

    this.props.navigation.navigate(
      'DeckDetail',
      {
        title: item.title
      }
    )
  }

  render() {
    const { item } = this.props

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.questions.length} card(s)</Text>
        </View>
      </TouchableOpacity>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: white,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16
  }
})

export default Deck