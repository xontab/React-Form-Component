# React Forms Component
Form Component including validation for React

**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Credits](#credits)

## Installation
To install just run the following command:

    > npm install react-forms-component

## Usage

### Import Library
```js
import ReactForm from 'react-forms-component';
import ReactFormValidations from 'react-forms-component/validations';
```

### Basic Component Usage
```js
<ReactForm></ReactForm>
```

### Optional Props

| Paramater | Type | Remark |
| --- | --- | --- |
| `classNameError` | string |  Will apply the className when an input field is not valid  |
| `styleError` | object | Will apply these inline styles when an input field is not valid  |
| `onValidationChange` | func | Will be fired when the overall form validation status changes  |

### Validations

### List of build in Validations

| Validation | Parameters |
| --- | --- |
| `Required` | No extra parameters |
| `IsNumber` | No extra parameters |
| `MinLength` | Length size: Number |
| `MaxLength` | Length size: Number |
| `Min` | Length size: Number |
| `Max` | Length size: Number |

### Sample

To following example is using 2 of the above built-in validation functions:

```js
<input 
    type="text" 
    data-model="username" 
    data-validations={
        [
            ReactFormValidations.Required, 
            (m, v) => ReactFormValidations.MinLength(m, v, 5)
        ]
    } />
```

### Custom Validations

If the above built-in validations are not enough for your application, you can create your own Validation functions.  Below is an example of a custom validation:

```js
static Max = (modelName, value, no, customError) => (value && parseInt(value) <= no ? true : ReactFormValidations._createErrorMessage(customError, modelName, `greater than ${no}`));

```

#### Display Errors

To display the error message inline you can need to use `data-error-for` attribute/prop:

```js
<div className="error-label" data-error-for="username"></div>
```

## Example

The following is an example of how to use this library in your application:

### Sample JSX
```js
<ReactForm
    classNameError="error"
    onValidationChange={this.handleValidationChange}
    ref={(form) => {
        this.form = form; 
    }}
>
    <div className="form-control">
        <div className="error-label" data-error-for="username"></div>
        <label>Username:</label>
        <input 
            type="text" 
            data-model="username" 
            data-validations={
                [
                    ReactFormValidations.Required, 
                    (m, v) => ReactFormValidations.MinLength(m, v, 5)
                ]
            } />
    </div>
    ...
</ReactForm>
<div className="form-control">
    <label></label>
    <button disabled={!isValid} onClick={this._handleClick}>Populate Model</button>
</div>
```

### Sample Event Handler
```js
handleValidationChange = (isValid) => {
    this.setState({
        isValid,
    });
}

_handleClick = () => {
    console.log(this.form.getModel());
}
```

## Example

Clone this project and run the following commands to run the demo:

```js
cd examples
npm install
npm start
```
then open http://localhost:4001 in a web browser

## Credits

React: http://facebook.github.io/react/
Babel: http://babeljs.io/
Webpack: https://webpack.github.io/docs/
