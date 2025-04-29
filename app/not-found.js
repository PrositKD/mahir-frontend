import React from 'react'
import Link from 'next/link'
import Banner from './components/site/common/component/Banner'
import Image from 'next/image'
export default function NotFound() {
    return (
        <div className='bg-[#0F172A] h-[1520px]'>
            <Banner title='404' />
            <div className="agency-container flex flex-col justify-center items-center lg:py-[140px] sm:py-[100px] py-[50px]">
                <h1 className='heading-2 text-white text-center'>Whoops! That page doesn&apos;t exist.</h1>
                <Image src="/inner/no.png" width={706} height={430}  alt="image" />
                <h2 className='lg:mt-[64px] mt-7 lg:mb-[50px] heading-8 mb-7 text-textBody'>The page you requested could not be found</h2>
                <Link className='common-btn bg-primary text-white' href="/">
                    Back to Home
                </Link>
            </div>
        </div>
    )
}