import snap from "./init";

export async function createTransaction(params: any, callback: Function) {
  snap
    .createTransaction(params)
    .then((transaction: { token: string; redirect_url: string }) => {
      callback(transaction);
    });
}
