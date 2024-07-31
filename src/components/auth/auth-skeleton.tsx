import { forwardRef } from "react";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

interface AuthSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuthSkeleton = forwardRef<HTMLDivElement, AuthSkeletonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Skeleton className={"size-[500px]"}>
        <div className={"flex flex-col space-y-1.5 p-6"}>
          <Skeleton className={"h-8 w-40"} />
        </div>
      </Skeleton>
    );
  }
);

export { AuthSkeleton };
