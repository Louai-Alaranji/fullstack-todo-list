import { useState } from "react";



function Todo(){
    const[itemsList, setItemsList] = useState([])
    const[itemName, setItemName] = useState("");
    const [itemDesc, setItemDesc] = useState("");
    const[popupOpen, setPopupOpen] = useState(false);
    const[selectedItem, setSelectedItem] = useState(null);

    function handleAddItem(){
        if (!itemName.trim()) {
            // Check if the name  is empty
            console.error('Name and description are required.');
            return;
        }

        const name = document.querySelector(".input-field").value
        const desc = document.querySelector(".text-area").value

        const newItem = {
            name : name,
            description : desc
        }

        fetch("https://localhost:7146/api/Todo",{
            method : "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newItem)
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Failed to add");
            }
            return response.json();
        })
        .then(data =>{
            // Include the ID received from the backend in the newItem object
            newItem.id = data.id;
            // If the item was added successfully, update the state with the new item
            setItemsList( (prevItemsList) => [...prevItemsList, newItem] )
            setItemDesc("")
            setItemName("")
        })
        .catch(error => {
            console.error('Error adding item:', error);
        });
    }

    function handlePopup(index) {
        setSelectedItem(itemsList[index])
        setPopupOpen(true);
    }
    
    function handleClosePopup() {
        setPopupOpen(false);
    }

    function deleteItem(index){
    const idToDelete = itemsList[index].id; // Assuming you have an 'id' property in your todo items
    fetch(`https://localhost:7146/api/Todo/${idToDelete}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
        // If deletion is successful, update the state to remove the deleted item
        setItemsList(prevItemsList => prevItemsList.filter((_, i) => i !== index));
    })
    .catch(error => {
        console.error('Error deleting item:', error);
    });
    }
    return(<>
    <div className="app-div">
    {popupOpen && <div className="backdrop"></div>}
    <h1>Todo List</h1>
        <ol>
            {itemsList.map( (item, index) => <li key={index}
            className="list-item"
            onClick={()=>handlePopup(index)}> <span>{item.name} </span>
            <button className="delete-button" 
            onClick={(e)=> {e.stopPropagation(); deleteItem(index)}}>Delete</button></li> )}
        </ol>
        
        <div className="input-div">
            
            <input required className="input-field" 
            type="text" 
            onChange={(e) => setItemName(e.target.value)} value={itemName}/> 

            <button className="add-button" onClick={handleAddItem}>Add</button>
        </div>

        <div className="text-area-div">
            <textarea
            className="text-area"
            cols="30"
            rows="10"
            onChange={(e) => setItemDesc(e.target.value)}
            value={itemDesc}
            ></textarea>
        </div>
    </div>
    {popupOpen && (
                <div className="popup">
                    <h2>{selectedItem.name}</h2>
                    <p>{selectedItem.description}</p>
                    <button onClick={handleClosePopup}>Close</button>
                </div>
    )}
    </>
    )
}

export default Todo;