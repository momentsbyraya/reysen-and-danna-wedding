import React from 'react'
import { Gift } from 'lucide-react'

const GiftSection = () => {
  return (
    <section className="relative z-20 mt-0">
      <div className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16">
        <h3 className="relative inline-block px-6 py-3 mb-10 text-center w-full">
          <span className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize text-[#6685A4]">
            Gift
          </span>
        </h3>

        <div className="max-w-md mx-auto rounded-2xl bg-white/80 border border-[#d9d9d9] shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-[#6685A4]" />
            <p className="font-albert text-sm sm:text-base text-[#333333]">
              Monetary gift
            </p>
          </div>

          <p className="font-albert text-center text-sm sm:text-base text-[#333333] mb-4">
            Your presence is the greatest gift. If you wish to bless us, you may use this QR.
          </p>

          <div className="w-full aspect-square rounded-xl border border-dashed border-[#b8c6d8] bg-white flex items-center justify-center p-3 sm:p-4 overflow-hidden">
            <img
              src="/assets/images/qr/QR-code.png"
              alt="InstaPay QR code for monetary gift"
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default GiftSection
