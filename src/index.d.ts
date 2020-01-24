import { Common, PaymentOptions, PaymentResponse } from './ravepay-simple.common';

export declare class PaymentResponse {
  status: String;
  data: any; 

  constructor(status: String, ref: String, data: any);
}

export declare class RavepaySimple extends Common {

  static PAYMENT_SUCCESS: String;
  static PAYMENT_ERROR: String;
  static PAYMENT_CANCELLED: String;

  amount: String;

  country: String;

  currency: String;

  email: String;

  phoneNumber: String;

  firstName: String;

  lastName: String;

  encryptionKey: String;

  publicKey: String;

  isStaging: Boolean;

  transactionRef: String;

  get android();

  get ios();

  pay(): Promise<PaymentResponse>;
}
