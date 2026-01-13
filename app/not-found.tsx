import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-[#0B0F19] text-white overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20"
           style={{
             backgroundImage: `url('/bg-content.jpg')`, // Переконайся, що цей файл існує в public
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             filter: 'grayscale(100%)'
           }}
      ></div>

      {/* Central Content */}
      <div className="z-10 flex flex-col items-center text-center px-6">
        
        {/* Giant Gradient Numbers */}
        <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#0B0F19] select-none drop-shadow-2xl">
          404
        </h1>

        {/* Status Line */}
        <div className="w-24 h-1 bg-[#EAB308] my-8 shadow-[0_0_15px_#EAB308]"></div>

        {/* Error Text */}
        <h2 className="text-[24px] md:text-[32px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-200">
          COORDINATES INVALID
        </h2>
        
        <p className="text-gray-400 text-[16px] md:text-[20px] max-w-lg mb-12 font-light leading-relaxed">
          The sector you are trying to reach does not exist or has been decommissioned.
          Please return to the main frequency.
        </p>

        {/* Return Button */}
        <Link 
          href="/" 
          className="group relative px-8 py-4 bg-white/5 border border-white/10 hover:border-[#EAB308] transition-all duration-300 backdrop-blur-sm"
        >
          <span className="absolute inset-0 bg-[#EAB308] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          <span className="text-[16px] md:text-[18px] font-bold tracking-widest uppercase text-white group-hover:text-[#EAB308] transition-colors">
            <i className="fas fa-chevron-left mr-3"></i>
            RETURN TO BASE
          </span>
        </Link>

      </div>

      {/* Footer System Code */}
      <div className="absolute bottom-10 text-gray-600 font-mono text-sm tracking-widest opacity-50">
        ERROR_CODE: V0ID_S3CT0R
      </div>
    </div>
  )
}