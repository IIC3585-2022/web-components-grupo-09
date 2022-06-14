import { LitElement, html } from 'lit-element';

class TodoItemLit extends LitElement{
    static get properties() {
        return {
          checked: {
            type: Boolean,
            reflect: true
          },
          id: { type: String, reflect: true }
        };
    }
    constructor() {
        super();
        this.text = "";
        this.checked = false;
    }
    render(){
        return html`
            <li class="item">
               <input 
               type="checkbox"
               ?checked=${this.checked}
               @change=${() => this._fire("on-change")}
               />
               
            </li>
        `;
    }
    _fire(eventType) {
        this.dispatchEvent(new CustomEvent(eventType, { detail: this.id }));
    }
}


window.customElements.define('to-do-list-item', TodoItemLit);