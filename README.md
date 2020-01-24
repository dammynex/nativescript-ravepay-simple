# nativescript-ravepay-simple

Receive payments using Flutterwave's RavePay

## Requirements

iOS >= 11.0 -> [RaveSDK-iOS](https://github.com/dammynex/RaveSDK-iOS)

Android -> [rave-android](https://github.com/Flutterwave/rave-android)

## Installation

```javascript
tns plugin add nativescript-ravepay-simple
```

## Usage 
	
```javascript
    import { RavepaySimple } from 'nativescript-ravepay-simple'

    let rave = new RavePaySimple()
    rave.amount = "250"
    rave.email = "[Email]"
    rave.encryptionKey = "[Encryption Key]"
    rave.publicKey = "[Public Key]"
    rave.firstName = "Salawu"
    rave.lastName = "Oluwadamilola"
    rave.phoneNumber = "[Phone]"
    rave.isStaging = true
    rave.transactionRef = "lfneioefjoief"

    rave.pay()
        .then((res) => {
            let {status, data} = res

            switch(status) {
                case RavepaySimple.PAYMENT_SUCCESS:

                    //Successful payment

                    /* It is recommended you confirm transaction
                     before giving value */
                
                    let reference = data.txRef
                    console.log(reference);
                    break;

                case RavepaySimple.PAYMENT_ERROR:
                    //Payment failed
                    console.log('Payment Error');
                    break;

                case RavepaySimple.PAYMENT_CANCELLED:
                    //User cancelled payment
                    setTimeout(() => alert('Payment cancelled'), 1000);
                    break;
            }
        })
        .catch(err => {
            //Something totally went wrong
            console.log(err)
        })
```

## API

Describe your plugin methods and properties here. See [nativescript-feedback](https://github.com/EddyVerbruggen/nativescript-feedback) for example.
    
| Property | Description | Default | Required |
| --- | --- | -- | --- |
| country | Country to charge from | NG | Yes |
| currencyCode | Currency to charge from | NGN | Yes |
| isStaging | Set staging mode to demo or live | true | Yes |
| amount | Amount to charge | null | Yes |
| email | Customer's email address | null | Yes |
| phoneNumber | Customer's valid phone number | null | Yes |
| firstName | Customer's first name | null | Yes |
| lastName | Customer's last name | null | Yes |
| encryptionKey | Your RavePay encryption key | null | Yes |
| publicKey | Your RavePay public key | null | Yes |
| transactionRef | Payment transaction reference | null | Yes |
    
## License

Apache License Version 2.0, January 2004
