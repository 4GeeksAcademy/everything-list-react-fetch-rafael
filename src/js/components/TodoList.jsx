import React, { useEffect, useState } from "react";
// CREO MI FUNCTION
const TodoList = () => {
  const [task, setTask] = useState("");
  // GUARDO LA LISTA DE TAREAS
  const [tasks, setTasks] = useState([]);

  const API_BASE_URL = "https://playground.4geeks.com/todo"
  const User_NAME= "RAFAEL11"

  //FUNCION PARA CREAR USUARIO SI NO EXISTE
   const createUser = async () =>{
    try {
        const response = await fetch(`${API_BASE_URL}/users/${User_NAME}`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            }
        })
        if(response.ok){
           console.log("El usuario ha sido creado exitosmaente!")
        }
    } catch (error) {
        console.log("Error creando nuestro usuario en la api:", error)
    }
   }

   //FUNCION PARA CARGAR TAREAS DEL SERVIDOR
     const loadTasks = async ()=>{
        try {
            const response = await fetch(`${API_BASE_URL}/users/${User_NAME}`)
            if (response.ok){
             const userData = await response.json()
             setTasks(userData.todos)
            }else if(response.status === 404){
             await createUser()
             setTasks([])
            }
        } catch (error) {
            console.log("Error en el proceso de carga de tareas:", error)
        }
     }

     //Cargar Tareas al inciar el componente mediante un USEFFECT

     useEffect(()=>{
        loadTasks()
     },[])


  // NECESITO FUNCION PARA ENVIAR FORMULARIO
  const sendform = async() => {
    
    try {
      //CREAR UNA NUEVA TAREA EN EL SERVIDOR
      const response = await fetch(`${API_BASE_URL}/todos/${User_NAME}`,{
        method: "POST",
        headers:{
                "Content-Type": "application/json",
            },
        body: JSON.stringify({
          label:task,
          is_done: false
        })
      })
      if(response.ok){
        //Reacarga la lista de tareas para actualizar la interfaz
        await loadTasks()
        //Limpieza de input
        setTask("")
      }
    } catch (error) {
      console.log("Error a la hora de agregar una tarea nueva:", error)
    }
  };
  // CREO FUNCION PARA ELIMINAR TAREA (DELETE)
  const deleteTask = async(todoId) => {
   
    try {
       const response = await fetch (`${API_BASE_URL}/todos/${todoId}`, {
        method: "DELETE"
       })
       if(response.ok){
        //Reacarga la lista de tareas para actualizar la interfaz
        await loadTasks()
      }
    } catch (error) {
      console.log("Error eliminando tarea:", error)
    }
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
        {tasks.map((tarea) => (
          <li
            key={tarea.id}
            className="list-group-item d-flex justify-content-between align-items-center all-item"
          >
            {/* AQUI MUESTRO LA TAREA */}
            {tarea.label}
            {/* CREO BOTON PARA ELIMINAR TAREA Y DENTRO DE LLAVES O SE MOSTRARA EN PANTALLA*/}
            <button
              className="btn btn-danger btn-sm delete-btn"
              onClick={() => deleteTask(tarea.id)}
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







