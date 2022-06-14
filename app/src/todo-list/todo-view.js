import { LitElement, html } from 'lit-element';

const VisibilityFilters = {
    SHOW_ACTIVE: "Active",
    SHOW_COMPLETED: "Completed",
    SHOW_ALL:'All',
}

class TodoView extends LitElement{
    static get properties(){
        return{
            item1: {type: String},
            item2: {type: String},
            item3: {type: String},
            todos: {type: Array},
            filter: { type: String},
            value: {type: String}
        }
    }
    constructor(){
        super();
        this.item1= this.getAttribute("item1");
        this.item2= this.getAttribute("item2");
        this.item3= this.getAttribute("item3");
        this.todos = [{
            task : this.item1,
            complete: false,
            id: 0,
        },
        { task : this.item2,
            complete: false,
            id: 1},
            
        {
            task : this.item3,
            complete: false,
            id: 2
        }];
        this.filter = VisibilityFilters.SHOW_ALL;
        this.value = '';
    }

    render(){
        return html`
           <div class="input-layout" >
                <form id="todo-form">
                    <input
                        id="todo-input"
                        type="text"
                        placeholder="Agregar a la lista"
                        .value="${this.value}"
                       @change=${this.onChange}
                    />
                    <button
                    @click = "${this.addTodo}"
                    >Add to do</button>
                </form>
           </div>
           <div class= "todos-list">

                ${this.applyFilter(this.todos).map(todo =>html` 
                    <div class="todo-item">
                        <input
                            type="checkbox"
                            ?checked="${todo.complete}"
                            @change = "${e=>this.updateTodoStatus(todo, e.target.checked)}"
                        >${todo.task}
                         </input> 
                         <button 
                         class="delete"
                         id = "${todo.id}"
                         @click = "${this.remove}"
                         >
                         Borrar
                         </button> 
                    </div>
                `)}
            </div>
           <form 
           class= radio-group 
           >
                ${Object.values(VisibilityFilters).map(filter => html`
                    <input type="radio" 
                    name="radio" 
                    value=${filter} 
                    @click = "${this.filterChanged}"
                    checked>
                    ${filter}
                    </input>
                `)};
           </form>
           

        `;
    }

    filterChanged(e){
        this.filter = e.target.value;
    }
    applyFilter(todos){
        switch (this.filter){
            case VisibilityFilters.SHOW_ACTIVE:
                return todos.filter(todo => !todo.complete);
            case VisibilityFilters.SHOW_COMPLETED:
                return todos.filter(todo => todo.complete);
            default:
                return todos;
        }
    }
   remove(e){
       e.preventDefault();
       this.todos = this.todos.filter(item => item.id !=e.target.id)

   }
    onChange(e){
        this.value = e.target.value;
    }
    addTodo(e){
        e.preventDefault();
        if(this.value){
            this.todos = [...this.todos, {
                task : this.value,
                complete: false,
                id: this.todos.length -1,
            }];
            this.value = '';       
        }
    }
    updateTodoStatus(updatedTodo, complete){
        this.todos = this.todos.map(todo =>
            updatedTodo == todo ? {...updatedTodo, complete} : todo
        );
    }

}

customElements.define('todo-view', TodoView);
