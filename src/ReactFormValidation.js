export default class ReactFormValidation {
    static _createErrorMessage = (e, m, s) => e || `${m} is ${s}`

    static Required = (m, v, e) => (v && v.length > 0 ? true : ReactFormValidation._createErrorMessage(e, m, 'required'));

    static IsNumber = (m, v, e) => (v && !isNaN(v) ? true : ReactFormValidation._createErrorMessage(e, m, 'not a number'));

    static MinLength = (m, v, n, e) => (v && v.length >= n ? true : ReactFormValidation._createErrorMessage(e, m, `less than ${n}`));

    static MaxLength = (m, v, n, e) => (v && v.length <= n ? true : ReactFormValidation._createErrorMessage(e, m, `greater than ${n}`));

    static Min = (m, v, n, e) => (v && parseInt(v) >= n ? true : ReactFormValidation._createErrorMessage(e, m, `less than ${n}`));

    static Max = (m, v, n, e) => (v && parseInt(v) <= n ? true : ReactFormValidation._createErrorMessage(e, m, `greater than ${n}`));
}