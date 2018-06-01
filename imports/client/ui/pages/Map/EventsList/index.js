import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'reactstrap'
import EventsListItem from './EventsListItem'
import MinimizeButton from './MinimizeButton'
import EventInfo from './EventInfo'
import './styles.scss'

class EventsList extends Component {
  state = {
    events: [],
    loading: true,
    noData: false
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    // If we had an array of events but they were eith filtered/researched
    let state = {
      events: nextProps.events,
      loading: nextProps.isFetching,
      currentEvent: nextProps.currentEvent
    }

    if (prevState.events[0] && !nextProps.events[0]) {
      state = {
        ...state,
        events: [],
        noData: true,
        loading: nextProps.isFetching
      }
    }

    if (prevState.currentEvent && !nextProps.currentEvent) {
      state.currentEvent = null
    }

    return state
  }

  componentDidMount () {
    const timeout = 5000 // try this for 5 seconds
    const startingTime = Date.now()
    this.interval = setInterval(() => {
      // if more than 5 seconds have passed and no data, update the state to display a not-found message
      if (this.interval && Date.now() - startingTime > timeout) {
        this.setState({
          noData: true
        })
        clearInterval(this.interval)
      }
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    this.interval = null
  }

  render () {
    const {
      currentEvent,
      events,
      loading,
      noData
    } = this.state

    const {
      userLocation
    } = this.props

    const hasData = !!events[0]

    return (
      <Fragment>
        <div id='events-list'>
          <div className='header'>
            {this.props.children} {/* Search Box */}
          </div>
          <ListGroup>
            {events && events.map((event, index) => {
              return (
                <EventsListItem
                  key={index}
                  item={event}
                  userLocation={userLocation}
                  onItemClick={this.props.onItemClick}
                />
              )
            })}
          </ListGroup>
          <Loading show={!hasData && (loading || !noData)} />
          <NoResults show={(noData && !hasData && !loading)} />
        </div>

        <MinimizeButton onMinimize={this.toggleMinimize} />

        <EventInfo
          event={events.find(event => event._id === currentEvent)}
          onDirections={this.props.onDirections}
          userLocation={userLocation}
          returnToList={this.returnToList}
        />
      </Fragment>
    )
  }

  toggleMinimize = () => {
    document.body.querySelector('#map-container').classList.toggle('minimized')
  }

  returnToList = () => {
    this.props.removeCurrentEvent()
  }
}

const Loading = ({ show }) => (
  show && (
    <div className='va-center loader'>
      <div className='ball-beat'>
        <div /><div /><div />
      </div>
      <div>looking for events near you...</div>
    </div>
  )
)

const NoResults = ({ show }) => (
  show && (
    <div className='no-near-events va-center'>
      <div>Sorry, we could not find anything</div>
      <div>around you...</div>
    </div>
  )
)

EventsList.propTypes = {
  currentEvent: PropTypes.string,
  events: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  onDirections: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  userLocation: PropTypes.object,
  removeCurrentEvent: PropTypes.func.isRequired
}

export default EventsList

// For testing
export {
  Loading,
  NoResults
}