import React, { Component } from 'react'
import {connect} from 'react-redux'
import {moduleName, fetchLazy, eventListSelector, selectEvent} from '../../ducks/events'
import {Table, Column, InfiniteLoader} from 'react-virtualized'
import Trash from './Trash'
import TableRow from './TableRow'
import 'react-virtualized/styles.css'

export class VirtualizedEventList extends Component {

  componentDidMount() {
    this.props.fetchLazy()
  }

  render() {
    const {loaded, events} = this.props;
    return (
      <div>
       <Trash/>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          rowCount={loaded? events.length : events.length + 1}
          loadMoreRows={this.loadMoreRows}
        >
          {({onRowsRendered, registerChild}) =>
            <Table
              ref={registerChild}
              rowCount={events.length}
              rowGetter={this.rowGetter}
              rowHeight={40}
              headerHeight={50}
              overscanRowCount={5}
              width={700}
              height={300}
              onRowClick={this.handleRowClick}
              onRowsRendered={onRowsRendered}
              rowRenderer={this.getRowRenderer}
            >
              <Column
                label='title'
                dataKey='title'
                width={300}
              />
              <Column
                label='where'
                dataKey='where'
                width={250}
              />
              <Column
                label='when'
                dataKey='month'
                width={150}
              />
            </Table>
          }
        </InfiniteLoader>
      </div>
    );
  }

  getRowRenderer = (rowCtx) => <TableRow {...rowCtx} />

  loadMoreRows = () => {
    this.props.fetchLazy()
  }

  isRowLoaded = ({index}) => index < this.props.events.length

  rowGetter = ({index}) => {
    return this.props.events[index]
  }

  handleRowClick = ({rowData}) => {
    const {selectEvent} = this.props;
    selectEvent && selectEvent(rowData.uid);
  }
}

export default connect(state => ({
  events: eventListSelector(state),
  loaded: state[moduleName].loaded
}), {fetchLazy, selectEvent})(VirtualizedEventList);