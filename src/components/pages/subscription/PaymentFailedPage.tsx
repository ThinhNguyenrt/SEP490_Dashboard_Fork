import React from 'react';

// --- Types ---
interface ReceiptItemProps {
  label: string;
  value: string;
}

// --- Sub-components ---

const ReceiptItem: React.FC<ReceiptItemProps> = ({ label, value }) => (
  <div className="flex justify-between items-baseline group">
    <span className=" text-[12px] uppercase tracking-widest text-[#5a6061] group-hover:text-[#2d3435] transition-colors">
      {label}
    </span>
    <span className=" text-[12px] text-[#2d3435] font-bold">
      {value}
    </span>
  </div>
);

export const PaymentFailedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#2d3435] antialiased">
      {/* Header */}
      {/* <header className="w-full top-0 sticky bg-[#f9f9f9]/80 backdrop-blur-md z-50">
        <nav className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
          <div className="text-lg font-bold tracking-tighter text-gray-800 font-['Manrope']">
            The Ledger
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-500 font-medium font-['Manrope'] text-sm tracking-widest uppercase cursor-pointer hover:bg-gray-100 transition-colors px-3 py-1 rounded-xl">
              Ledger
            </button>
            <button className="text-gray-500 font-medium font-['Manrope'] text-sm tracking-widest uppercase cursor-pointer hover:bg-gray-100 transition-colors px-3 py-1 rounded-xl">
              Receipts
            </button>
            <span className="material-symbols-outlined text-gray-700 cursor-pointer p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-all">
              account_circle
            </span>
          </div>
        </nav>
      </header> */}

      <main className="max-w-xl mx-auto px-6 py-6 md:py-20 flex flex-col items-center">
        {/* Status Indicator */}
        <div className="mb-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-white shadow-xl border border-black/5">
            <span className="material-symbols-outlined text-[#bb1b21] text-6xl font-light">
              X
            </span>
          </div>
          <h1 className=" font-bold text-3xl tracking-tight text-[#2d3435] mb-2">
            Payment Failed
          </h1>
          {/* <p className="text-[#5a6061]">Transaction declined by bank</p> */}
        </div>

        {/* The Receipt Card */}
        <div 
          className="w-full bg-white shadow-2xl relative overflow-hidden mb-12"
          style={{
            clipPath: `polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 96% 98%, 94% 100%, 92% 98%, 90% 100%, 88% 98%, 86% 100%, 84% 98%, 82% 100%, 80% 98%, 78% 100%, 76% 98%, 74% 100%, 72% 98%, 70% 100%, 68% 98%, 66% 100%, 64% 98%, 62% 100%, 60% 98%, 58% 100%, 56% 98%, 54% 100%, 52% 98%, 50% 100%, 48% 98%, 46% 100%, 44% 98%, 42% 100%, 40% 98%, 38% 100%, 36% 98%, 34% 100%, 32% 98%, 30% 100%, 28% 98%, 26% 100%, 24% 98%, 22% 100%, 20% 98%, 18% 100%, 16% 98%, 14% 100%, 12% 98%, 10% 100%, 8% 98%, 6% 100%, 4% 98%, 2% 100%, 0% 98%)`
          }}
        >
          {/* Top Thermal Header */}
          <div className="bg-[#f2f4f4] px-8 py-4 flex justify-between items-center border-b border-[#adb3b4]/10">
            <span className="font-['Space_Grotesk'] text-[10px] tracking-widest uppercase text-[#757c7d]">Terminal ID: TL-8821</span>
            <span className="font-['Space_Grotesk'] text-[10px] tracking-widest uppercase text-[#757c7d]">12 OCT 2023 14:22</span>
          </div>

          <div className="p-8 md:p-12">
            {/* Brand Section */}
            <div className="flex items-center gap-4 mb-10">
              {/* <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#e4e9ea]">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=100&auto=format&fit=crop" 
                  alt="Storefront"
                />
              </div> */}
              <div>
                <h3 className=" font-bold text-lg text-[#2d3435] leading-none mb-1">Architectural Digest</h3>
                <p className="text-[11px] uppercase tracking-widest text-[#5a6061]">Annual Digital Access</p>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-4 mb-10">
              <ReceiptItem label="Order Reference" value="#AD-992-KLA-02" />
              <ReceiptItem label="Payment Method" value="Visa •••• 4242" />
              <ReceiptItem label="Attempted Subtotal" value="185.00" />
              <ReceiptItem label="Processing Fee" value="0.00" />
              
              <div className="w-full h-px bg-[#e4e9ea] my-6" />

              <div className="flex justify-between items-center py-2">
                <span className="font-['Manrope'] text-lg font-bold text-[#2d3435] tracking-tighter">TOTAL AMOUNT</span>
                <span className="font-['Manrope'] text-3xl font-extrabold text-[#2d3435] tracking-tighter">$185.00</span>
              </div>
            </div>

            {/* Error Message */}
            {/* <div className="bg-[#fff7f6] p-4 rounded-lg border border-[#bb1b21]/10 flex gap-3">
              <span className="material-symbols-outlined text-[#bb1b21] text-xl mt-0.5">error</span>
              <div>
                <p className="text-xs font-semibold text-[#a90816] mb-1 uppercase tracking-tight">Security Decline</p>
                <p className="text-[13px] text-[#752121] leading-relaxed">
                  Please check your account balance or contact your card issuer for verification. 
                  Error code: <span className="font-['Space_Grotesk'] font-bold">INV_FUNDS_01</span>
                </p>
              </div>
            </div> */}
          </div>

          {/* Bottom Branding */}
          {/* <div className="bg-[#f2f4f4]/50 px-8 py-6 text-center">
            <p className=" text-[10px] uppercase tracking-[0.2em] text-[#757c7d]">
              Verified by The Ledger Security Protocol
            </p>
          </div> */}
        </div>

        {/* Actions */}
        {/* <div className="w-full flex flex-col gap-4">
          <button className="w-full py-4 rounded-xl font-['Manrope'] font-bold text-white bg-gradient-to-r from-[#5d5e61] to-[#515255] shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">refresh</span>
            Retry Payment
          </button>
          <button className="w-full py-4 rounded-xl font-['Manrope'] font-bold text-[#2d3435] bg-[#e4e9ea] hover:bg-[#dde4e5] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">support_agent</span>
            Contact Support
          </button>
          <button className="mt-4 text-center font-['Space_Grotesk'] text-[11px] uppercase tracking-widest text-[#5a6061] hover:text-[#2d3435] transition-colors underline underline-offset-4 decoration-[#adb3b4]/30">
            Cancel and return to dashboard
          </button>
        </div> */}
      </main>

      {/* Footer */}
      {/* <footer className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#adb3b4]/10 mt-12 opacity-60">
        <div className="font-['Space_Grotesk'] text-[10px] tracking-widest uppercase text-[#5a6061]">
          © 2023 The Tactile Ledger Inc.
        </div>
        <div className="flex gap-8">
          {['Privacy', 'Terms', 'Help Center'].map((link) => (
            <button key={link} className="font-['Space_Grotesk'] text-[10px] tracking-widest uppercase text-[#5a6061] hover:text-[#2d3435] transition-colors">
              {link}
            </button>
          ))}
        </div>
      </footer> */}
    </div>
  );
};

export default PaymentFailedPage;