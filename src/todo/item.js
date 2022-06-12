const templateTodoItem = document.createElement('template');
templateTodoItem.innerHTML = `
    <li class="item">
        <input type="checkbox">
        <label></label>
        <button class="delete">Borrar</button>
    </li>
`;

class TodoItem extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({ 'mode': 'open' });
        this.checkedValue = false;
        this.textValue = false;
    };

    connectedCallback() {
        // It's called when is mounted on html
        this.appendChild(templateTodoItem.content.cloneNode(true));
        this.itemElement  = this.querySelector('.item');
        this.removeButton = this.querySelector('.delete');
        this.textLabel = this.querySelector('label');
        this.checkboxElement = this.querySelector('input');
        this.removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
        });
        this.checkboxElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
        });
        this._render();
    }

    static get observedAttributes() {
        return ['text'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.textValue = newValue;
    }

    set index(value) {
        this.indexValue = value;
    }

    get index() {
        return this.indexValue;
    }

    set checked(value) {
        this.checkedValue = Boolean(value);
    }

    get checked() {
        return this.hasAttribute('checked');
    }

    _render() {
        if (!this.itemElement) return;
        this.textLabel.textContent = this.textValue;
        if (this.checkedValue) {
            this.itemElement.classList.add('completed');
            this.checkboxElement.setAttribute('checked', '');
        } else {
            this.itemElement.classList.remove('completed');
            this.checkboxElement.removeAttribute('checked');
        }
    }

};

window.customElements.define('todo-item', TodoItem);
