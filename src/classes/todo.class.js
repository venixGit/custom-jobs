
export class Todo{

    /**Cuando se guardan datos persistentes en el local-storage, los 
     * metodos se pierden y ya no pueden ser utilizados, mas en este ejemplo 
     * porque los arreglos estan convertidos como objetos, y no como instancias
     * del objeto.
     * Para esto se puede crear metodos estaticos implementando la desustructuracion
     * asi cuando retornemos el objeto, este pueda ser obtenido donde lo necesitemos.
     */
    static fromJson({ id, tarea, completado, creado }){
        const tempTodo = new Todo( tarea );

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor( tarea ){
        this.tarea = tarea;

        this.id         = new Date().getTime(); //obtiene la fecha en milisegundos 231321141
        this.completado = false;
        this.creado     = new Date();
    }

    imprimirClase(){
        console.log(`${ this.tarea } - ${ this.id }` );
    }
}