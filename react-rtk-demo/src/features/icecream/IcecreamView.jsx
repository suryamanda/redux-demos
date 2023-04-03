import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ordered, restocked } from './icecreamSlice';

export const IcecreamView = () => {
  const [value, setvalue] = useState(1);
  const numOfIcecreams = useSelector (state => state.icecream.numOfIcecreams)
  const dispatch = useDispatch();
  return (
    <div>
        <h2>Number of Icecreams - {numOfIcecreams}</h2>
        <button onClick={() => {dispatch(ordered())}}>Order Icecream</button>
        <input type= 'number' value = {value} onChange={e => setvalue(parseInt(e.target.value))} />
        <button onClick={() => {dispatch(restocked(value))}}>Restock Icecreams</button>
    </div>
  )
}
