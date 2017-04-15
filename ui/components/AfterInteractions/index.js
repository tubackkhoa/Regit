import {Component, PropTypes} from 'react'
import {InteractionManager} from 'react-native'

export default class AfterInteractions extends Component {

  static propTypes = {
    children: PropTypes.any,
    placeholder: PropTypes.any,
    renderPlaceholder: PropTypes.func
  }

  static defaultProps = {
    placeholder: null,
    renderPlaceholder: null
  }

  state = {interactionsComplete: false}

  interactionHandle = null

  componentDidMount() {
    // console.log('start',new Date())
    this.interactionHandle = InteractionManager.runAfterInteractions(() => {
      this.setState({interactionsComplete: true})
      this.interactionHandle = null
      // console.log('end',new Date())
    })
  }

  componentWillUnmount() {
    if (this.interactionHandle) {
      this.interactionHandle.cancel()
    }
  }

  render() {
    const {
      children,
      placeholder,
      renderPlaceholder
    } = this.props

    if (this.state.interactionsComplete) {
      return children
    }

    if (placeholder) {
      return placeholder
    }

    if (renderPlaceholder) {
      return renderPlaceholder()
    }

    return null
  }
}