import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="custom-width flex gap-x-10">
      <div className="w-[70%] flex flex-col gap-y-5">
        <Skeleton className="w-full h-[800px]" />
      </div>
      <div className="w-[30%] ">
        <Skeleton className="w-full h-[300px]" />
      </div>
    </div>
  );
}
