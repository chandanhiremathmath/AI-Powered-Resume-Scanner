import blueBg from "../assets/images/blue-bg.png"
import akLogo from "../assets/images/ak-logo.png"
import scannerSvg from "../assets/images/scanner-svg.svg"

const Hero = () => {
    return (
        <div className="w-full h-screen mx-auto relative">
            <div className="w-full h-screen flex items-center justify-center">
                <img src={blueBg} alt="img" className="w-full h-full object-cover" />
            </div>
            <a href="https://www.abulkhasim.com" target='_blank' className="cursor-pointer">
                <div className="w-fit absolute top-16 sm:top-10 left-1/2 -translate-x-1/2 z-50">
                    <img src={akLogo} alt="ak" />
                </div>
            </a>

            <div className="w-full h-full px-6 sm:px-12 absolute bottom-10 left-0 font-yeseva flex flex-col items-center justify-center">
                <h2 className="text-white italic leading-none font-thin">ak's</h2>
                <h1 className="text-[3rem] sm:text-[8vw] xl:text-[6rem] leading-none p-4 text-white">AI-Powered</h1>
                <div className="relative">
                    <h1 className="text-[2.5rem] sm:text-[8vw] xl:text-[6rem] leading-none p-3 px-3 md:px-6 rounded-xl -rotate-1 bg-white text-[#003E5E]">Hiring Assistant</h1>
                    <img src={scannerSvg} alt="scanner" className="w-[6rem] sm:w-[15rem] lg:w-[20rem] absolute top-0 right-1 sm:-right-4 lg:-right-12 rotate-[15deg]" />
                </div>

                <div className="px-6 sm:px-16 lg:px-24 absolute bottom-14 sm:bottom-6 left-0 font-inter flex flex-col gap-3">
                    <p className="w-[300px] text-[1.2rem] sm:text-[1rem] italic text-white font-extralight tracking-wide">
                        Streamline your hiring process with advanced AI technology.
                    </p>
                    <a href="#page1">
                        <button className="w-fit px-6 py-1 bg-white text-[#003E5E] text-[1.3rem] sm:text-[1.5rem] font-yeseva rounded-md">
                            Scan Now
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Hero