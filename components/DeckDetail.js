import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, AlertIOS, ToastAndroid } from 'react-native'
import { primaryColor, secondaryColor, white } from '../utils/colors'
import { connect } from 'react-redux'

class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title
    }
  }

  startQuiz = () => {
    const { title } = this.props.navigation.state.params
    const deck = this.props.decks[title]

    if (deck.questions.length === 0) {
      Platform.OS === 'ios'
      ? AlertIOS.alert('Oops!', 'Please create the card(s) to start the quiz!')
      : ToastAndroid.show('Oops! Please create the card(s) to start the quiz!', ToastAndroid.SHORT)
    } else {
      this.props.navigation.navigate(
        'Quiz',
        {
          title: deck.title
        }
      )
    }
  }

  render() {
    const { title } = this.props.navigation.state.params
    const deck = this.props.decks[title]

    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer, { flex: 2 }]}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>{deck.questions.length} card(s)</Text>
        </View>
        <View style={[styles.contentContainer, { flex: 1 }]}>
          <TouchableOpacity
            style={[styles.primaryButton, { marginBottom: 8 }]}
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              {
                title: deck.title
              }
            )}
          >
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={this.startQuiz}
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 21,
    textAlign: 'center'
  },
  primaryButton: {
    backgroundColor: primaryColor,
    width: 150,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondaryButton: {
    backgroundColor: secondaryColor,
    width: 150,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: white,
    fontSize: 16
  }
})

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckDetail)