import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main'

const API_DATA = `https://norma.nomoreparties.space/api/ingredients`;

function App(){

  const [state, setState] = React.useState({ 
    ingredientsData: null,
    loading: true
  })

  React.useEffect(() => {
    const getIngredientsData = async () => {
      setState({...state, loading: true});
      const res = await fetch(API_DATA);
      const data = await res.json();
      setState({ ingredientsData: data, loading: false });
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