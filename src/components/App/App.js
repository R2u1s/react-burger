import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main'
import request from '../../utils/utils';

const API_DATA = `https://norma.nomoreparties.space/api/ingredients`;

function App(){

  const [state, setState] = React.useState({ 
    ingredientsData: null,
    hasError: false,
    loading: true
  })

  React.useEffect(() => {
    const getIngredientsData = async () => {
      setState({...state, loading: true});
      const res = await request(API_DATA)
      .then(data => setState({ ingredientsData: data, hasError: false, loading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
    }

    getIngredientsData();
  }, [])
   

  return (
    <>
      <AppHeader />
      {!state.loading && <Main data={state.ingredientsData.data}/>}
    </>
  );
}

export default App;