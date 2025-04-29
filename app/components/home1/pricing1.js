import React from 'react'
import PriceCard1 from '../site/common/card/pricingCard1'

const Pricing1 = () => {
      const items = [
            {
                  id: 1,
                  price: '12',
                  title: 'Basic',
            },
            {
                  id: 2,
                  price: '40',
                  title: 'Standard',
            },
            {
                  id: 3,
                  price: '80',
                  title: 'Premium',
            },
      ]
      return (

            <div className="agency-container">
                  <div className="md:flex justify-between items-center gap-5 lg:gap-10 xl:gap-20 2xl:gap-[150px]">
                        <h1 className='heading-2 text-[#02050A] font-semibold whitespace-pre'>The Right  pricing plan</h1>
                        <p className='text-[#888AA0] description-2 mt-3 md:mt-0'>Creative agencies are businesses that specialize in creating and with on a executing mark creative agencies  businesses that specialize need more than</p>
                  </div>
                  <div className="lg:mt-10 sm:mt-8 mt-6 xl:mt-12 2xl:mt-[60px] grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-5 ">
                        {
                              items.map(item => <PriceCard1 key={item.id} item={item} />)
                        }
                  </div>
            </div>

      )
}

export default Pricing1