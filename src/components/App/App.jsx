import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import './App.css';
import Form from '../Form/Form.jsx';
import {
  fetchItems,
  deleteItems,
  updateItemPurchased,
} from '../../AddItemApi/AddItemApi.jsx';

function App() {
  // declare our variables
  const [shoppingList, setShoppingList] = useState([
    { name: 'milk', quantity: 1, unit: 'gallon' },
  ]); // end of useState (declaring our variables)

  // Refresh Shopping List
  const refreshShoppingList = () => {
    const listPromise = fetchItems();
    listPromise
      .then((response) => {
        // success; Axios GET request & promise
        console.log('Data from server: ', response);
        setShoppingList(response.data);
      })
      .catch((error) => {
        // not successful
        console.error('Error in Axios GET: ', error);
      });
  }; // end of Refresh Shopping List

  // initial load of components
  useEffect(() => {
    console.log('Testing Items');
    // api call
    refreshShoppingList();
  }, []); // end of useEffect - initial load of components

  const handleDeleteButton = (id) => {
    //ID item
    console.log('DELETE - itemId:', id);
    //MAKE axios call
    deleteItems(id)
      .then((response) => {
        refreshShoppingList();
      })
      .catch((error) => {
        console.error('ERROR in deleting items', error);
      });
  };

  //Purchased Button
  const handlePurchasedStatus = (id) => {
    updateItemPurchased(id)
      .then((response) => {
        refreshShoppingList();
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  // Everything in the return will appear on the DOM
  return (
    <div className="App">
      <Header />
      <Form refreshShoppingList={refreshShoppingList} />
      <main>
        {/* render shopping list onto page: .map loops our data for us */}
        <h1>Shopping List</h1>
        {shoppingList.map((itemData, dataIndex) => {
          return (
            <div key={dataIndex}>
              {/* How we want the data to appear on the DOM: */}
              <h3>{itemData.name}</h3>
              <p>
                {itemData.quantity} {itemData.unit}
              </p>
              <div>
                Purchased Status:
                <i>{itemData.purchased ? 'True' : 'False'}</i>
              </div>
              <button
                type="button"
                onClick={(event) => handlePurchasedStatus(itemData.id)}>
                Buy
              </button>
              <button
                onClick={(event) => handleDeleteButton(itemData.id)}
                type="button">
                Delete
              </button>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
