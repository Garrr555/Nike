// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updateData } from "@/lib/firebase/service";
import { createTransaction } from "@/lib/midtrans/transaction";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt, { verify } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET'){
          const token : any = req.headers.authorization?.split(' ')[1];
          console.log(token)
      }
  else if (req.method === "POST") {
    const token: any = req.headers.authorization?.split(' ')[1] || '';
    console.log(token);

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        const payload = req.body;
        console.log(payload);
        console.log(payload.user.fullname);
        console.log(payload.user.email);
        console.log(payload.user.address.phone);

        console.log("JWT Error:", err);
        console.log("Decoded Token:", decoded);

        delete payload.user.address.isMain;

        const generatedOrderId = `${Date.now()}-${Math.random().toString(16)}`;
        console.log(generatedOrderId);

        const params = {
          transaction_details: {
            order_id: generatedOrderId,
            gross_amount: payload.transaction.total,
          },
          customer_details: {
            first_name: payload.user.fullname,
            email: payload.user.email,
            phone: payload.user.address.phone,
          },
        };
        createTransaction(
          params,
          async (transaction: { token: string; redirect_url: string }) => {
            const data = {
              transaction: {
                ...payload.transaction,
                address: payload.user.address,
                token: transaction.token,
                redirect_url: transaction.redirect_url,
                status: "pending",
              },
              carts: [],
            };
            await updateData("users", decoded.id, data, (result: boolean) => {
              if (result) {
                res.status(200).json({
                  status: true,
                  statusCode: 200,
                  message: "success",
                  data: {
                    token: transaction.token,
                    redirect_url: transaction.redirect_url,
                  },
                } as any);
              } else {
                res.status(400).json({
                  status: false,
                  statusCode: 400,
                  message: "failed",
                });
              }
            });
          }
        );
      }
    );
  }
}
