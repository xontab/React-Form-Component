import React, { Component, PropTypes } from 'react';

export default class ReactForm extends Component {
    static propTypes = {
        styleError: PropTypes.object,
        classNameError: PropTypes.string,
        children: PropTypes.any,
        onValidationChange: PropTypes.func,
    }

    static defaultProps = {
        styleError: {
            border: '1px solid red',
            display: 'inline-block',
        },
    }

    static _createErrorMessage = (m, s) => `${m} is ${s}`

    static Required = (m, v) => (v && v.length > 0 ? true : ReactForm._createErrorMessage(m, 'required'));

    static IsNumber = (m, v) => (v && !isNaN(v) ? true : ReactForm._createErrorMessage(m, 'not a number'));

    static Max = (m, v, n) => (v && v <= n ? true : ReactForm._createErrorMessage(m, `greater than ${n}`));

    static Min = (m, v, n) => (v && v >= n ? true : ReactForm._createErrorMessage(m, `less than ${n}`));

    constructor(props) {
        super(props);

        this.state = {
            isValid: true,
            model: {},
            validation: {},
        };
    }

    componentWillMount(props = this.props, state = this.state) {
        this.tempState = { validation: {}, model: {} };
        this.children = React.Children.map(props.children, element => this._updateChild(element, state));
        this.tempState.validation = {
            ...state.validation,
            ...this.tempState.validation,
        };
        this.tempState.model = {
            ...state.model,
            ...this.tempState.model,
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
    1
    getModel = () => this.state.model;

    getValidations = () => this.state.validation;

    getFullError = (modelName, state = this.state) => {
        const { validation } = state;

        let result = '';
        if (validation && validation[modelName]) {
            validation[modelName].map((x, i) => {
                if (x !== true) {
                    result += `${i > 0 ? '\n' : ''}${x}`;
                }
                return x;
            });
        }

        return result;
    }

    isValid = () => this.state.isValid;

    _handleChange = (modelName, evt, validationFuncs, customOnChange) => {
        const { validation, model } = this.state;

        const value = evt.target.value;
        this.setState({
            model: {
                ...model,
                [modelName]: value,
            },
            validation: {
                ...validation,
                [modelName]: this._checkValidation(validationFuncs, modelName, value),
            },
        },
    this._updateValidation);

        if (customOnChange) {
            customOnChange(value, modelName, evt);
        }
    }

    _checkValidation(validationFuncs, modelName, value) {
        return validationFuncs && validationFuncs.map(v => v(modelName, value));
    }

    _updateValidation() {
        const { validation, isValid } = this.state;
        const newIsValid = Object.keys(validation).filter(x => validation[x] &&
      validation[x].filter(y => y !== true).length > 0).length === 0;

        if (newIsValid !== isValid) {
            this.setState({
                isValid: newIsValid,
            });
        }

        return newIsValid;
    }

    _updateChild(element, state) {
        const modelName = element.props['data-model'];
        if (modelName) {
            const validationFuncs = element.props['data-validation'];
            if (element.props.value !== undefined || !state.model[modelName]) {
                const value = element.props.defaultValue || element.props.value;
                this.tempState.model[modelName] = value;
                this.tempState.validation[modelName] = this._checkValidation(validationFuncs, modelName, value);
            }
            const newElement = React.cloneElement(element, {
                onChange: evt => this._handleChange(modelName, evt, validationFuncs, element.props.onChange),
            });

            return newElement;
        }
        return element;
    }

    _checkValidationForStyles(validation, errorStyle) {
        if (!validation || validation.filter(x => x !== true).length === 0) {
            return null;
        }

        return errorStyle;
    }

    _renderElement = (element, i) => {
        const { styleError, classNameError } = this.props;
        const { validation } = this.state;

        const modelName = element.props['data-model'];
        const errorFor = element.props['data-error-for'];

        if (modelName) {
            return (
        <span
          key={i}
          style={this._checkValidationForStyles(validation[modelName], styleError)}
          className={this._checkValidationForStyles(validation[modelName], classNameError)}
        >{element}</span>
            );
        } else if (errorFor) {
            return (
        React.cloneElement(element, null, this.getFullError(errorFor)
          .split('\n').map((x, i2) => <span key={i2}>{x}<br /></span>),
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
