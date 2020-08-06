import React from 'react';

const Item = ({
  changeStatus
  , clearItem
  , index
  , item 
}) => {
  return (
    <li >
      <label>
        <input type="checkbox" checked={item.done} onChange={(e) => changeStatus(e, index)} /> 
        <span className={item.done ? "done" : ""}>{item.text}</span>
        {item.done ? 
          <button type="button" onClick={() => clearItem(index)}>clear</button>
          :
          null 
        }
      </label>
    </li>
  )
} 

export default Item;