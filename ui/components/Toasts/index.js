import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Toast } from 'native-base'

// for convenient, we can just import one
import { clearToast } from '~/store/actions/common'
import { getToast } from '~/store/selectors/common'

@connect(state => ({
  toast: getToast(state),
}), {clearToast})
export default class Toasts extends Component {

  // rewrite the toast so we can have a better handle over the Toast like cleartimeout
  updateToast(){       
    const {toast} = this.props
    const {_root} = Toast.toastInstance   
    if(_root && toast){ 
      clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        !this._unmounted && _root.setState({
          modalVisible: false
        })
        this.props.clearToast()
      }, toast.duration)      

      Toast.show({
        text: toast.message,
        position: toast.position,
        buttonText: 'x',
        type: toast.level,      
      })      
    }
  }

  componentWillUnmount(){
    this._unmounted = true
    clearTimeout(this.timer)
    this.props.clearToast()
  }

  componentDidMount() {
    this.updateToast()    
  }

  componentDidUpdate(){        
    this.updateToast()              
  }

  render(){
    // we can display close all or something
    // for this to show toast only when cross form, for update call Toast.show directly
    return false
  }
}


