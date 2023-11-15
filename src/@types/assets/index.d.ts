declare module "*.svg" {
  import { FC, SVGProps } from "react";
  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
}

declare module "*.png" {
  const value: any;
  export = value;
}
