import { Todo } from './todo.class.js';

export class TodoList {

    constructor(){
        // this.todos = [];//initial array
        this.cargarLocalStorage();
    }

    //insert
    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    //delete
    eliminarTodo( id ){
       //Filter() crea un nuevo arreglo excluyendo el elemento que tiene el mismo id.
       this.todos = this.todos.filter( todo => todo.id != id );//callback todo
       this.guardarLocalStorage();
    }

    //edit
    marcarCompletado( id ){
        for ( const todo of this.todos ){

            // console.log( id, todo.id ); //string and integer

            if( todo.id == id ){ //validated equal id
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    //delete all complete
    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado );//return array diferent of true.
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );
    }

    cargarLocalStorage(){

        this.todos = ( localStorage.getItem('todo') )//obtiene el string 
                        ? JSON.parse( localStorage.getItem('todo') ) //convierte a objeto
                        : [];

        /*llamamos la funcion estatica para poder utilizar otros metodos que se 
        tengan dentro de la clase. El map me permite barrer cada uno de los elementos
        que estan dentro de un arreglo y retornar un nuevo arreglo con cada uno de esos
        objetos, en este caso vamos a recibir no objetos sino instancias, al igual que 
        en otras ocasiones si solo recibimos un argumento lo que podemos hacer es
        pasar solo la clase con su propiedad, lo que hace mas facil de leer*/
        // this.todos = this.todos.map( Todo.fromJson );
        this.todos = this.todos.map( obj => Todo.fromJson( obj ));
    }

}