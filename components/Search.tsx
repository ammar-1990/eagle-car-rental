"use client";

import { Loader2, RefreshCcw, Search as SearchIcon } from "lucide-react";
import SuperButton from "./SuperButton";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props<T> = {
    className?:string,
  placeholder?: string;
  searchParam: string;
  searchButtonClassName?: string;
  resetButtonClassName?: string;
} & (
  | { inputType: "input" }
  | {
      inputType: "select";
      values: T[];
      renderItem: (item: T) => Promise<{ value: string; label: string }>;
    }
);

const Search = <T extends { [key: string]: string }>({
  placeholder = "Search",
  searchParam,
  className,
  searchButtonClassName,
  resetButtonClassName,
  inputType,
  ...rest
}: Props<T>) => {
  const searchParams = useSearchParams();
  const paramsValue = searchParams.get(searchParam);

  const [processedItems, setProcessedItems] = useState<
    { value: string; label: string }[]
  >([]);

  const { values, renderItem } = rest as {
    values: T[];
    renderItem: (item: T) => Promise<{ value: string; label: string }>;
  };

  useEffect(() => {
  if(inputType !=='select') return
    const processItems = async () => {
      const results = await Promise.all(values.map((item) => renderItem(item)));
      setProcessedItems(results);
    };
    processItems();
  }, [values, renderItem]);

  const [search, setSearch] = useState(paramsValue ?? "");

  const router = useRouter();

  const [pendingSearch, startTransitionSearch] = useTransition();
  const [pendingReset, startTransitionReset] = useTransition();

  const handleSearch = () => {
 
    // Create a copy of the current search params
    const params = new URLSearchParams(searchParams);
    if (search) {
      // Set or update the specific search parameter
      params.set(searchParam, search);
      //reset page to 1
      params.set("page", "1");
    } else {
      // Remove the search parameter if the input is empty
      params.delete(searchParam);
    }

    startTransitionSearch(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const handleReset = () => {
    //reset input and delete search params from url bu nut pushing it
    const params = new URLSearchParams(searchParams);
    setSearch("");
    params.delete(searchParam);
    startTransitionReset(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className={cn("flex items-center gap-1",className)}>
      {inputType === "input" ? (
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      ) : (
        <Select
        value={search}
          onValueChange={(value) => {
            console.log(value);
            setSearch(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {processedItems.map(({ label, value }, index) => {
              return (
                <SelectItem className="cursor-pointer" key={index} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
      <Button
        type="button"
        disabled={pendingSearch}
        onClick={handleSearch}
        variant={"site"}
        className={cn("disabled:opacity-35", searchButtonClassName)}
      >
        {pendingSearch ? (
          <Loader2 className="w-8 h-8  animate-spin" />
        ) : (
          <SearchIcon className="icon" />
        )}
      </Button>

      <Button
        type="button"
        disabled={pendingReset || !paramsValue}
        onClick={handleReset}
        variant={"secondary"}
        className={cn("disabled:opacity-35", searchButtonClassName)}
      >
        {pendingReset ? (
          <Loader2 className="w-8 h-8  animate-spin" />
        ) : (
          <RefreshCcw className="icon" />
        )}
      </Button>
    </div>
  );
};

export default Search;
