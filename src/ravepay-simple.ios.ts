import { Common, PaymentOptions, PaymentResponse } from './ravepay-simple.common';
import { Frame } from '@nativescript/core';

declare const NSRave, NSRaveDelegate, NSObject;

export class RavepaySimple extends Common implements PaymentOptions {

    private _rave;

    constructor() {
        super();
        this._rave = NSRave.new();
    }

    get ios() {
        return this._rave;
    }

    pay(): Promise<PaymentResponse> {

        return new Promise((resolve, reject) => {
            this.init().then(() => {

                const Delegator = NSObject.extend({
                    onSuccess(ref, response) {
                        resolve(new PaymentResponse(RavepaySimple.PAYMENT_SUCCESS, response, ref));
                    },

                    onError(ref, response) {
                        reject(new PaymentResponse(RavepaySimple.PAYMENT_ERROR, response, ref));
                    }
                }, {
                    protocols: [NSRaveDelegate]
                });


                let rave = this._rave;
                rave.country = this.country;
                rave.currencyCode = this.currency;
                rave.email = this.email;
                rave.phoneNumber = this.phoneNumber;
                rave.firstName = this.firstName;
                rave.lastName = this.lastName;
                rave.transactionRef = this.transactionRef;
                rave.publicKey = this.publicKey;
                rave.encryptionKey = this.encryptionKey;
                rave.transcationRef = this.transactionRef;
                rave.isStaging = this.isStaging;
                rave.amount = this.amount;
                rave.delegate = Delegator.new();

                // @ts-ignore
                let view = <UIViewController>Frame.topmost().currentPage.ios;
                rave.initRaveWithView(view);
            })
            .catch(reject);
        });
    }
}
