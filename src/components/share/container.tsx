import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

type TContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container: FC<TContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn("w-full max-w-[1300px] mx-auto px-3 md:px-5", className)}
    >
      {children}
    </div>
  );
};

export default Container;
