import {connect} from 'react-redux'
import OperatorList from '../components/OperatorList'

const getVisibleOperators = (operators, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return operators

    case 'SHOW_ALIVE':
      return operators.filter(o => o.alive)
    default:
      throw new Error(`Unknown filter ${filter}`)
  }
}

const mapStateToProps = state => ({
  operators: getVisibleOperators(state.operators, 'SHOW_ALL')
})

// const mapDispatchToProps = dispatch => ({
//   toggleView: name => dispatch(toggleView(name))
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(OperatorList)
