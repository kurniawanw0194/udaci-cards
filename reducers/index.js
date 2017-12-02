import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, ...action.card]
        }
      }
    default:
      return state
  }
}