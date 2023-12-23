import React, { useEffect, useState } from "react";

const Hotel = () =>{
    const [enterdId,setId]=useState('');
    const [enteredPrice,setPrice] = useState('');
    const [enteredDish, setDish] = useState('');
    const [user,setUser] = useState([]);
    const [isValid, setIsValid] = useState(false);

    useEffect(()=>{
        const localStorageObj = localStorage;
        const localStorageKeys = Object.keys(localStorageObj);
        const loadedobj =[]
        for(let i=0; i<localStorageKeys.length;i++){
          const key = localStorageKeys[i]
          const userDetailsString = localStorageObj[key];
          const userDetailsObj = JSON.parse(userDetailsString);
          loadedobj.push(userDetailsObj);
        }
        setUser(loadedobj)
    },[])

    const submitHandler = (event) =>{
        event.preventDefault();
        const existingId = user.filter((user,index)=>
            user.id === enterdId
        )
        if (existingId.length >0){
            alert('item ID already exists');
            setDish('');
            setId('');
            setPrice('');
            return;
        }
        const enteredTable = event.target.table.value;
        const obj = {
            id : enterdId,
            price: enteredPrice,
            enteredDish : enteredDish,
            table : enteredTable
        }
        localStorage.setItem(enterdId,JSON.stringify(obj));
        setUser([...user,obj]);
        

        setIsValid(false);
        setId('');
        setDish('');
        setPrice('');
    }

    const idHandler = (event)=>{
        
        setId(event.target.value);
        
    }
    const priceHandler = (event) =>{
       
        setPrice(event.target.value);
    }
    const dishHandler = (event) =>{
        
        setDish(event.target.value);
    }

    useEffect(() =>{
        if(enterdId > 0 && enteredDish.trim().length >0 && enteredPrice > 100){
                setIsValid(true);
            }
    },[enterdId,enteredPrice,enteredDish]);

    const deleteOrder =(id)=>{
        const updatedTable = user.filter((item)=>item.id !== id )
        setUser(updatedTable);
        localStorage.removeItem(id);
    }


    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>Unique id: </label>
                <input type='number' value={enterdId} onChange={idHandler}/>
                <label>Choose Price: </label>
                <input type='number' value={enteredPrice} onChange={priceHandler} />
                <label>Chooose Dish:</label>
                <input type='text'  value={enteredDish} onChange={dishHandler}/>
                <label>Choose a Table</label>
                <select name="" id="table">
                    <option value="table1">Table1</option>
                    <option value="table2">Table2</option>
                    <option value="table3">Table3</option>
                 </select>
                <button  style={{marginLeft:"10px"}} disabled={!isValid} >Add To Bill</button>
            </form>
            <div>
                <h1>Orders</h1>
                
                <div>
                    <h2>Table 1</h2>{
                        user.map((user,index) =>(
                            user.table === 'table1' && <li key={index}>{user.price}-{user.table}-{user.dish} <button onClick={() =>{deleteOrder(user.id)} }>Delete Order</button></li>
                        ))
                        
                    } 
                    <h2>Table 2</h2>{
                        user.map((user,index) =>(
                            user.table === 'table2' && <li key={index}>{user.price}-{user.table}-{user.dish} <button onClick={() =>{deleteOrder(user.id)} }>Delete Order</button></li>
                        ))
                    }
                    <h2>Table 3</h2>{
                        user.map((user,index) =>(
                        user.table === 'table3' && <li key={index}>{user.price}-{user.table}-{user.dish} <button onClick={() =>{deleteOrder(user.id)} }>Delete Order</button></li>
                        ))
                    }
                </div>
                
                
            </div>
        </div>
    );
}

export default Hotel;