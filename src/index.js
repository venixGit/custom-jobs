import './styles.css';
//import all class from file index
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

//export const of class TodoList
export const todoList = new TodoList();
// const tarea = new Todo(' Aprendiendo javaScript ');
// todoList.nuevoTodo( tarea );
// console.log( todoList );
// tarea.completado = false;
// crearTodoHtml( tarea );

//foreach to one argument
// todoList.todos.forEach(crearTodoHtml);

//llamamos un metodo de la clase
// todoList.todos[0].imprimirClase();

// console.log( 'todos:', todoList.todos );

//cuando tengo mas de un argumento
todoList.todos.forEach( todo => crearTodoHtml( todo ) );//hacer persistente mis datos del local storage

