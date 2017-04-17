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

  constructor(props) {
    super(props)
    this.interactionHandle = null
    this.state = {interactionsComplete: false}
  }

  componentDidMount() {
    this.interactionHandle = InteractionManager.runAfterInteractions(() => {
      this.setState({interactionsComplete: true})
      this.interactionHandle = null
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

    if (!this.state.interactionsComplete) {
      return placeholder || (renderPlaceholder && renderPlaceholder())
    }

    return children    
  }
}