import Link from "next/link";
import "@/app/globals.css"
import NavLinks from "./nav-links";


export default function SideNav(){

    return(
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link 
                className="mb-2 flex h-20 place-items-end justify-start rounded-md bg-red-600 p-4 md:h-40"
                href={"/"}
            >
                <div className="w-12 md:w-1/2 lg:w-1/2 xl:w1/2">Home</div>
            </Link>

            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks/>
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            </div>
            <div className="flex flex-col space-y-2">
                {}

            </div>
        </div>
    );
}