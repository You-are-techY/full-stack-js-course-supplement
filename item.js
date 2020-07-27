const Item = ({
  changeStatus
  , clearItem
  , index
  , item 
}) => {
  // console.log("logging index", index);
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