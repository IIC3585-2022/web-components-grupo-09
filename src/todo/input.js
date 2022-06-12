const templateTodoInput = document.createElement('template');
templateTodoInput.innerHTML = `
    <form id="todo-form">
        <input
            id="todo-input"
            type="text"
            placeholder="Agregar a la lista"
        >
    </form>
`

class TodoInput extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({ 'mode': 'open' });
        this.appendChild(templateTodoInput.content.cloneNode(true));
        this.formElement = this.querySelector('#todo-form');
        this.inputElement = this.querySelector('#todo-input');
        this.formElement.addEventListener(
            'submit',
            this.submitHandler.bind(this)
        );
    };

    submitHandler(e){
        e.preventDefault();
        if (this.inputElement.value){
            this.dispatchEvent(new CustomEvent(
                'onSubmit',
                { detail: this.inputElement.value }
            ));
            this.inputElement.value = '';
        };
    };
};

window.customElements.define('todo-input', TodoInput);
