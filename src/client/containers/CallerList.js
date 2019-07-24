import React from 'react'
import {connect} from 'react-redux'
import {Caller} from '../components/caller'
import {Title} from '../components/title'
import {TableHeader} from '../components/TableHeader'
import {toggleCallers} from '../actions/callerActions'

const columns = [
  'Pos.',
  'Queue',
  'Caller number',
  'Duration'
]

const CallerList = ({callerList, toggleCallers}) => {

  return (
    <div>
      <Title
        title={'Queue'}
        subTitle={[
          {count: callerList.callers.length, title: 'callers'}
        ]}
        //TODO: put alert queue length into config
        alert={callerList.callers.length > 50}
        onClick={toggleCallers}
      />

      <div className={'table'}>
        <TableHeader
          values={columns}
          extraClass={'caller'}
        />

        {callerList.callers.map(el => (
          (callerList.showAllCallers || el.position <= 5) ? <Caller key={el.name} props={el}/> : null
        ))}
      </div>

    </div>
  )
}

const mapStateToProps = (store) => ({
  callerList: store.callerList
})

const mapDispatchToProps = (dispatch) => ({
  toggleCallers: () => dispatch(toggleCallers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallerList)
