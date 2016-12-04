export default class ReactFormValidations {
    static _createErrorMessage = (e, m, s) => e || `${m} is ${s}`

    static Required = (m, v, e) => (v && v.length > 0 ? true : ReactFormValidations._createErrorMessage(e, m, 'required'));

    static IsNumber = (m, v, e) => (v && !isNaN(v) ? true : ReactFormValidations._createErrorMessage(e, m, 'not a number'));

    static MinLength = (m, v, n, e) => (v && v.length >= n ? true : ReactFormValidations._createErrorMessage(e, m, `less than ${n} characters`));

    static MaxLength = (m, v, n, e) => (v && v.length <= n ? true : ReactFormValidations._createErrorMessage(e, m, `greater than ${n} characters`));

    static Min = (m, v, n, e) => (v && parseInt(v) >= n ? true : ReactFormValidations._createErrorMessage(e, m, `less than ${n}`));

    static Max = (m, v, n, e) => (v && parseInt(v) <= n ? true : ReactFormValidations._createErrorMessage(e, m, `greater than ${n}`));
}