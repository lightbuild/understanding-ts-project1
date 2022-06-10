//Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validataInput: Validatable) {
  let isValid = true;
  if (validataInput.required) {
    isValid = isValid && validataInput.value.toString().trim().length !== 0;
  }
  if (validataInput.minLength != null && typeof validataInput.value === 'string') {
    isValid =
      isValid && validataInput.value.length > validataInput.minLength;
  }
  if (validataInput.maxLength != null && typeof validataInput.value === 'string') {
    isValid =
      isValid && validataInput.value.length < validataInput.maxLength;
  }
  if (validataInput.min != null && typeof validataInput.value === 'number') {
    isValid = isValid && validataInput.value > validataInput.min;
  }
  if (validataInput.max != null && typeof validataInput.value === 'number') {
    isValid = isValid && validataInput.value < validataInput.max;
  }
  return isValid;
}

//autobind decorator
function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalMethod.bind(this);
    }
  };
  return adjDescriptor;
}


//ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;
    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private clearInputs(): void {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private gatherUsersInput(): [string, string, number] | undefined {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 5
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };

    if (
      // enteredTitle.trim().length === 0 ||
      // enteredDescription.trim().length === 0 ||
      // enteredPeople.trim().length === 0
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input,please try again');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }


  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUsersInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
