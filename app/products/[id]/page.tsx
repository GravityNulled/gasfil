/* eslint-disable @next/next/no-img-element */

import prisma from "@/utils/client";

const Products = async ({ params }: { params: { id: string } }) => {
  const gas = await prisma.gasProduct.findUnique({
    where: {
      id: params.id,
    },
  });
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
              <button className="flex ml-auto text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none rounded">
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
