import { wait } from "@/lib/utils";
import Heading from "./_components/Heading";
import MonthlyChart from "./_components/MonthlyChart";

 type Props = {}

export default async function HomeMainPage(props:Props) {

 
  return (
 <div>
  <Heading title="Dashboard" />
  <div className="">
    <MonthlyChart />
  </div>
 </div>
  );
}
