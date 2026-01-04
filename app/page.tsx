import Header from "@/components/Header/Header";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header pageOption="home" variant="overlay" />
      <main>
        <section className="py-4 md:py-8 relative">
          <div className="container px-8">
            <div className="bg-(--dark-green) rounded-[30px] flex flex-col lg:flex-row overflow-hidden">
              <div className="pt-40 lg:pt-70.75 pr-10 mb-20 lg:pb-40.75 pl-10 md:pl-16 lg:pl-20">
                <h1 className="font-medium text-5xl md:text-[70px] leading-[100%] tracking-[-0.03em] text-background mb-4 md:mb-7">
                  Make Life Easier for the Family:
                </h1>
                <p className="font-normal text-2xl md:text-[28px] leading-[1.07] tracking-[-0.02em] text-background mb-10 md:mb-18">
                  Find Babysitters Online for All Occasions
                </p>
                <Link
                  href="/nannies"
                  className="flex items-center gap-2 border border-[rgba(251,251,251,0.4)] rounded-[30px] px-12 py-4.5 w-57.5 h-15 font-medium text-[20px] leading-[1.2] tracking-[-0.01em] text-background"
                >
                  Get started
                  <ArrowUpRight size={24} color="#fbfbfb" />
                </Link>
              </div>
              <div className="min-w-full lg:min-w-174.75 min-h-84 md:min-h-180 lg:min-h-full bg-[url('/img/hero.png')] bg-cover bg-center bg-no-repeat relative">
                <div className="flex gap-2.5 md:gap-4 justify-center items-center rounded-[20px] w-54 md:w-71 h-25 md:h-29.5 bg-background absolute right-10 bottom-10 md:right-12.5 md:bottom-12.5 p-4 md:p-8">
                  <div className="rounded-[13px] w-8 h-8 md:w-13.5 md:h-13.5 bg-(--dark-green) flex items-center justify-center">
                    <Check size={20} color="white" />
                  </div>
                  <div>
                    <p className="font-normal text-[14px] md:text-[16px] text-[rgba(17,16,28,0.5)] mb-1">
                      Experienced nannies
                    </p>
                    <p className="font-bold text-[16px] md:text-[20px] text-[#11101c]">
                      15,000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
