import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getMonthlyGraphRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    cacheStrategy: { ttl: 60 },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Fab", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  // console.log(graphData);

  return graphData;
};

export const getWeeklyGraphRevenue = async (storeId: string) => {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the current week

  const endOfWeek = new Date();
  endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() + 6); // End of the current week

  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const weeklyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const day = order.createdAt.getDay();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    weeklyRevenue[day] = (weeklyRevenue[day] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { name: "Sun", total: 0 },
    { name: "Mon", total: 0 },
    { name: "Tue", total: 0 },
    { name: "Wed", total: 0 },
    { name: "Thu", total: 0 },
    { name: "Fri", total: 0 },
    { name: "Sat", total: 0 },
  ];

  for (const day in weeklyRevenue) {
    graphData[parseInt(day)].total = weeklyRevenue[parseInt(day)];
  }

  // console.log("week", graphData);

  return graphData;
};
