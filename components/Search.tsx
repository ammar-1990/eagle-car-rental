"use client";

import { Loader2, RefreshCcw, Search as SearchIcon } from "lucide-react";
import SuperButton from "./SuperButton";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  placeholder?: string;
  searchParam: string;
  buttonClassName?: string;
};

const Search = ({
  placeholder = "Search",
  searchParam,
  buttonClassName,
}: Props) => {
  const searchParams = useSearchParams();
  const paramsValue = searchParams.get(searchParam)
  
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

  const handleReset = ()=>{
    const params = new URLSearchParams(searchParams);
    setSearch('')
    params.delete(searchParam);
    startTransitionReset(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    

  }

  return (
    <div className="flex items-center gap-1">
      <Input
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        disabled={pendingSearch}
        onClick={handleSearch}
        variant={"site"}
        className={cn("disabled:opacity-35", buttonClassName)}
      >
        {pendingSearch ? (
          <Loader2 className="w-8 h-8  animate-spin" />
        ) : (
          <SearchIcon className="icon" />
        )}
      </Button>

      <Button
        disabled={pendingReset || !paramsValue}
        onClick={handleReset}
        variant={"secondary"}
        className={cn("disabled:opacity-35", buttonClassName)}
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
