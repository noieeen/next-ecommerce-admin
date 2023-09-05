import {
  getMonthlyGraphRevenue,
  getWeeklyGraphRevenue,
} from "@/actions/get-graph-revenue";
import { getStockCount } from "@/actions/get-products-stock";
import { getSalesCount } from "@/actions/get-sales-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Metadata } from "next";

interface DashboardPageProps {
  params: { storeId: string };
}

export const metadata: Metadata = {
  title: "Admin Dashboard - Overview",
  description: "Admin Dashboard - Overview",
};

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);

  const overviewDataMonthly = await getMonthlyGraphRevenue(params.storeId);
  const overviewDataWeekly = await getWeeklyGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row ima-controls-div justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row ima-controls-div justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row ima-controls-div justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Product In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview Weekly</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <LineChart data={overviewDataWeekly} />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview Monthly</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChart data={overviewDataMonthly} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
