import Bounded from "@/components/Bounded";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `BentoBoxSlice`.
 */
export type BentoBoxSliceProps =
  SliceComponentProps<Content.BentoBoxSliceSlice>;

/**
 * Component for "BentoBoxSlice" Slices.
 */
const BentoBoxSlice = ({ slice }: BentoBoxSliceProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-5xl font-medium text-center text-balance md:text-7xl">
                {children}
              </h2>
            ),
            em: ({ children }) => (
              <em className="not-italic text-transparent bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text">
                {children}
              </em>
            ),
          }}
        />
      )}
      {isFilled.richText(slice.primary.body) && (
        <div className="max-w-md mx-auto mt-6 text-center text-balance text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>
      )}
      <div className="mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
        {slice.items.map((item, index) => (
          <div
            className={clsx(
              "glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4",
              item.wide ? "md:col-span-2" : "md:col-span-1",
            )}
            key={index}
          >
            {isFilled.richText(item.title) && (
              <PrismicRichText
                components={{
                  heading3: ({ children }) => (
                    <h3 className="text-2xl">{children}</h3>
                  ),
                }}
                field={item.title}
              />
            )}
            {isFilled.richText(item.body) && (
              <div className="max-w-md text-balance text-slate-300">
                <PrismicRichText field={item.body} />
              </div>
            )}
            {isFilled.image(item.image) && (
              <PrismicNextImage
                field={item.image}
                className="w-auto max-h-36"
              />
            )}
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default BentoBoxSlice;
