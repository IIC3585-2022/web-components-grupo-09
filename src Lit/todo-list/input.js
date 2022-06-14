import { LitElement, html } from 'lit-element';

class TodoInputLit extends LitElement {
    static get properties() {
        return {
          value: { type: String},
        }
      }
    set value(value) {
        const oldValue = this.value;
        // do some side effect here        
        // set a pseudo-private property that will contain the actual value
        this._value = value;
        // call LitElement's requestUpdate so that a rerender is done if needed
        this.requestUpdate('value', oldValue);
    }
    
    get value() {
        // return the pseudo-private so that when vitextfield.value is accessed the correct value is returned
        return this._value;
    }

    onChange(e) {
        this.value = e.target.value;
    }
    
    render(){
        return html`
        <form id="todo-form">
            <input
                id="todo-input"
                type="text"
                placeholder="Agregar a la lista"
                value="${this.value}"
                @change=${this.onChange}
            />
            
        </form>
        `;
    }
   
}

window.customElements.define('to-do-list-input', TodoInputLit);