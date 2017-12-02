import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { green, red, white, primaryColor, secondaryColor } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/notification'

class Quiz extends Component {

  state = {
    index: 0,
    status: 'question',
    totalCorrect: 0
  }

  changeStatus = () => {
    if (this.state.status === 'question') {
      this.setState({
        status: 'answer'
      })
    } else {
      this.setState({
        status: 'question'
      })
    }
  }

  handleCorrect = () => {
    this.setState({
      totalCorrect: this.state.totalCorrect + 1,
      status: 'question',
      index: this.state.index + 1
    })
  }

  handleIncorrect = () => {
    this.setState({
      status: 'question',
      index: this.state.index + 1
    })
  }

  render() {
    const { title, screenKey } = this.props.navigation.state.params
    const deck = this.props.decks[title]
    const { index, status, totalCorrect } = this.state

    console.log(this.props.navigation.state)

    if (index === deck.questions.length) {
      clearLocalNotification()
        .then(setLocalNotification)

      return (
        <View style={[styles.contentContainer, {padding: 16}]}>
          <Text style={styles.content}>Congratulations! You got {totalCorrect} of {index} correct answers.</Text>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: primaryColor, marginTop: 16}]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.buttonText}>Replay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: secondaryColor, marginTop: 16}]}
            onPress={() => this.props.navigation.goBack(screenKey)}
          >
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 17}}>{index + 1} / {deck.questions.length}</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{status === 'question' ? deck.questions[index].question : deck.questions[index].answer}</Text>
          <TouchableOpacity onPress={this.changeStatus}>
            <Text style={styles.contentToggle}>{status === 'question' ? 'Answer' : 'Question'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: green, marginBottom: 16}]}
            onPress={this.handleCorrect}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: red}]}
            onPress={this.handleIncorrect}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  },
  contentToggle: {
    color: red,
    fontSize: 21,
    fontWeight: 'bold'
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: white,
    fontSize: 17
  }
})

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz)