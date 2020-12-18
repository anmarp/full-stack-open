import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

let state = initialState

const updateState = (type) => {
  const action = {
    type: type
  }

  deepFreeze(state)

  state = counterReducer(state, action)
}

describe('unicafe reducer', () => {
  beforeEach(() => {
    state = initialState
  })

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    updateState('GOOD')
    expect(state).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('neutral is incremented', () => {
    updateState('OK')
    expect(state).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    updateState('BAD')
    expect(state).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('state is reset', () => {
    updateState('ZERO')
    expect(state).toEqual(initialState)
  })
})