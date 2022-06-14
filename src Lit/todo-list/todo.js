import { LitElement, html } from 'lit-element';

class TodoListLit extends LitElement{
    
    render(){
        return html`
            <div id="to-do-list">
            
            </div>
        `;
    }


}

window.customElements.define("todo-list-lit", myToDo);