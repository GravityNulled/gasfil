"use client";

import React from "react";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import fetcher from "@/utils/fetcher";
import { Order } from "@prisma/client";
import { Oval } from "react-loader-spinner";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

const AdminDashboard = () => {
  const { data: session } = useSession();
  const { data: orders, isLoading } = useSWR<Order[]>("/api/order", fetcher);
  if (session?.user?.email == "admin@gmail.com") {
    if (isLoading) {
      return (
        <section className="h-screen flex items-center gap-10 justify-center container mx-auto w-5/6">
          <p className="my-32 text-3xl font-bold uppercase">Loading</p>
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </section>
      );
    }
    return (
      <section className="container w-5/6 mx-auto mt-10">
        <h1 className="text-3xl text-center font-semibold">Welcome Admin</h1>
        <section>
          <h2>List of orders</h2>
        </section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Product ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  {format(new Date(order.order_date), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{order.total_amount}</TableCell>
                <TableCell className="text-right">{order.productId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    );
  } else {
    return (
      <section className="h-screen flex items-center gap-10 justify-center container mx-auto w-5/6">
        <p className="text-3xl font-bold uppercase">
          Login as Admin to view the page
        </p>
      </section>
    );
  }
};

export default AdminDashboard;
