import { Common, PaymentOptions, PaymentResponse } from './ravepay-simple.common';
import
{
    AndroidApplication,
    AndroidActivityResultEventData,
    Application
} from '@nativescript/core';

declare const com;

const RaveUiManager = com.flutterwave.raveandroid.RaveUiManager;
const RaveConstants = com.flutterwave.raveandroid.rave_java_commons.RaveConstants;
const RavePayActivity = com.flutterwave.raveandroid.RavePayActivity;

export class RavepaySimple extends Common implements PaymentOptions
{

    private _config;

    constructor()
    {
        super();
        this._config = new RaveUiManager(Application.android.foregroundActivity);
    }

    get android()
    {
        return this._config;
    }

    pay(): Promise<PaymentResponse>
    {

        return new Promise((resolve, reject) =>
        {
            this.init().then(() =>
            {
                Application.android.on(AndroidApplication.activityResultEvent, (args: AndroidActivityResultEventData) =>
                {

                    Application.android.off(AndroidApplication.activityResultEvent);

                    let requestCode = args.requestCode;
                    let resultCode = args.resultCode;
                    let data = args.intent;

                    if (requestCode != RaveConstants.RAVE_REQUEST_CODE)
                    {
                        return;
                    }

                    let response = JSON.parse(data.getStringExtra('response'));
                    let resdata = response ? response.data : null;

                    if (resultCode == RavePayActivity.RESULT_SUCCESS)
                    {
                        return resolve(new PaymentResponse(RavepaySimple.PAYMENT_SUCCESS, resdata));
                    }

                    if (resultCode == RavePayActivity.RESULT_ERROR)
                    {
                        return resolve(new PaymentResponse(RavepaySimple.PAYMENT_ERROR, resdata));
                    }

                    if (resultCode == RavePayActivity.RESULT_CANCELLED)
                    {
                        return resolve(new PaymentResponse(RavepaySimple.PAYMENT_CANCELLED, resdata));
                    }

                    reject(null);
                });

                let amount = Number(this.amount);

                this._config
                    .setAmount(amount)
                    //.setCountry(this.country)
                    .setCurrency(this.currency)
                    .setEmail(this.email)
                    .setfName(this.firstName)
                    .setlName(this.lastName)
                    .setPublicKey(this.publicKey)
                    .setEncryptionKey(this.encryptionKey)
                    .onStagingEnv(this.isStaging)
                    .setTxRef(this.transactionRef)
                    .acceptAccountPayments(this.acceptAccountPayments)
                    .acceptCardPayments(this.acceptCardPayments)
                    .acceptMpesaPayments(this.acceptMpesaPayments)
                    .acceptGHMobileMoneyPayments(this.acceptGHMobileMoneyPayments)
                    .acceptUgMobileMoneyPayments(this.acceptUgMobileMoneyPayments)
                    .acceptZmMobileMoneyPayments(this.acceptRwfMobileMoneyPayments)
                    .acceptRwfMobileMoneyPayments(this.acceptRwfMobileMoneyPayments)
                    .acceptSaBankPayments(this.acceptSaBankPayments)
                    .acceptUkPayments(this.acceptUkPayments)
                    .acceptBankTransferPayments(this.acceptBankTransferPayments)
                    .acceptUssdPayments(this.acceptUssdPayments)
                    .acceptBarterPayments(this.acceptBarterPayments)
                    .acceptFrancMobileMoneyPayments(this.acceptFrancMobileMoneyPayments)
                    .allowSaveCardFeature(this.allowSaveCardFeature)
                    .withTheme(this.theme)
                    .isPreAuth(this.isPreAuth)
                    .shouldDisplayFee(this.shouldDisplayFee)
                    .showStagingLabel(this.showStagingLabel)
                    .allowSaveCardFeature(this.allowSaveCardFeature)
                    .initialize();
            })
                .catch(reject);
        });
    }
}