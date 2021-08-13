import { todoList } from "../index";
import { Todo } from "../classes";

//Referencias en HTML
const divTodoList     = document.querySelector('.todo-list');
const txtInput        = document.querySelector('.new-todo');
const btnBorrarAll    = document.querySelector('.clear-completed');
const ulFiltros       = document.querySelector('.filters');
const anchorFiltros   = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    //create div, to save ul tag all li tag
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    //mantener el tag li y no el div usando firstElementChild
    divTodoList.append( div.firstElementChild );

    return div;

}


//Eventos
txtInput.addEventListener('keyup', ( event ) => {

    if ( event.keyCode === 13 && txtInput.value.length > 0 ){

        // console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value ); //obtiene el valor que hay en el input
        todoList.nuevoTodo( nuevoTodo ); //agregamos el valor al arreglo todos[]
        // console.log( todoList );

        crearTodoHtml( nuevoTodo ); //show list in html
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => {//danto click al elemento ?
    // console.log( event.target.localName );
    const nombreElemento = event.target.localName;// input, label, button.
    const todoElemento   = event.target.parentElement.parentElement;//show li tag completed
    const todoId         = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input') ){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    }
    else if( nombreElemento.includes('button')){
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );/*Al estar en una lista, y tener el elemento ya guardado,
                                                puedo decir que elemento html se removera*/
    }

    // console.log( todoList );
});

btnBorrarAll.addEventListener('click', ( event ) => {
    todoList.eliminarCompletados();
                                                             /** El ciclo lo que va hacer es recorrer de forma 
                                                              * descendente los elementos que esten completados-*/
    for( let i = divTodoList.children.length-1; i >= 0; i-- ){
        const elemento =  divTodoList.children[i];
        
        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }
    } 
    // console.log( todoList );
});

ulFiltros.addEventListener('click', ( event ) => {
 
    const filtro = event.target.text;
    if( !filtro ){ return; }//sino esta vacio, retorna el nombre del tag. Todos, Pendientes, Completados

                                                                    
    anchorFiltros.forEach( elem => elem.classList.remove('selected'));/*barrer cada uno de los anchor tag, 
                                                                         removemos la clase selected, 
                                                                        que hace que parezca un boton*/
    event.target.classList.add('selected'); //agrega la clase al tag.


    for( const elemento of divTodoList.children){//el children obtiene los nodos hijos de la raiz,

        elemento.classList.remove('hidden'); //removemos la classe hidden, que esconde los tag
        const completado = elemento.classList.contains('completed');//saber si esta compleatdo o no
        
        switch( filtro ){
            case 'Pendientes': //oculta los que tengan la clase completed
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados': //oculta todos los que no tengan la clase completed
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }

});