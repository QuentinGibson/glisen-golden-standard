import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Image from "next/image";
import StarBackground from "./StarBackground";
import background from "./background.jpg";
import AnimatedContent from "./AnimatedContent";

/**
 * Props for `Ingetrations`.
 */
export type IngetrationsProps = SliceComponentProps<Content.IngetrationsSlice>;

/**
 * Component for "Ingetrations" Slices.
 */
const Ingetrations = ({ slice }: IngetrationsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <Image
        src={background}
        alt=""
        fill
        className="object-cover"
        quality={50}
      />
      <StarBackground />
      <div className="relative">
        <div className="mx-auto max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </div>
        <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>
        <AnimatedContent slice={slice} />
      </div>
    </Bounded>
  );
};

export default Ingetrations;
