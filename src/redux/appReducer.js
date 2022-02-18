import React from 'react';
import {generateData} from './api';

const GET_DATA = 'appReducer/GET_DATA';
const INITIAL = 'appReducer/INITIAL';
const SET_FROM = 'appReducer/SET_FROM';
const SET_TO = 'appReducer/SET_TO';
const SET_ITEMS_BY_DATE = 'appReducer/SET_ITEMS_BY_DATE';

let initialState = {
  items : [],
  initialazed: false,
  from: 0,
  to: new Date().getTime()
};

const appReducer = (state = initialState, action) => {
    switch(action.type){
      case GET_DATA:{
          return {...state, items: action.items};
      };
      case INITIAL:{
          return {...state, initialazed: action.value};
      };
      case SET_FROM:{         
         return {...state, from: Math.abs(action.date.getTime())};
      };
      case SET_TO:{
        return {...state, to: Math.abs(action.date.getTime())};
      };
      case SET_ITEMS_BY_DATE:{

        return {...state, items: state.items.filter( item => {

           if(item.birthDate.getTime() >= state.from && item.birthDate.getTime() <= state.to){
             return item;
           }

        })};
      };
      default: return state;
    }
};


const initialazedAC = value => ({type: INITIAL, value});
const getDataAC = items => ({type: GET_DATA, items});
const setDateFromAC = date => ({type: SET_FROM, date});
const setDateToAC = date => ({type: SET_TO, date});
const setItemsByDateAC = () => ({type: SET_ITEMS_BY_DATE});

export const setItemsByDateThunk = () => dispatch => {
   dispatch(setItemsByDateAC());
};

export const setDateFromThunk = date => dispatch => {
   dispatch(setDateFromAC(date));
};

export const setDateToThunk = date => dispatch => {
   dispatch(setDateToAC(date));
};

export const initialThunk = value => dispatch => {
   let items = dispatch(getDataThunk(120));

   dispatch(initialazedAC(value));
};

const getDataThunk = count => dispatch => {
  dispatch(getDataAC(generateData(count)));
};

export default appReducer;