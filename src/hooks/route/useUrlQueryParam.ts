import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type queryProps = {
  queryString: string;
};
const useUrlQueryParam = (paramKey: string) => {
  const searchParams = useSearchParams();
  return useMemo(() => searchParams.get(paramKey) || "", [searchParams]);
};

export default useUrlQueryParam;
