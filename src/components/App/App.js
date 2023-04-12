import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main'
import request from '../../utils/utils';
import { DataContext } from '../../services/dataContext';

const API_DATA = `https://norma.nomoreparties.space/api/ingredients`;

function App(){

/*   const [state, setState] = React.useState({ 
    ingredientsData: null,
    hasError: false,
    loading: true
  }) */

  const [burger, setIngredients] = React.useState({ 
    ingredients: null,
    hasError: false,
    loading: true
  });
/*   const [itemsRequest, setItemsRequest] = React.useState(false); */

  React.useEffect(() => {
    const getIngredientsData = async () => {
      setIngredients({...burger.ingredients, loading: true});
      await request(API_DATA)
      .then(res => {
        if (res.success) {
          setIngredients({ ingredients: res.data, hasError: false, loading: false });
        }
      })
      .catch(error => {
        setIngredients({ ...burger.ingredients, hasError: true, loading: false });
        console.log(error);
      });
    }

    getIngredientsData();
  }, [])
   

  return (
    <DataContext.Provider value={{burger, setIngredients}}>
      <AppHeader />
      {burger.loading && 'Загрузка...'}
      {burger.hasError && 'Произошла ошибка'}
      {!burger.loading && <Main />}
    </DataContext.Provider>
  );
}

export default App;