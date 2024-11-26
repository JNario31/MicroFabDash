'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Home, Building, Building2 } from "lucide-react"

const links = [
    { 
        name: 'Home', 
        href: '/', 
        icon: Home 
    },
    { 
        name: 'Bergeron',
        href: '/bergeron',
         icon: Building 
    },
    { 
        name: 'Petrie A',
        href: '/petrie-a',
         icon: Building2 
    },
    { 
        name: 'Petrie B',
        href: '/petrie-b',
         icon: Building2
    },
];

export default function NavLinks(){
    const pathname = usePathname();
    return(
    <>
        {links.map((link) => {
            const LinkIcon = link.icon;
            return(
                <Link
                key={link.name}
                href={link.href}
                className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-pink-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                    'bg-red-400 text-pink-200':pathname==link.href,
                },
                )}>
                
                <LinkIcon className="w-6"/>
                <p className='hidden md:block'>{link.name}</p>

                </Link>
            );
        })}
    </>
    );
}