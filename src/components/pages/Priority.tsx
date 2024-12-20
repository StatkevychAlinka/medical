import React from 'react';




const Priority: React.FC = () => {
  return (
    <section>
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0 pt-22.5">
        <div className="cta-box-gradient relative z-999 overflow-hidden rounded-[30px] bg-dark px-4 py-20 lg:py-25">
       
        <div className="absolute bottom-0 left-0 -z-1 h-full w-full bg-gradient-to-b from-transparent via-purple-500/30 to-purple-900 blur-xl"></div>

<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
  <span className="absolute bottom-0 left-1/2 -z-1 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-500 blur-3xl opacity-30"></span>
  <span className="absolute bottom-0 left-1/2 -z-1 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-blue-400 blur-2xl opacity-50"></span>
  <span className="absolute bottom-0 left-1/2 -z-1 h-[150px] w-[150px] -translate-x-1/2 rounded-full bg-pink-500 blur-xl opacity-60"></span>
</div>


   
          <div className="absolute -bottom-25 left-1/2 -z-1 h-60 w-full max-w-[482px] -translate-x-1/2 overflow-hidden">
            <div className="stars"></div>
            <div className="stars2"></div>
          </div>

       
          <div className="wow fadeInUp text-center">
         
            <h2 className="mb-4.5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">
              What are you waiting for?
            </h2>
            <p className="mx-auto mb-9 max-w-[714px] font-light text-white">
              Build SaaS AI applications using OpenAI and Next.js, this kit
              comes with pre-configured and pre-built examples, making it easier
              to quickly kickstart your AI startup.
            </p>
            <a
              
              href="/"
            >
            <button className="button">
  <span className="liquid"></span>  
  <span className="btn-txt text-white">zzz</span>
</button>
            </a>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Priority;