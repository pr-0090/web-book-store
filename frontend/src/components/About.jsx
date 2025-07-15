import React from 'react'
import Title from './Title'
import { TbTruckReturn } from 'react-icons/tb'
import about from '../assets/book_4.png'

const About = () => {
  return (
    <section className='max-padd-container py-12 xl:py-24'>
      {/* container */}
      <div className='flexCenter flex-col gap-16 xl:gap-8 xl:flex-row'>
        {/* Left side */}
        <div className='flex-1'>
          <Title title1={"Unveiling Our "} title2={"Store's key features!"} titleStyles={'pb-10'} paraStyles={'!block'}/>
          <div className='flex flex-col items-start gap-y-4'>
            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
                <TbTruckReturn className='text-2xl'/>
              </div>
              <div>
                <h4 className='medium-18'>Easy Returns Process</h4>
                <p>We want you to love every book you buy! If you’re not completely happy, you can return your book within 7 days of delivery no hassle, no stress. Just make sure the book is in good condition, and we’ll gladly give you a full refund or exchange it for another title.</p>
              </div>
            </div>
            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
                <TbTruckReturn className='text-2xl'/>
              </div>
              <div>
                <h4 className='medium-18'>Secure Payment Options</h4>
                <p>Shop with peace of mind! Our bookstore app offers a super secure payment option that keeps your info safe and your checkout smooth. Whether you’re buying your next favorite read or a thoughtful gift, rest easy knowing your payment is protected with the latest security technology. Quick, safe, and hassle-free—because your stories deserve the best!</p>
              </div>
            </div>
            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondaryOne flexCenter rounded-md'>
                <TbTruckReturn className='text-2xl'/>
              </div>
              <div>
                <h4 className='medium-18'>Live Customer Support</h4>
                <p>Whether you're tracking an order, finding your next favorite book, or need a little help navigating the app — our Live Customer Support is here for you, anytime! </p>
              </div>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className='flex-1 flexCenter'>
          <div className='bg-secondaryOne flexCenter p-24 max-h-[33rem] max-w-[33rem] rounded-3xl'>
            <img src={about} alt="aboutImg" height={244} width={244} className='shadow-2xl shadow-slate-900/50 rounded-lg' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About