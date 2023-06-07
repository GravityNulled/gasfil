/* eslint-disable @next/next/no-img-element */
import prisma from "@/utils/client";
import Image from "next/image";
import { GasProduct } from "@prisma/client";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { Oval } from "react-loader-spinner";

export default function ProductSection() {
  const { data: gases, isLoading } = useSWR<GasProduct[]>(
    `/api/product`,
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {gases?.map((gas) => (
            <a key={gas.id} href={`/products/${gas.id}`} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={gas.image}
                  alt={gas.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{gas.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {gas.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
