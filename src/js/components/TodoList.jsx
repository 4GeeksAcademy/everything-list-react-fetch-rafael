import React, { useState } from "react";
// CREO MI FUNCTION
const TodoList = () => {
  const [task, setTask] = useState("");

  // GUARDO LA LISTA DE TAREAS
  const [tasks, setTasks] = useState([]);

  // NECESITO FUNCION PARA ENVIAR FORMULARIO
  const sendform = (element) => {
    element.preventDefault();  

    // CREO UNA LISTA DE TAREAS, CON LA ACTUAL AÑADIDA ...
    setTasks([...tasks, task]);

    // NECESITO LIMPIAR EL INPUT, CADA VEZ QUE AGREGO UNA TAREA
    setTask("");
  };

  // CREO FUNCION PARA ELIMINAR TAREA (DELETE)
  const deleteTask = (index) => {
    // FILTRO TODAS LAS TAREAS CON INDEX PARA SABER QUE QUIERO BORRAR
    const newTasks = tasks.filter((_, i) => i !== index);

    // ACTUALIZO EL ESTADO CON MI NUEVA TAREA
    setTasks(newTasks);
  };

  // LET VARIABLE PARA LO QUE VAMOS A MOSTRAR EN PANTALLA
  let content;

  // SI NO HAY TAREAS MUESTRO MENSAJE! PARA QUE EL CLIENTE AGREGUE
  if (tasks.length === 0) {
    content = <p className="text-center mt-3">No hay tareas aún, agrega una...</p>;
  } 
  // SI HAY TAREAS, NECESITO MOSTRAR LA LISTA! HAGO UN MAPEO
  else {
    content = (
      <ul className="list-group mt-3">
        {tasks.map((tareas, index) => (
          <li
            key={index} 
            className ="list-group-item d-flex justify-content-between align-items-center"
          >
            {/* AQUI MUESTRO LA TAREA */}
            {tareas}

            {/* CREO BOTON PARA ELIMINAR TAREA Y DENTRO DE LLAVES O SE MOSTRARA EN PANTALLA*/}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    );
  }

  // LEVANTO O RENDERIZO
  return (
    <div className="container mt-5">
      <h1 className="text-center">Todo List</h1>

      {/* FORMULARIO CON MI INPUT DONDE CLIENTE ESCRIBE */}
      <form onSubmit={sendform} className="d-flex mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe una tarea..."
          value={task} // SIEMPRE MOSTRAMOS EL ESTADO YA CTUALIZAMOS CUANDO SE ESCRIBE
          onChange={(e) => setTask(e.target.value)} 
        />
        <button className="btn btn-primary ms-2">Agregar Task</button>
      </form>

      {/* AQUI INSERTO MI CONTENIDO DE IF O ELSE :) */}
      {content}
    </div>
  );
};

export default TodoList;


