
import React from 'react'
import {connect} from 'react-redux'
import SelectedCard from '../components/SelectedCard'
import {toggleSelect} from '../actions/toggleSelect'

function CardContainer(props, dispatch) {
    return (
        <SelectedCard {...props} {...dispatch} />
    )
  }
  
  const mapStateToProps = function(state) {
    return {
        list: state.selected
    }
  }
  
  const mapDispatchToProps = function(dispatch) {
      return{
        remove : id => dispatch(toggleSelect(id))
      }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);