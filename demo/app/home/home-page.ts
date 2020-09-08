import { RavepaySimple } from 'nativescript-ravepay-simple';

/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { NavigatedData, Page } from "@nativescript/core";
import { HomeViewModel } from "./home-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;

    page.bindingContext = new HomeViewModel();
}

export function onTap() {
    let rave = new RavepaySimple()
    rave.amount = "10"
    rave.email = "damilolaofficial@gmail.com"
    rave.encryptionKey = "FLWSECK_TESTa274f8991495"
    rave.publicKey = "FLWPUBK_TEST-f4080f378297f4c5481bcdeb7c406ff2-X"
    rave.firstName = "Dammy"
    rave.lastName = "Nex"
    rave.phoneNumber = "09061668519"
    rave.isStaging = false
    rave.transactionRef = "lfneioefjoief"

    rave.pay()
        .then((res) => {
            let {status, data} = res

            switch(status) {
                case RavepaySimple.PAYMENT_SUCCESS:
                    let reference = data.txRef
                    console.log(reference);
                    break;

                case RavepaySimple.PAYMENT_ERROR:
                    console.log('Payment Error');
                    break;

                case RavepaySimple.PAYMENT_CANCELLED:
                    setTimeout(() => alert('Payment cancelled'), 1000);
                    break;
            }
        })
        .catch(err => {
            console.log(err)
        })
}
