// imports
import { useState } from 'react';
import { postItems } from '../../AddItemApi/AddItemApi';

function Form (props) {
    console.log("in Form.jsx");
    // declare variables:
    const [nameValue, setNameValue] = useState('');
    const [quantityValue, setQuantityValue] = useState('');
    const [unitValue, setUnitValue] = useState('');

    // handle change of events - tracks what we type in the forms
    const handleChangeOfName = (event) => {
        setNameValue(event.target.value);
    };

    const handleChangeOfQuantity= (event) => {
        setQuantityValue(event.target.value);
    };

    const handleChangeOfUnit = (event) => {
        setUnitValue(event.target.value);
    };

    const handleSubmitButton= (event) => {
        // stops page from refreshing when submit button is pressed.
        event.preventDefault() 
        console.log("Values for submit: ", {
            name: nameValue,
            quantity: quantityValue,
            unit: unitValue
        });

        //Axios Post Request
        postItems({
            name: nameValue,
            quantity: quantityValue,
            unit: unitValue
        })
        .then ((response) => {
            // refresh the list so new item appears on page
            props.refreshShoppingList();

            // clear the values in the form
            setNameValue('');
            setQuantityValue('');
            setUnitValue('');
        })
        .catch((error) => {
            console.error("ERROR IN AXIOS POST: ", error);
        })
    }; // end of handleSubmitButton()

    return (
        <div>
            <form onSubmit={handleSubmitButton}>
                <h1>Add an Item</h1>
                Item: <input type="text" onChange={handleChangeOfName} value={nameValue}></input>
                Quantity: <input type="text" onChange={handleChangeOfQuantity} value={quantityValue}></input>
                Unit: <input type="text" onChange={handleChangeOfUnit} value={unitValue}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form;