/* eslint-disable @next/next/no-img-element */
"use client";

import fetcher from "@/utils/fetcher";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import useSWR from "swr";
import { GasProduct } from "@prisma/client";
import { useState } from "react";

const Products = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: gas, isLoading } = useSWR<GasProduct>(
    `/api/product/${params.id}`,
    fetcher
  );

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
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="image"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={gas?.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 uppercase">
              {gas?.name}
            </h1>
            <p className="leading-relaxed">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>
            <p className="text-base mt-2">{gas?.quantity_available} remainig</p>
            <div className="flex mt-3">
              <span className="title-font font-medium text-2xl text-gray-900">
                Ksh {gas?.price}
              </span>
              <button
                disabled={gas?.quantity_available == 0 ? true : false}
                onClick={() => router.push(`/checkout/${gas?.id}`)}
                className="flex ml-auto text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none rounded"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
