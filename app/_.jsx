import React, {PropTypes} from 'react'



export default class _ extends React.Component {





  render(){
    let Component = null
    const {Button,Input, important, text} = this.props

    Button ? Component = <button>{text}</button> : null
    Input  ? Component = <input /> : null

    return Component

  }
}



_.propTypes = {
  Button: PropTypes.bool,
  Input: PropTypes.bool,
  important: PropTypes.bool,
  text: PropTypes.string
}
_.defaultProps = {
  Button: false,
  Input: false,
  important: false,
  text: ''
}
