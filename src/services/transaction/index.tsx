import instance from "@/lib/axios/instance";

const transactionServices = {
  generatedTransaction: (data: any, token: string) =>
    instance.post("/api/transaction", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
export default transactionServices;
