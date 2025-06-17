import Layout from "@/components/layout";
import Footer from "@/components/footer";
import Container from "@/components/container";
import { fade } from "@/helpers/transitions";
import {
  getProductSlugs,
  getProduct,
  getAllProductsRelated,
} from "@/helpers/shopify";
import { AnimatePresence, LazyMotion, domMax, m } from "framer-motion";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";
import SanityPageService from "@/services/sanityPageService";
// import { useAddToCartContext, useCartContext } from '@/context/store'
import { CartOpenContext } from "@/context/cart";
import EyesIcon from "@/icons/eyes.svg";
import Polaroid from "@/components/polaroid";
import MetaText from "@/components/meta-text";
import Link from "next/link";
import Button from "@/components/button";
import StarIcon from "@/icons/star.svg";
import RelatedRoller from "@/components/related-roller";
import { IntroContext } from "@/context/intro";
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import Image from "next/image";
import SanityImageTest from "@/components/sanity-image-test";
import { useCart } from "@/context/cartProvider";

const query = `{
  "globals": *[_type == "globals"][0] {
    title,
    sizeGuideClothingDesktopImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    sizeGuideClothingMobileImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    sizeGuideShoesDesktopImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    sizeGuideShoesMobileImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    conditionGuideText,
    conditions[] {
      heading,
      text,
      stars
    },
    conditionGuideImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
  }
}`;

const pageService = new SanityPageService(query);

