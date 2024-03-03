'use client'

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {

  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, [])


  const getStock = async () => {
    const stock = await getStockBySlug(slug);
    setStock(stock);
    setIsLoading(false);
  }

  return (
    <>
    {
      isLoading 
      ? (
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl bg-gray-200`}>
          &nbsp;
        </h1>
      )
      : (
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          Stock: {stock}
        </h1>
      )
    }
    </>
  )
}
