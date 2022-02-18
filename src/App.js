import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import {connect} from 'react-redux';

import {initialThunk} from './redux/appReducer';
import DataGridContainer from './components/DataGrid/DataGrid';

import './App.css';

class App extends React.Component {

  componentDidMount(){
     this.props.getInitial(true);
  }

  render(){
      if(!this.props.initialazed) return 'preloader';

      return (
      <div className="App">          
          <DataGridContainer />         
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialazed: state.app.initialazed,
    items: state.app.items
  };
};

export default connect(mapStateToProps, {getInitial: initialThunk})(App);
