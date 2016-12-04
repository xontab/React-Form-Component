import React, { Component } from 'react';

import ReactForm from '../../src';
import ReactFormValidations from '../../src/ReactFormValidation';

import styles from './styles.css';

export default class Samples extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isValid: false,
        };
    }

    handleValidationChange = (isValid) => {
        this.setState({
            isValid,
        });
    }

    _handleClick = () => {
        this.setState({
            model: this.form.getModel(),
        })
        console.log(this.form.getModel());
    }

    render() {
        const { isValid, model } = this.state;

        return (
            <div>
                { 
                    model && 
                    <div>
                        <b>Result:</b> User {model.username} ({model.name} {model.surname || 'unknown'}), age {model.age || 'unknown'}
                    </div>
                }
                <ReactForm
                    ref={(form) => {
                        this.form = form; 
                    }}
                    classNameError="error"
                    onValidationChange={this.handleValidationChange}
                >
                    <div className="form-control">
                        <div className="error-label" data-error-for="username"></div>
                        <label>Username:</label>
                        <input type="text" data-model="username" data-validations={[ReactFormValidations.Required, (m, v) => ReactFormValidations.MinLength(m, v, 5)]} />
                    </div>
                    <div className="form-control">
                        <div className="error-label" data-error-for="name"></div>
                        <label>Name:</label>
                        <input type="text" data-model="name" data-validations={[ReactFormValidations.Required]} />
                    </div>
                    <div className="form-control">
                        <div className="error-label" data-error-for="surname"></div>
                        <label>Surname:</label>
                        <input type="text" data-model="surname" />
                    </div>
                    <div className="form-control">
                        <div className="error-label" data-error-for="age"></div>
                        <label>Age:</label>
                        <input type="number" data-model="age" data-validations={[(m, v) => ReactFormValidations.Min(m, v, 18, 'You must be at least 18 years old')]} />
                    </div>
                </ReactForm>
                <div className="form-control">
                    <label></label>
                    <button disabled={!isValid} onClick={this._handleClick}>Populate Model</button>
                </div>
            </div>
        );
    }
}
