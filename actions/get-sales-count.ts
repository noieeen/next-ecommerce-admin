import prismadb from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {
  const saleCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
    cacheStrategy: { ttl: 60 },
  });

  return saleCount;
};
