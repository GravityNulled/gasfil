"use client";

import fetcher from "@/utils/fetcher";
import { Order, GasProduct } from "@prisma/client";
import axios from "axios";
import React from "react";
import useSWR from "swr";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Success = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [gas, setGas] = useState<GasProduct>();
  const { data: order, isLoading } = useSWR<Order>(
    `/api/order/${params.id}`,
    fetcher
  );
  if (!isLoading) {
    const getGas = async () => {
      const gas = await axios.get<GasProduct>(
        `/api/product/${order?.productId}`
      );
      setGas(gas.data);
    };
    getGas();
  }
  if (!session) {
    router.push("/login");
  }
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-16">
        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
          Gasfil Order
        </h1>
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700">
            <div>
              Date:
              {order?.order_date
                ? format(new Date(order.order_date), "dd/MM/yyyy")
                : ""}
            </div>
            <div>Order ID #: {order?.id.substring(0, 8)}</div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">{session?.user?.name}</div>
          <div className="text-gray-700">{session?.user?.email}</div>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">Description</th>
              <th className="text-right font-bold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left text-gray-700">{gas?.name}</td>
              <td className="text-right text-gray-700">Ksh {gas?.price}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="text-left font-bold text-gray-700">Total</td>
              <td className="text-right font-bold text-gray-700">
                Ksh {gas?.price}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="text-gray-700 mb-2">Thank you for your business!</div>
        <div className="text-gray-700">We are on our way!</div>
      </div>
    </div>
  );
};

export default Success;
