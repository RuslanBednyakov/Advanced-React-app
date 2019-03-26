import React from 'react'
import {shallow, configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import {EventList} from './EventList'
import Loader from '../common/loader'
import events from '../../mocks/conferences'
import {EventRecord} from '../../ducks/events'

configure({ adapter: new Adapter() });

const testEvents = events.map((event) =>new EventRecord({ uid: Math.random().toString(), ...event }))

describe('EventsTable component', () => {
  it('should render a loader', () => {
    const container = shallow(<EventList loading />, {
      disableLifecycleMethods: true
    })

    expect(container.contains(<Loader />))
  })

  it('should render event list', () => {
    const container = shallow(<EventList events={testEvents} />, {
      disableLifecycleMethods: true
    });
    const rows = container.find('.test__event-list_row');
    expect(rows.length).toEqual(testEvents.length)
  })

  it('should request fetch data', (done) => {
    mount(<EventList events={[]} fetchAll={done} />);
  })

  it('should select event', () => {
    let selectedId = null

    const container = mount(
      <EventList
        events={testEvents}
        selectEvent={(uid) => (selectedId = uid)}
        fetchAll={() => {}}
      />
    )

    container
      .find('.test__event-list_row')
      .at(0)
      .simulate('click')

    expect(selectedId).toEqual(testEvents[0].uid)
  })
})