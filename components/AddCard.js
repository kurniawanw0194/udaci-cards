import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, AlertIOS, ToastAndroid, Keyboard } from 'react-native'
import { primaryColor, secondaryColor, white } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {

  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    Keyboard.dismiss()

    if (this.state.title !== '' && this.state.question !== '') {
      const { title } = this.props.navigation.state.params
      addCardToDeck(title, { question: this.state.question, answer: this.state.answer })
        .then(() => {
          const newCard = [{
            question: this.state.question,
            answer: this.state.answer
          }]
          this.props.addCard(title, newCard)

          Platform.OS === 'ios'
          ? AlertIOS.alert('Success', 'A card has been addedd!',
              [
                {text: 'Dismiss', onPress: this.props.navigation.goBack}
              ])
          : ToastAndroid.show('A card has been addedd!', ToastAndroid.SHORT)
          this.setState({ question: '', answer: '' })
          if (Platform.OS === 'android') {
            this.props.navigation.goBack()
          }
        })
    } else {
      Platform.OS === 'ios'
      ? AlertIOS.alert('Oops!', 'Please enter the question and answer!')
      : ToastAndroid.show('Oops! Please enter the question and answer!', ToastAndroid.SHORT)
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <TextInput
          placeholder='Question'
          value={this.state.question}
          onChangeText={(text) => this.setState({ question: text })}
          returnKeyType='next'
          enablesReturnKeyAutomatically={true}
          style={styles.textInput}
        />
        <TextInput
          placeholder='Answer'
          value={this.state.answer}
          onChangeText={(text) => this.setState({ answer: text })}
          returnKeyType='done'
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={this.submit}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.button} onPress={this.submit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: secondaryColor,
    height: 40,
    marginBottom: 16
  },
  button: {
    backgroundColor: primaryColor,
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

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (title, card) => dispatch(addCard(title, card))
  }
}

export default connect(null, mapDispatchToProps)(AddCard)