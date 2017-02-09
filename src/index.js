import React, { Component, PropTypes } from 'react';

export default class ReactForm extends Component {
    static propTypes = {
        styleError: PropTypes.object,
        classNameError: PropTypes.string,
        children: PropTypes.any,
        onValidationChange: PropTypes.func,
    }

    static defaultProps = {
        styleError: {},
        classNameError: '',
    }

    constructor(props) {
        super(props);

        this.state = {
            isValid: true,
            model: {},
            validations: {},
        };
    }

    componentWillMount(props = this.props, state = this.state) {
        this.tempState = { model: {}, validations: {} };
        this.children = React.Children.map(props.children, element => this._updateChild(element, state));
        this.tempState.model = {
            ...state.model,
            ...this.tempState.model,
        };
        this.tempState.validations = {
            ...state.validations,
            ...this.tempState.validations,
        };
        this.setState(this.tempState, this._updateValidation);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.children !== nextProps.children) {
            this.componentWillMount(nextProps, nextState);
        }
        if (nextProps.onValidationChange && this.state.isValid !== nextState.isValid) {
            nextProps.onValidationChange(nextState.isValid);
        }
    }

    getModel = () => this.state.model;

    getValidations = () => this.state.validations;

    getFullError = (modelName, state = this.state) => {
        const { validations } = state;

        let result = '';
        if (validations && validations[modelName]) {
            validations[modelName].map((x, i) => {
                if (x !== true) {
                    result += `${i > 0 ? '\n' : ''}${x}`;
                }
                return x;
            });
        }

        return result;
    }

    _getFirstValue(values, defaultValue) {
        const value = values.find(x => x !== undefined && x !== null);
        if (value !== undefined) {
            return value;
        }

        return defaultValue;
    }

    _getValue(state, props, modelName, checked, value = props.value, defaultChecked) {
        const stateModel = this.state.model[modelName] || {};
        if (props.type === 'checkbox') {
            return {
                ...state || {},
                [props.value]: this._getFirstValue([props.checked, stateModel[props.value], defaultChecked], false),
            };
        }

        return value;
    }

    isValid = () => this.state.isValid;

    _handleChange = (modelName, evt, validationFuncs, customOnChange) => {
        const { model, validations } = this.state;
        const value = this._getValue(model[modelName], evt.target, modelName);
        this.setState({
            model: {
                ...model,
                [modelName]: value,
            },
            validations: {
                ...validations,
                [modelName]: this._checkValidation(validationFuncs, modelName, value),
            },
        }, this._updateValidation);

        if (customOnChange) {
            customOnChange(evt, modelName);
        }
    }

    _checkValidation(validationFuncs, modelName, value) {
        return validationFuncs && validationFuncs.map(v => v(modelName, value));
    }

    _updateValidation() {
        const { validations, isValid } = this.state;
        const newIsValid = Object.keys(validations).filter(x => validations[x] &&
        validations[x].filter(y => y !== true).length > 0).length === 0;

        if (newIsValid !== isValid) {
            this.setState({
                isValid: newIsValid,
            });
        }

        return newIsValid;
    }

    _updateChild(element, state) {
        if (!element.props) {
            return element;
        }

        const modelName = element.props['data-model'];
        if (modelName) {
            const validationFuncs = element.props['data-validations'];
            if (element.props.value !== undefined || !state.model[modelName]) {
                const value = element.props.defaultValue || element.props.value;
                this.tempState.model[modelName] = this._getValue(this.tempState.model[modelName], element.props, modelName, value, element.props['data-checked']);
                this.tempState.validations[modelName] = this._checkValidation(validationFuncs, modelName, value);
            }
            const newElement = React.cloneElement(element, {
                onChange: evt => this._handleChange(modelName, evt, validationFuncs, element.props.onChange),
            });

            return newElement;
        }

        if (element.props.children) {
            const newElement = React.cloneElement(element, {},
                React.Children.map(element.props.children, (childElement) => this._updateChild(childElement, state))
            );

            return newElement;
        }

        return element;
    }

    _checkValidationForStyles(validations, errorStyle) {
        if (!validations || validations.filter(x => x !== true).length === 0) {
            return null;
        }

        return errorStyle;
    }

    _renderElement = (element, i) => {      
        if (!element.props) {
            return element;
        }

        const { styleError, classNameError } = this.props;
        const { validations } = this.state;

        const modelName = element.props['data-model'];
        const errorFor = element.props['data-error-for'];

        if (modelName) {
            return (
                <span
                    key={i}
                    style={this._checkValidationForStyles(validations[modelName], styleError)}
                    className={this._checkValidationForStyles(validations[modelName], classNameError)}
                >{element}</span>
            );
        } else if (errorFor) {
            return (
                React.cloneElement(element, null, this.getFullError(errorFor)
                    .split('\n').map((x, i2) => <span key={i2}>{x}<br /></span>),
                )
            );
        }

        if (element.props.children) {
            return (
                React.cloneElement(element, null, 
                    element.props.children.map((x, i2) => this._renderElement(x, i2))
                )
            );
        }

        return element;
    }

    render() {
        return (
            <span>{this.children.map(this._renderElement)}</span>
        );
    }
}
