"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const tp = require("typed-promisify");
const _ = require("lodash");
/** Provide an accordion component */
let PaymentComponent = class PaymentComponent {
    /** Constructs this component */
    constructor() {
        /** An event emitted after a payment is/not successfully made */
        this.submit = new core_1.EventEmitter();
    }
    /** Initialize the component */
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clientInstance = yield this.generateClientInstance(this.braintreeToken);
            if (this.braintreeToken) {
                this.initCreditCardPayment();
                this.initPaypalPayment();
            }
        });
    }
    /** Sets up braintree hosted fields for the credit card payment method */
    initCreditCardPayment() {
        return __awaiter(this, void 0, void 0, function* () {
            this.hostedFieldsInstance = yield this.generateHostedFields(this.clientInstance);
            this.hostedFieldsInstance.tokenizeAsync = tp.promisify(this.hostedFieldsInstance.tokenize, this.hostedFieldsInstance);
        });
    }
    /** Sets up paypal hosted button */
    initPaypalPayment() {
        return __awaiter(this, void 0, void 0, function* () {
            // Promisified functions
            const renderPaypalButton = tp.promisify(paypal.Button.render, paypal.Button);
            const createPaypalInstance = tp.promisify(braintree.paypalCheckout.create, braintree.paypalCheckout);
            const client = this.clientInstance;
            const paypalInstance = yield createPaypalInstance({ client });
            // Creates a payment
            const flow = 'checkout';
            const currency = 'AUD';
            const intent = 'sale';
            const amount = this.amount.toFixed(2);
            const payment = () => paypalInstance.createPayment({ flow, currency, intent, amount });
            // Calls after a payment is authorized via paypal
            const onAuthorize = (data) => __awaiter(this, void 0, void 0, function* () {
                const payload = yield paypalInstance.tokenizePayment(data);
                this.submit.emit(payload);
                return payload;
            });
            // Handles payment cancellation or error
            const onCancel = () => __awaiter(this, void 0, void 0, function* () { return this.submit.emit(null); });
            const onError = () => __awaiter(this, void 0, void 0, function* () { return this.submit.emit(null); });
            // The braintree server environment for processing the payment
            const env = 'sandbox'; // 'production'
            // Creates the paypal button and pass in the callback functions
            renderPaypalButton({ env, onAuthorize, onCancel, onError, payment }, '#paypalButton');
        });
    }
    /** Submits the payment and returns the payment state */
    submitPayment() {
        return __awaiter(this, void 0, void 0, function* () {
            this.displayTermsError = !this.termsAgreed;
            if (this.displayTermsError)
                return;
            /** Emits the payload if successful else emits null */
            try {
                const payload = yield this.hostedFieldsInstance.tokenizeAsync(this.hostedFieldsInstance);
                this.submit.emit(payload);
            }
            catch (err) {
                this.handleCreditCardError(err);
                this.submit.emit(null);
            }
        });
    }
    /**
     * Check every payment input field to make sure that
     * @param error: err object retrieved from failed tokenziation
     */
    handleCreditCardError(error) {
        switch (error.code) {
            case 'HOSTED_FIELDS_FIELDS_EMPTY':
                this.errorMessage = 'All fields are empty! Please fill out the form.';
                break;
            case 'HOSTED_FIELDS_FIELDS_INVALID':
                let invalidFieldKeys = error.details.invalidFieldKeys;
                invalidFieldKeys = invalidFieldKeys.map(key => _.lowerCase(key));
                this.errorMessage = 'The following fields are invalid: ';
                this.errorMessage += invalidFieldKeys.join(', ');
                break;
            case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
                this.errorMessage = 'The transaction was not completed. Please enter a valid card.';
                break;
            default:
                this.errorMessage = 'There was an error processing the payment: ' + error;
        }
    }
    /**
     * Generate an instance of a client so it could be used to create secure
     * input fields using Braintree SDK (iFrame)
     * @param clientToken
     * @return clientInstance  to generate hosted fields
     */
    generateClientInstance(clientToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const createBraintreeClient = tp.promisify(braintree.client.create, braintree.client);
            return createBraintreeClient({ authorization: clientToken });
        });
    }
    /**
     * Generate the UI fields for entering the credit card detail
     * @param clientInstance  generated using client token retrieved from the server
     * @return hostedFieldsInstance  for handling and form teardown
     */
    generateHostedFields(clientInstance) {
        return __awaiter(this, void 0, void 0, function* () {
            const createHostedFields = tp.promisify(braintree.hostedFields.create, braintree.hostedFields);
            return createHostedFields({
                client: clientInstance,
                styles: {
                    /* tslint:disable-next-line */
                    'input': {
                        'font-size': '0.857rem',
                        'line-height': '1.25',
                    }
                },
                fields: {
                    number: { selector: '#cardNumber', placeholder: '4111 1111 1111 1111' },
                    cvv: { selector: '#ccvNumber', placeholder: '123' },
                    expirationDate: { selector: '#expirationDate', placeholder: 'MM/YYYY' }
                }
            });
        });
    }
};
__decorate([
    core_1.ViewChild('submitButton')
], PaymentComponent.prototype, "submitButton", void 0);
__decorate([
    core_1.Input()
], PaymentComponent.prototype, "amount", void 0);
__decorate([
    core_1.Input()
], PaymentComponent.prototype, "buttonText", void 0);
__decorate([
    core_1.Input()
], PaymentComponent.prototype, "braintreeToken", void 0);
__decorate([
    core_1.Output()
], PaymentComponent.prototype, "submit", void 0);
PaymentComponent = __decorate([
    core_1.Component({
        selector: 'app-payment',
        templateUrl: 'payment.html',
        styleUrls: ['payment.scss'],
    })
], PaymentComponent);
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=payment.js.map