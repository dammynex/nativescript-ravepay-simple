import { Common, PaymentOptions, PaymentResponse } from './ravepay-simple.common';
import * as app from 'tns-core-modules/application/application';

declare const com;

const RavePayManager = com.flutterwave.raveandroid.RavePayManager;
const RaveConstants = com.flutterwave.raveandroid.RaveConstants;
const RavePayActivity = com.flutterwave.raveandroid.RavePayActivity;

export class RavepaySimple extends Common implements PaymentOptions {

    private _config;

    constructor() {
        super();
        this._config = new RavePayManager(app.android.foregroundActivity);
    }

    get android() {
        return this._config;
    }

    pay(): Promise<PaymentResponse> {

        return new Promise((resolve, reject) => {
            this.init().then(() => {
                app.android.on(app.AndroidApplication.activityResultEvent, (args: app.AndroidActivityResultEventData) => {

                    app.android.off(app.AndroidApplication.activityResultEvent);

                    let requestCode = args.requestCode;
                    let resultCode = args.resultCode;
                    let data = args.intent;

                    if (requestCode != RaveConstants.RAVE_REQUEST_CODE) {
                        return;
                    }

                    let response = JSON.parse(data.getStringExtra('response'));

                    if (resultCode == RavePayActivity.RESULT_SUCCESS) {
                        return resolve(new PaymentResponse(RavepaySimple.PAYMENT_SUCCESS, response ? response.data : null));
                    }

                    if (resultCode == RavePayActivity.RESULT_ERROR) {
                        return resolve(new PaymentResponse(RavepaySimple.PAYMENT_ERROR, response ? response.data : null));
                    }

                    if (resultCode == RavePayActivity.RESULT_CANCELLED) {
                        return resolve(new PaymentResponse(RavepaySimple.PAYMENT_CANCELLED, response ? response.data : null));
                    }

                    reject(null);
                });

                let amount = Number(this.amount);

                this._config
                    .setAmount(amount)
                    .setCountry(this.country)
                    .setCurrency(this.currency)
                    .setEmail(this.email)
                    .setfName(this.firstName)
                    .setlName(this.lastName)
                    .setPublicKey(this.publicKey)
                    .setEncryptionKey(this.encryptionKey)
                    .onStagingEnv(this.isStaging)
                    .acceptCardPayments(true)
                    .setTxRef(this.transactionRef)
                    .showStagingLabel(false)
                    .allowSaveCardFeature(false)
                    .initialize();
            })
            .catch(reject);
        });
    }
}