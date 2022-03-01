import React, {useState, useEffect} from 'react';
import './style.css';


// get back of localStorage data 
const getLocalData = () =>{
    const Lists = localStorage.getItem("mytodoList");

    if(Lists){
      return JSON.parse(Lists);
    } else {
      return []; 
    }
};

const Todo = () => {

  const [inputdata, setInputdata] = useState('');
  const [items, setItems] = useState(getLocalData());
  const [editedItem, setEditedItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

// add the item function.. 
  const additems = () =>{
    if(!inputdata){
      alert('pls add data')
    } else if(inputdata && toggleButton){
      setItems(
        items.map((currElm)=>{
          if (currElm.id === editedItem){
            return{...currElm, name: inputdata };
          }
          return currElm;
        })
      );
      setInputdata([]);
      setEditedItem("null");
      setToggleButton(false);
    }
     else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata
      }
      setItems([...items, myNewInputData]);
      setInputdata('');
    }
  };

  const deleteItem = (index) =>{
    const updatedItems = items.filter((currElm)=>{
      return currElm.id!== index;
    });
    setItems(updatedItems);
  };

  // edit the items... 

  const editItem = (index) =>{
    const edited_item = items.find((currElm)=>{
      return currElm.id === index;
    });

    setInputdata(edited_item.name);
    setEditedItem(index);
    setToggleButton(true);
  };

//  deleting items.at.. 
  const removeAll = () =>{
    setItems([]);
  };

  // adding localStorage...... 

  useEffect(() => {
    localStorage.setItem("mytodoList", JSON.stringify(items));    
  }, [items]);
  

  return <>
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src="./logo192.png" alt="todosymbol" />
          <figcaption>Add items</figcaption>

          <div className="addItems">
            <input type="text" placeholder='Enter the Item 🛒' className='form-control'
            value={inputdata}
            onChange={(event)=>setInputdata(event.target.value)}
             />
             {
               toggleButton ? (
                 <i className="far fa-edit add-btn" onClick={additems}></i>
                 ) : (<i className="fa fa-plus add-btn" onClick={additems}></i>)
             }
          </div>
           {/* show items  */}
           <div className="showItems">
           {items.map((currElm)=>{                     
            return <div className="eachItem" key={currElm.id} >
                <h3>{currElm.name}</h3>
                <div className="todo-btn">
                <i className="far fa-edit add-btn" onClick={()=>editItem(currElm.id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(currElm.id)}></i>
                </div>
             </div>
           })}
           </div>

           {/* Remove all items  */}
          <div className="showItems">
            <button className="btn effect" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>Show</span>
            </button>
          </div>
        </figure>
      </div>
    </div>
  </>;
};

export default Todo;