export default function ShopSlug(initialData) {
  const {
    data: { productData, products, cms },
  } = pageService.getPreviewHook(initialData)();
  const [cartIsOpenContext, setCartIsOpenContext] = useContext(CartOpenContext);
  const [variantPrice, setVariantPrice] = useState(
    productData.variants.edges[0]?.node.price.amount
  );
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("size");
  const [variantId, setVariantId] = useState(
    productData.variants.edges[0]?.node.id
  );
  const [variant, setVariant] = useState(productData.variants.edges[0]);
  const [introContext, setIntroContext] = useContext(IntroContext);

  useEffect(() => {
    setIntroContext(true);
  }, []);

  const { cart, cartLinesAdd, createCart } = useCart();
  const [addToBagLoading, setAddToBagLoading] = useState(false);

  async function handleAddToCart() {
    const variantId = variant.node.id;

    let cartOperationSuccessful = false;
    setAddToBagLoading(true);
    if (cart) {
      try {
        await cartLinesAdd(
          cart?.id,
          variantId,
          productData.title,
          "subtitle",
          "url",
          productData.images.edges[0].node.originalSrc
        );
        cartOperationSuccessful = true;
        setAddToBagLoading(false);
      } catch (err) {
        console.error("Error adding item to cart:", error);
      }
    }
    if (!cartOperationSuccessful) {
      try {
        await createCart(
          variantId,
          productData.title,
          "subtitle",
          "url",
          productData.images.edges[0].node.originalSrc
        );
        setAddToBagLoading(false);
        cartOperationSuccessful = true;
      } catch (error) {
        console.error("Error creating cart:", error);
      }
    }
  }

  const addToBag = () => {
    productData.availableForSale ? handleAddToCart() : null;
    setTimeout(() => {
      cartIsOpenContext
        ? setCartIsOpenContext(false)
        : setCartIsOpenContext(true);
    }, 400);
  };

  let moneyUkLocale = Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
    useGrouping: true,
  });

  const relatedOne = products.slice(0, Math.floor(products.length / 2));
  const relatedTwo = products.slice(
    Math.floor(products.length / 2),
    products.length
  );

  return (
    <Layout>
      <NextSeo title={productData.title} />

      <LazyMotion features={domMax}>
        <m.div initial="initial" animate="enter" exit="exit">
          <main className="pt-[70px] lg:pt-[85px]">
            <Container>
              <m.div variants={fade}>
                <div className="relative z-10 flex w-full mb-3 text-xs tracking-tighter uppercase lg:mb-4 lg:text-sm lg:justify-end">
                  <Link href="/shop" className="block group">
                    <div className="relative">
                      <div className="relative w-full overflow-hidden">
                        <span className="block transition-transform ease-in-out duration-[450ms] translate-y-0 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%]">
                          Back to shop
                        </span>
                        <div className="absolute inset-0 w-full transition-transform ease-in-out duration-[450ms] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0">
                          Back to shop
                        </div>
                      </div>
                      <div className="w-full mx-auto h-px bg-black group-hover:w-1 transition-all ease-in-out duration-[450ms] mt-[2px]"></div>
                    </div>
                  </Link>

                  <a
                    href={`mailto:onscreenlovers@gmail.com?subject=Hey! I have a question about ${productData.title}`}
                    className="hidden ml-2 lg:flex group"
                  >
                    <StarIcon className="w-6 mr-1" />
                    <div className="relative">
                      <div className="relative w-full overflow-hidden">
                        <span className="block transition-transform ease-in-out duration-[450ms] translate-y-0 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%]">
                          Got a question about this piece?
                        </span>
                        <div className="absolute inset-0 w-full transition-transform ease-in-out duration-[450ms] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0">
                          Got a question about this piece?
                        </div>
                      </div>
                      <div className="w-full mx-auto h-px bg-black group-hover:w-1 transition-all ease-in-out duration-[450ms] mt-[2px]"></div>
                    </div>
                  </a>
                </div>

                <div className="block w-full mb-8 lg:hidden">
                  <h1 className="text-[17vw] md:text-[12.5vw] lg:text-[10vw] leading-[0.76] md:leading-[0.7] lg:leading-[0.7] 2xl:leading-[0.7] max-w-[90%] lg:max-w-[90%] mb-1 lg:mb-4">
                    {productData.title}
                  </h1>
                  {productData.collections?.edges.some(
                    (e) =>
                      e.node.title === "For Hire" || e.node.title === "Hire"
                  ) ? (
                    <span className="block text-xl font-light lg:text-2xl">
                      For Hire
                    </span>
                  ) : (
                    <span className="block text-xl font-light lg:text-2xl">
                      {moneyUkLocale.format(
                        productData.variants.edges[0].node.price.amount
                      )}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap h-full lg:min-h-[calc(100dvh-150px)]">
                  <div className="w-full lg:w-7/12 lg:pr-6 order-2 lg:order-1 flex flex-wrap h-full lg:min-h-[calc(100dvh-150px)]">
                    <div className="hidden w-full mb-12 lg:block">
                      <h1 className="text-[17vw] md:text-[12.5vw] lg:text-[10vw] leading-[0.76] md:leading-[0.7] lg:leading-[0.7] 2xl:leading-[0.7] max-w-[90%] lg:max-w-[90%] mb-4 lg:-mt-10">
                        {productData.title}
                      </h1>

                      {productData.collections?.edges.some(
                        (e) =>
                          e.node.title === "For Hire" || e.node.title === "Hire"
                      ) ? (
                        <span className="block text-2xl font-light">
                          For Hire
                        </span>
                      ) : (
                        <span className="block text-2xl font-light">
                          {moneyUkLocale.format(
                            productData.variants.edges[0].node.price.amount
                          )}
                        </span>
                      )}
                    </div>

                    <div className="w-full mt-auto">
                      <div
                        className="max-w-3xl mb-6 text-sm content lg:text-base"
                        dangerouslySetInnerHTML={{
                          __html: productData.descriptionHtml,
                        }}
                      ></div>

                      <div className="flex items-center space-x-2 lg:items-end">
                        {productData.collections?.edges.some(
                          (e) =>
                            e.node.title === "For Hire" ||
                            e.node.title === "Hire"
                        ) ? (
                          <div className="flex space-x-3">
                            <a
                              href={`mailto:onscreenlovers@gmail.com?subject=Hey! I'd love to hire ${productData.title}`}
                              className={`block uppercase rounded-[50%] px-8 lg:px-8 py-6 lg:py-6 text-center lg:text-lg lg:leading-none bg-black text-off-white border border-black relative overflow-hidden group`}
                            >
                              <div className="relative overflow-hidden">
                                <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">
                                  Hire piece
                                </div>
                                <div
                                  className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] text-black`}
                                >
                                  Hire piece
                                </div>
                              </div>
                              <div
                                className={`absolute inset-0 z-10 bg-zinc-100 transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}
                              ></div>
                            </a>
                          </div>
                        ) : (
                          <>
                            {productData.availableForSale ? (
                              <div className="flex space-x-3">
                                <button
                                  onClick={addToBag}
                                  className={`block uppercase rounded-[50%] px-4 lg:px-8 py-4 lg:py-6 text-center lg:text-lg lg:leading-none bg-black text-off-white border border-black ${
                                    addToBagLoading ? "cursor-disabled" : ""
                                  } relative overflow-hidden group`}
                                >
                                  <div className="relative overflow-hidden">
                                    <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">
                                      <span
                                        className={`absolute inset-0 text-center mx-auto flex items-center justify-center transition-opacity ease-in-out duration-[200ms] ${
                                          addToBagLoading
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                      >
                                        <StarIcon
                                          className={`w-[50px] ${
                                            addToBagLoading && "animate-blink"
                                          }`}
                                        />
                                      </span>
                                      <span
                                        className={`transition-opacity ease-in-out duration-[200ms] ${
                                          addToBagLoading
                                            ? "opacity-0"
                                            : "opacity-100"
                                        }`}
                                      >
                                        Buy Piece
                                      </span>
                                    </div>
                                    <div
                                      className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] text-black`}
                                    >
                                      <span
                                        className={`absolute inset-0 text-center mx-auto flex items-center justify-center transition-opacity ease-in-out duration-[200ms] ${
                                          addToBagLoading
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                      >
                                        <StarIcon
                                          className={`w-[50px] ${
                                            addToBagLoading && "animate-blink"
                                          }`}
                                        />
                                      </span>
                                      <span
                                        className={`transition-opacity ease-in-out duration-[200ms] ${
                                          addToBagLoading
                                            ? "opacity-0"
                                            : "opacity-100"
                                        }`}
                                      >
                                        Buy Piece
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className={`absolute inset-0 z-10 bg-zinc-100 transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}
                                  ></div>
                                </button>
                              </div>
                            ) : (
                              <span className="block line-through">
                                Sold Out
                              </span>
                            )}
                          </>
                        )}

                        <div className="flex-1 ml-auto">
                          <button
                            onClick={() => setModalOpen(true)}
                            className="block ml-auto mr-0 group justify-self-end"
                          >
                            <div className="relative">
                              <div className="relative w-full overflow-hidden text-xs tracking-tight uppercase lg:text-sm">
                                <span className="block transition-transform ease-in-out duration-[450ms] translate-y-0 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%]">
                                  Sizing &amp; Condition Guide
                                </span>
                                <div className="absolute inset-0 w-full transition-transform ease-in-out duration-[450ms] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0">
                                  Sizing &amp; Condition Guide
                                </div>
                              </div>
                              <div className="w-full mx-auto h-px bg-black group-hover:w-1 transition-all ease-in-out duration-[450ms] mt-[2px]"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-full lg:w-5/12 2 order-1 lg:order-2 mb-4 lg:mb-0 mt-auto relative overflow-hidden ${
                      productData.collections?.edges.some(
                        (e) => e.node.title === "Hire"
                      )
                        ? "h-[75dvh] lg:h-[calc(100dvh-160px)]"
                        : "h-[75dvh] lg:h-[calc(100dvh-160px)]"
                    }`}
                  >
                    <Image
                      src={productData.images.edges[0]?.node.originalSrc}
                      fill
                      sizes="(min-width: 1024px) 75vw, 90vw"
                      className={`w-full absolute inset-0 object-cover object-center`}
                      alt="placeholder"
                    />

                    {/* <Polaroid
                      noShadow
                      thin
                      product
                      metaText={productData.metaTitle ? productData.metaTitle.value : null}
                      bigMeta
                      barcode={productData.variants.edges[0].node.barcode}
                      number
                      image={productData.images.edges[0]?.node.originalSrc}
                      imageWidth={productData.images.edges[0]?.node.width}
                      imageHeight={productData.images.edges[0]?.node.height}
                      hoverImage={productData.images.edges[1] ? productData.images.edges[1].node.originalSrc : productData.images.edges[0]?.node.originalSrc}
                      hoverImageWidth={productData.images.edges[1] ? productData.images.edges[1].node.width : productData.images.edges[0]?.node.width}
                      hoverImageHeight={productData.images.edges[1] ? productData.images.edges[1].node.height : productData.images.edges[0]?.node.height}
                    /> */}
                    {/* <span className="block pt-5 text-xs underline uppercase lg:hidden">Got a question about this piece?</span> */}
                  </div>
                </div>

                {productData.quote && (
                  <div
                    className={`flex flex-wrap lg:justify-center ${
                      productData.images.edges.length > 2
                        ? "mt-[14vw] lg:mt-[15vw] mb-[5vw] lg:mb-[5vw]"
                        : "my-[14vw] lg:my-[15vw]"
                    }`}
                  >
                    <MetaText
                      text="Phoebe Says"
                      className="order-1 w-full lg:text-center lg:order-1"
                    />
                    <blockquote className="font-display text-[15vw] md:text-[9vw] lg:text-[7.7vw] mb-[6vw] lg:mb-[4vw] leading-[0.8] md:leading-[0.8] lg:leading-[0.8] max-w-[90%] lg:max-w-[80%] lg:text-center w-full order-3 lg:order-2">
                      “{productData.quote.value}”
                    </blockquote>
                  </div>
                )}
              </m.div>
            </Container>

            {productData.images.edges.length > 2 && (
              <m.div
                variants={fade}
                className={`pb-[14vw] lg:pb-[15vw] ${
                  !productData.quote ? "mt-[14vw] lg:mt-[15vw]" : ""
                }`}
              >
                <div className="grid items-start justify-center grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 md:p-10 md:gap-10">
                  {productData.images.edges.map((e, i) => {
                    return (
                      i !== 0 && (
                        <div
                          className="col-span-3 md:col-span-1 lg:col-span-1"
                          key={i}
                        >
                          <Image
                            src={e.node.originalSrc}
                            width={e.node.width / 5}
                            height={e.node.height / 5}
                            className={`w-full`}
                            alt="placeholder"
                          />

                          {/* <Polaroid
                          thin
                          noShadow
                          noText
                          noPadding
                          noHover
                          key={i}
                          image={e.node.originalSrc}
                          imageWidth={e.node.width}
                          imageHeight={e.node.height}
                          hoverImage={e.node.originalSrc}
                          hoverImageWidth={e.node.width}
                          hoverImageHeight={e.node.height}
                        /> */}
                        </div>
                      )
                    );
                  })}
                </div>
              </m.div>
            )}

            {/* SECOND LOOK SECTION */}
            <m.div variants={fade}>
              <div
                className={`bg-off-black text-off-white ${
                  !productData.quote &&
                  productData.images.edges.length < 3 &&
                  "mt-[10vw]"
                }`}
              >
                <div className="relative flex overflow-x-hidden text-sm leading-none opacity-100">
                  <div className="py-2 animate-marquee whitespace-nowrap will-change-transform">
                    {Array.from(Array(40), (e, i) => {
                      return (
                        <span className="inline-block mx-1" key={i}>
                          <EyesIcon className="w-5 lg:w-6" />
                        </span>
                      );
                    })}
                  </div>

                  <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap will-change-transform">
                    {Array.from(Array(40), (e, i) => {
                      return (
                        <span className="inline-block mx-1" key={i}>
                          <EyesIcon className="w-5 lg:w-6" />
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-[16vw] pb-[6vw] lg:py-[12vw] 2xl:py-40 2xl:pb-32">
                  <Container>
                    <div className="">
                      <h2 className="text-[22vw] lg:text-[17vw] leading-[0.8] lg:leading-[0.8] text-center mx-auto">
                        Second Look
                      </h2>
                      <p className="w-10/12 lg:w-1/2 max-w-[620px] mx-auto text-center text-base lg:text-lg">
                        Pieces to pique your interest.
                      </p>
                    </div>
                  </Container>

                  <div className="relative">
                    <RelatedRoller
                      items={products}
                      itemsOne={relatedOne}
                      itemsTwo={relatedTwo}
                    />
                  </div>

                  <Container>
                    <div className="flex justify-center">
                      <Button
                        href="/shop"
                        label="See all pieces"
                        outlineWhite
                        className="block"
                      />
                    </div>
                  </Container>
                </div>
              </div>
            </m.div>
          </main>

          <AnimatePresence>
            {modalOpen && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-[100000]"
                data-lenis-prevent
              >
                <button
                  className="absolute inset-0 bg-black/90"
                  onClick={() => setModalOpen(false)}
                ></button>

                <div className="w-[88vw] h-auto max-h-[84.5dvh] bg-white max-w-[1280px] p-5 relative overflow-y-scroll">
                  <h2 className="text-[17vw] md:text-[12.5vw] lg:text-[10vw] leading-[0.76] md:leading-[0.7] lg:leading-[0.7] 2xl:leading-[0.7] 2xl:text-[165px] max-w-[90%] lg:max-w-[90%] mb-3 md:mb-10">
                    Size &amp; Condition Guide
                  </h2>

                  <div className="flex mb-8 space-x-2 text-sm uppercase">
                    <button
                      onClick={() => setModalMode("size")}
                      className={`uppercase text-sm border-b leading-none tracking-tight ${
                        modalMode == "size"
                          ? "border-black"
                          : "border-transparent"
                      }`}
                    >
                      Size Guide
                    </button>
                    <span className="block">/</span>
                    <button
                      onClick={() => setModalMode("condition")}
                      className={`uppercase text-sm border-b leading-none tracking-tight  ${
                        modalMode == "condition"
                          ? "border-black"
                          : "border-transparent"
                      }`}
                    >
                      Condition Guide
                    </button>
                  </div>

                  {modalMode == "size" ? (
                    <div className="w-full">
                      <div className="mb-5 md:mb-8 xl:mb-12">
                        <h3 className="mb-2 text-5xl font-display md:text-6xl xl:text-7xl">
                          Clothing
                        </h3>
                        <SanityImageTest
                          image={
                            cms.globals.sizeGuideClothingDesktopImage
                              ? cms.globals.sizeGuideClothingDesktopImage
                              : null
                          }
                          className={`hidden md:block w-full`}
                          alt="size guide"
                        />

                        <SanityImageTest
                          image={
                            cms.globals.sizeGuideClothingMobileImage
                              ? cms.globals.sizeGuideClothingMobileImage
                              : null
                          }
                          className={`block md:hidden w-full`}
                          alt="size guide"
                        />
                      </div>

                      <div className="">
                        <h3 className="mb-2 text-5xl font-display md:text-6xl xl:text-7xl">
                          Shoes
                        </h3>

                        <SanityImageTest
                          image={
                            cms.globals.sizeGuideShoesDesktopImage
                              ? cms.globals.sizeGuideShoesDesktopImage
                              : null
                          }
                          className={`hidden md:block w-full`}
                          alt="size guide"
                        />

                        <SanityImageTest
                          image={
                            cms.globals.sizeGuideShoesMobileImage
                              ? cms.globals.sizeGuideShoesMobileImage
                              : null
                          }
                          className={`block md:hidden w-full`}
                          alt="size guide"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="md:w-[85%]">
                      {cms.globals.conditionGuideText && (
                        <p className="mb-6 text-sm md:text-base">
                          {cms.globals.conditionGuideText}
                        </p>
                      )}

                      <div className="flex flex-wrap w-full">
                        <div className="w-[37%] hidden xl:block">
                          <div className="relative w-full overflow-hidden aspect-square bg-black/10">
                            <SanityImageTest
                              eager={false}
                              image={
                                cms.globals.conditionGuideImage
                                  ? cms.globals.conditionGuideImage
                                  : null
                              }
                              fill
                              className={`block  z-[10] object-cover object-center aspect-square absolute inset-0 w-full h-full`}
                              alt="placeholder"
                            />
                          </div>
                        </div>

                        <div className="flex-1 xl:pl-8">
                          {cms.globals.conditions.map((e, i) => {
                            return (
                              <div className={`mb-4 last-of-type:mb-0`} key={i}>
                                <h3 className="mb-2 text-4xl font-display xl:text-5xl">
                                  {e.heading}
                                </h3>

                                <div className="flex space-x-1.5 mb-2">
                                  {Array.from(
                                    Array(Number(e.stars)),
                                    (e, i) => {
                                      return (
                                        <LogoMarkOutlinedIcon
                                          className="w-9"
                                          key={i}
                                        />
                                      );
                                    }
                                  )}
                                </div>

                                <p
                                  className={`text-xs md:text-sm ${
                                    cms.globals.conditions.length == i + 1
                                      ? ""
                                      : "mb-6"
                                  }`}
                                >
                                  {e.text}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setModalOpen(false)}
                    className="absolute flex items-center justify-center bg-black rounded-full w-7 md:w-10 xl:w-12 h-7 md:h-10 xl:h-12 top-2 right-2 md:top-4 md:right-4 group"
                    aria-label="Close Modal"
                  >
                    <svg
                      className="w-[55%] group-hover:w-[65%] transition-all ease-in-out duration-300"
                      viewBox="0 0 27 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#fff"
                        d="m0 15.152 25.98-15 1 1.732-25.98 15z"
                      />
                      <path fill="#fff" d="m1 0 25.98 15-1 1.732L0 1.732z" />
                    </svg>
                  </button>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <m.div variants={fade} className="bg-off-black text-off-white">
            <Footer />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  );
}

export async function getStaticPaths() {
  const productSlugs = await getProductSlugs();

  const paths = productSlugs.map((slug) => {
    const productSlug = String(slug.node.handle);

    return {
      params: { slug: productSlug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const cms = await pageService.fetchQuery(context);
  const productData = await getProduct(context.params.slug);
  const products = await getAllProductsRelated();

  return {
    props: { productData, products, cms },
  };
}
