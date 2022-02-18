import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import s from './dataGrid.module.css';
import {initialThunk} from '../../redux/appReducer';

import Modal from '../Modal/Modal';

import Calendar from '../Calendar/Calendar';

import 'devextreme/dist/css/dx.light.css';

import DataGrid, {
  Column,
  HeaderFilter,
  FilterRow,
  Pager,
  Paging
} from 'devextreme-react/data-grid';

import DiscountCell from './DiscountCell.js';

const pageSizes = [10, 25, 50, 100];

class DataGridContainer extends React.Component {


  constructor(props) {
    super(props);

    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately',
    }, {
      key: 'onClick',
      name: 'On Button Click',
    }];

    this.state = {
      collapsed: false,

      showFilterRow: true,
      showHeaderFilter: true,
      currentFilter: this.applyFilterTypes[0].key,

      showModal: false
    };

    this.onContentReady = this.onContentReady.bind(this);

    this.dataGrid = null;

  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.items.length === 0){
      this.setState({showModal: true});
      this.props.getInitial(true);
    }
  }

  onCloseModal(){
      this.setState({showModal: false});
  }

  clearFilter() {
    this.dataGrid.instance.clearFilter();
  }

  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(['EnviroCare']);
      this.setState({
        collapsed: true,
      });
    }
  }

 render(){
      if(this.state.showModal) return <Modal close={this.onCloseModal.bind(this)} />

      return (
        <> 
          <Calendar />  

          <DataGrid  id="dataGrid" className={s.table}
                dataSource={this.props.items}
                ref={(ref) => { this.dataGrid = ref; }}
                keyExpr="id"
                onContentReady={this.onContentReady}
                showBorders={true}
                allowColumnReordering={true}    
          >

          <FilterRow visible={this.state.showFilterRow}
            applyFilter={this.state.currentFilter} />

          <HeaderFilter visible={this.state.showHeaderFilter} />

             <Column dataField="id" dataType="number" width={50} />
             <Column dataField="firstName" dataType="string"/>
             <Column dataField="lastName" dataType="string"/>
             <Column dataField="gender" dataType="string"/>
             <Column dataField="birthDate" dataType="date"/>       

             <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
             <Paging defaultPageSize={10} />
          </DataGrid>

        </>
  );

 }

}

let mapStateToProps = state => {
  return {
    items: state.app.items
  }
};

export default connect(mapStateToProps, {getInitial: initialThunk})(DataGridContainer);


