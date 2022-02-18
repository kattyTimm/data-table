import React, {useState} from 'react';
import {connect} from 'react-redux';

import {setDateFromThunk, setDateToThunk, setItemsByDateThunk, initialThunk} from '../../redux/appReducer';

import s from '../DataGrid/dataGrid.module.css';

import 'devextreme/dist/css/dx.light.css';
import service from './data.js'; // calendar

import DateBox from 'devextreme-react/date-box';

import Button from 'devextreme-react/button';

function Calendar(props) {

   const onValueChanged = e => {
    setState({
      value: e.value,
    });
  }

  const onResetDate = () => {
    props.resetDate(true);
    setState({
      value: new Date()
    });
  }

  const [state, setState] = useState({ value: new Date(),
                                       now: new Date(),
                                       onValueChanged: onValueChanged.bind(this) });

  return (
          <div className={s.header +' '+ "dx-fieldset"}>
            
            <div className={s.calendarTmp}>             
                
                <div className={s.fromTmp +' '+ "dx-field-value"}>
                  <DateBox defaultValue={state.now} value={state.value} 
                    type="date" onValueChanged={e => props.setDateFrom(e.value)} />
                </div>

                <div className={s.toTmp +' '+ "dx-field-value"}>
                  <DateBox defaultValue={state.now} value={state.value} 
                    type="date" onValueChanged={e => props.setDateTo(e.value)} />                
                </div>
            
            </div>

            <Button type="default" stylingMode="contained" text="Применить" height="35" onClick={() => props.setItemsByDate()} />
            <Button className={s.reset} type="default" stylingMode="contained" text="Сбросить даты" height="35" onClick={onResetDate} />

          </div>
  );
}


export default connect(null, { setDateFrom: setDateFromThunk,
                               setDateTo: setDateToThunk,
                               setItemsByDate: setItemsByDateThunk,
                               resetDate: initialThunk })(Calendar);

