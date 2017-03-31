import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Content, Toast } from 'native-base'

// for convenient, we can just import one
import { clearToast } from '~/store/actions/common'
import { getToast } from '~/store/selectors/common'

@connect(state => ({
  toast: getToast(state),
}), {clearToast})
export default class Toasts extends Component {

  componentDidUpdate() {
    const {toast} = this.props
    Toast.show({
      text: toast.message,
      position: toast.position,
      buttonText: 'x',
      type: toast.level,
      duration: toast.duration,
    })
  }

  render(){
    // we can display close all or something
    return (
      <Content style={{position:'absolute'}}></Content>
    )
  }
}


