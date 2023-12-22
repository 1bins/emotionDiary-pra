import './App.css';
import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter(elem => elem.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map(elem => elem.id === action.data.id ? {...action.data} : elem)
      break;
    }
    default:
      return newState;
  }
}

export const DiaryStateContext = React.createContext();
export const DiarydispatchConent = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1703205020469
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1703205020470
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1703205020471
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1703205020472
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1703205020473
  }
]

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({type: "CREATE", data: {id: dataId.current, date: new Date(date).getTime(), content, emotion}});
    dataId.current += 1;
  }

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId})
  }

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({type: "EDIT", data: {id: targetId, date: new Date(date).getTime(), content, emotion}})
  }



  return (
    <DiaryStateContext.Provider value={data}>
      <DiarydispatchConent.Provider value={{onCreate, onEdit, onRemove}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/new' element={<New></New>}></Route>
              <Route path='/edit' element={<Edit></Edit>}></Route>
              <Route path='/diary/:id' element={<Diary></Diary>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiarydispatchConent.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
