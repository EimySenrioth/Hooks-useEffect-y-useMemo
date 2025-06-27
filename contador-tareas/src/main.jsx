import React, { useState, useEffect, useMemo } from 'react';

function App() {//defino los estado con valor inical vacio
  const [ordenes, setOrdenes] = useState([]);
  const [tipo, setTipo] = useState('');
  const [cantidad, setCantidad] = useState('');
  // use el escenario de ordenes de pizza para ilustrar el uso de useState, useEffect y useMemo
  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
    document.title = `Total: ${totalPizzas} pizzas`;
  }, [ordenes]);  // Se ejecuta cada vez que las órdenes cambian

  // Cálculo de total de pizzas, reduce acumula la suma de todas las cantidades que empieza en 0
  const totalPizzas = useMemo(() => {
    console.log("Calculando total de pizzas...");
    return ordenes.reduce((total, orden) => total + orden.cantidad, 0);
  }, [ordenes]); // olverá a calcular el valor memorizado si el valor de ordenes cambia

  // Función para agregar una nueva orden
  const agregarOrden = () => {
    if (tipo && cantidad) {
      setOrdenes([...ordenes, { tipo, cantidad: parseInt(cantidad) }]);
      setTipo('');//...ordenes usa el operador spread (...) para "desempaquetar" todos los elementos del arreglo ordenes actual dentro de uno nuevo.
      setCantidad('');
    }
  };

  return ( //onChange={e => setCantidad(e.target.value)
    //Es un evento que se dispara cada vez que el valor del <input>
    //e.target es el elemento HTML que disparó mas el .value es el valor actual que tiene el input, lo que el usuario acaba de escribir o modificar.
    //<ul> es una lista desordenada HTML (bullet points).
    //{ordenes.map((orden, index) => ( ... ))} para recorrer el arreglo ordenes, yuda a React a manejar mejor las listas cuando cambian
    <div>
      <h1>Órdenes de Pizza</h1>
      <div>
        <input 
          type="text" 
          value={tipo} 
          onChange={e => setTipo(e.target.value)} 
          placeholder="Tipo de pizza" 
        />
        <input 
          type="number" 
          value={cantidad} 
          onChange={e => setCantidad(e.target.value)} 
          placeholder="Cantidad" 
        />
        <button onClick={agregarOrden}>Agregar orden</button>
      </div>

      <h2>Órdenes</h2>
      <ul>
        {ordenes.map((orden, index) => (
          <li key={index}>{orden.tipo}: {orden.cantidad}</li>
        ))}
      </ul>

      <h3>Total de pizzas: {totalPizzas}</h3>
    </div>
  );
}

export default App;
