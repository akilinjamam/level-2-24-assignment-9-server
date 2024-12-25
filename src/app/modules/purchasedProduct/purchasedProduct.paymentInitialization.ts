import axios from "axios";
export const paymentInitialization = async (data: any) => {
  try {
    const url = "https://sandbox.aamarpay.com/jsonpost.php";
    const result = await axios.post(url, {
      store_id: "aamarpaytest",
      tran_id: data.tran_id,
      success_url: `https://level-2-24-assignment-9-server.vercel.app/api/purchaseProducts/success-payment?productId=${data?.productId}&purchasedProductId=${data?.purchasedProductId}`,
      fail_url: `https://level-2-24-assignment-6-server.vercel.app/api/payment/failed-payment`,
      cancel_url: `https://level-2-24-assignment-6-server.vercel.app/api/payment/failed-payment`,
      amount: data?.amount,
      currency: "BDT",
      signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
      desc: "Merchant Registration Payment",
      cus_name: data.cus_name,
      cus_email: data.cus_email,
      cus_add1: data.cus_add1,
      cus_add2: "Mohakhali DOHS",
      cus_city: data.cus_city,
      cus_state: data.cus_state,
      cus_postcode: "1206",
      cus_country: data.cus_country,
      cus_phone: data.cus_phone,
      type: "json",
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
