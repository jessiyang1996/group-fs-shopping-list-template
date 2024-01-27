import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import './App.css';
import { fetchItems } from '../../AddItemApi/AddItemApi.jsx';
import Form from '../Form/Form.jsx';

function App() {
    // declare our variables
    const [shoppingList, setShoppingList] = useState([
        {name: "milk", quantity: 1, unit: "gallon"}
    ]); // end of useState (declaring our variables)

    // Refresh Shopping List
    const refreshShoppingList = () => {
        const listPromise = fetchItems();
        listPromise
            .then((response) => {
                // success; Axios GET request & promise
                console.log("Data from server: ", response);
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
    
    // Everything in the return will appear on the DOM
    return (
        <div className="App">
            <Header />
            <Form refreshShoppingList={refreshShoppingList}/> 
            <main>
                {/* render shopping list onto page: .map loops our data for us */}
                <h1>Shopping List</h1>
                    {shoppingList.map((itemData, dataIndex) => {
                        return (
                            <div key={dataIndex}>
                                {/* How we want the data to appear on the DOM: */}
                                <h3>{itemData.name}</h3>
                                <p>{itemData.quantity} {itemData.unit}</p>
                                <button type="button">Purchased</button>
                                <button type="button">Delete</button>
                            </div>
                        )
                    })}
            </main>
        </div>
    );
}

export default App;
