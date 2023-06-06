"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

import "swiper/css";
import ProductSection from "@/components/productsSection";

export default function Home() {
  return (
    <main className="container w-full mx-auto md:w-5/6">
      <section className="mt-32">
        <h1 className="text-4xl font-bold text-center mt-2">
          Best Gas refill station in Kenya
        </h1>
        <Swiper
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={true}
          modules={[Navigation, Autoplay]}
        >
          <SwiperSlide>
            <div className="flex items-center gap-10">
              <Image
                src="/images/afrigas.png"
                alt="afrigas"
                width="300"
                height="300"
                className="rounded-lg"
              />
              <div className="flex flex-col gap-2">
                <p className="text-3xl ml-4">Afrigas</p>
                <p className="text-base ml-4">13KG gas</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center gap-10">
              <Image
                src="/images/kgas.png"
                alt="kgas"
                width="300"
                height="300"
                className="rounded-lg"
              />
              <div className="flex flex-col gap-2">
                <p className="text-3xl ml-4">K-gas</p>
                <p className="text-base ml-4">13KG gas</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="mt-32">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center uppercase mb-5">
          Products
        </h2>

        <ProductSection />
      </section>
    </main>
  );
}
