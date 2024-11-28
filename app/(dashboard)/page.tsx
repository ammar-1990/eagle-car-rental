import { wait } from "@/lib/utils";
import Heading from "./_components/Heading";

 

export default async function Home() {

  await wait()
  return (
 <div>
  <Heading title="Dashboard" />
  <div className="">
  </div>
 </div>
  );
}
