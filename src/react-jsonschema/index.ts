import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

export default function () {
  function render() {
    ReactDOM.render(
      React.createElement(AppContainer, {}, React.createElement(App)),
      document.getElementById('app')
    )
  }

  module.hot?.accept('./App', render)

  render()
}
