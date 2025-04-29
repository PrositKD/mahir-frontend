import Image from "next/image";
import CourseCard from "../site/common/card/courseCard1";
import TabButton from "../site/common/component/tabButton";

const SpecialCourse = ({ color = "#02050A", theme }) => {
   const storeProduct = [
      {
         _id: 1,
         image: "/theme5/c1.png",
         title: "Basic Web Development course - Advence",
         author: "Quixote",
         author_img: "/theme5/user.png",
         price: "125 .00",
         rating: 4,
         category: "ebook",
         offer: 15,
         text: 'text-black'
      },
      {
         _id: 2,
         image: "/theme5/c2.png",
         title: "Basic Web Development course - Advence",
         author: "MD Ali",
         author_img: "/theme5/user.png",
         price: "125 .00",
         rating: 3,
         category: "paint",
         offer: 30,
         text: 'text-black'

      },
      {
         _id: 3,
         image: "/theme5/c1.png",
         title: "Basic Web Development course - Advence",
         author: "Ahemed",
         author_img: "/theme5/user.png",
         price: "125 .00",
         rating: 4,
         category: "design",
         offer: 20,
         text: 'text-black'

      },
      {
         _id: 4,
         image: "/theme5/c2.png",
         title: "Basic Web Development course - Advence",
         author: "Minhaz",
         author_img: "/theme5/user.png",
         price: "125 .00",
         rating: 3,
         category: "ebook",
         offer: 2,
      },
   ];
   return (
      <section className="relative">
         {
            theme === 'theme3' ? (
               <div>
                  <Image className='absolute -top-28 hidden xl:block right-0 xl:-left-10 2xl:left-16' src='/home3/c1.png' width={500} height={500} alt='shape' />
                  <Image className='absolute -bottom-32 hidden xl:block xl:-right-20 2xl:right-16' src='/home3/c2.png' width={500} height={500} alt='shape' />
               </div>
            ) : (
               <br />
            )
         }
         <div className='relative z-10 agency-container'>
            <h1 className={`heading-2 text-center capitalize text-${color}`}>the special course we provide</h1>
            <div className='mt-5 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-[60px] shadow-[0px_4px_25px_-1px_rgba(0,0,0,0.2)] backdrop-blur-[25px] bg-[linear-gradient(180deg,rgba(255,255,255,0.40)_0%,rgba(217,217,217,0.10)_100%)] rounded'>
               <TabButton theme={theme} />
            </div>

            <div className='z-10 mt-8 md:mt-10 lg:mt-12 xl:mt-16 2xl:mt-[72px] grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5'>
               {
                  storeProduct.map(item => <CourseCard key={item._id} theme={theme} product={item} color={color} ></CourseCard>)
               }
            </div>
         </div>
      </section>
   );
};

export default SpecialCourse;