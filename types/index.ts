import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export type BlogPost = {
  id: string;
  title: string;
  date: string;
  description: string;
  author: string;
  image: string;
  keywords: string[];
};
