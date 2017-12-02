import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity, Platform, AlertIOS, ToastAndroid, Keyboard } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { primaryColor, secondaryColor, white } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

class NewDeck extends Component {

  state = {
    title: ''
  }

  submit = () => {
    Keyboard.dismiss()
    
    if (this.state.title !== '') {
      saveDeckTitle(this.state.title)
      .then(() => {
        const newDeck = {
            [this.state.title]: {
              title: this.state.title,
              questions: []
            }
          }
        this.props.addDeck(newDeck)

        Platform.OS === 'ios'
        ? AlertIOS.alert('Success', 'A new deck has been created!',
            [
              {text: 'Dismiss', onPress: this.toHome}
            ])
        : ToastAndroid.show('A new deck has been created!', ToastAndroid.SHORT)
        this.setState({ title: '' })
        if (Platform.OS === 'android') {
          this.toHome()
        }
      })
    } else {
      Platform.OS === 'ios'
      ? AlertIOS.alert('Oops!', 'Please enter a title!')
      : ToastAndroid.show('Oops! Please enter a title!', ToastAndroid.SHORT)
    }
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'NewDeck'
    }))
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.heading}>What is the title of your new deck?</Text>
        <TextInput
          placeholder='Deck Title'
          value={this.state.title}
          onChangeText={(text) => this.setState({ title: text })}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  heading: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 32
  },
  textInput: {
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: secondaryColor,
    height: 40,
    marginBottom: 32
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
    addDeck: (deck) => dispatch(addDeck(deck))
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)