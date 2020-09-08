import { Common, PaymentOptions, PaymentResponse } from './ravepay-simple.common';
import { Frame } from '@nativescript/core';

declare const NSRaveConfig, NSObject, NSRaveDelegate;

export class RavepaySimple extends Common implements PaymentOptions {

    private _config;

    constructor() {
        super();
        this._config = NSRaveConfig.new();
    }

    get ios() {
        return this._config;
    }

    pay(): Promise<PaymentResponse> {

        return new Promise((resolve, reject) => {
            this.init().then(() => {
                let config = this._config;
                config.country = this.country;
                config.currencyCode = this.currency;
                config.email = this.email;
                config.phoneNumber = this.phoneNumber;
                config.firstName = this.firstName;
                config.lastName = this.lastName;
                config.transactionRef = this.transactionRef;
                config.publicKey = this.publicKey;
                config.encryptionKey = this.encryptionKey;
                config.transcationRef = this.transactionRef;
                config.isStaging = this.isStaging;
                config.amount = this.amount;


                let Delegator = NSObject.extend({
                    onSuccess(ref, response) {
                        let data = response ? JSON.parse(response) : null;
                        resolve(new PaymentResponse(RavepaySimple.PAYMENT_SUCCESS, data ? data.tx : null));
                    },
                    onError(ref, response) {
                        let data = response ? JSON.parse(response) : null;
                        resolve(new PaymentResponse(RavepaySimple.PAYMENT_ERROR, data ? data.tx : null));
                    }
                }, {
                    protocols: [NSRaveDelegate]
                });

                // @ts-ignore
                let delegate = Delegator.new();
                let view = Frame.topmost().currentPage.ios;

                config.delegate = delegate;
                config.initRaveWithView(view);
            })
            .catch(reject);
        });
    }
}
