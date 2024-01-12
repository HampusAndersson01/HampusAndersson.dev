declare module "*.svg" {
  import { FC, SVGProps } from "react";
  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
}

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.webp" {
  const value: any;
  export = value;
}

declare module "react-useanimations" {
  import { FC } from "react";

  export interface UseAnimationsProps {
    animation: any;
    size?: number;
    strokeColor?: string;
    speed?: number;
    reverse?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    options?: any;
    fillColor?: string;
    onClick?: () => void;
    className?: string;
    id?: string;
    ref?: any;
  }

  const UseAnimations: FC<UseAnimationsProps>;
  export default UseAnimations;
}
