"use client";

import { useState } from "react";

type Drop = {
  id: string;
  agentId: string;
  agentName: string;
  title: string;
  description: string;
  type: "NFT" | "PHYSICAL" | "PERFORMANCE" | "REPORT";
  price: string;
  currency: "ETH" | "USD";
  currentBid?: string;
  stock?: number;
  sold?: number;
};

type PurchaseModalProps = {
  drop: Drop | null;
  onClose: () => void;
  onPurchase: (drop: Drop, details: any) => void;
};

export default function PurchaseModal({ drop, onClose, onPurchase }: PurchaseModalProps) {
  const [step, setStep] = useState<"DETAILS" | "PAYMENT" | "CONFIRM" | "SUCCESS">("DETAILS");
  const [bidAmount, setBidAmount] = useState("");
  const [userHandle, setUserHandle] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!drop) return null;

  const isNFT = drop.type === "NFT";
  const currentPrice = isNFT ? (drop.currentBid || drop.price) : drop.price;

  const handleNext = () => {
    if (step === "DETAILS") {
      setStep("PAYMENT");
    } else if (step === "PAYMENT") {
      setStep("CONFIRM");
    } else if (step === "CONFIRM") {
      setIsProcessing(true);
      setTimeout(() => {
        setStep("SUCCESS");
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handlePurchase = () => {
    const details = {
      userHandle,
      email,
      amount: isNFT ? bidAmount : drop.price,
      currency: drop.currency
    };
    
    onPurchase(drop, details);
    setTimeout(() => onClose(), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="border-b border-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {isNFT ? "PLACE BID" : "PURCHASE"} - {drop.title}
          </h2>
          <button 
            onClick={onClose}
            className="text-xl hover:opacity-60"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Progress Indicator */}
          <div className="flex justify-between mb-6 text-xs">
            {["DETAILS", "PAYMENT", "CONFIRM", "SUCCESS"].map((s, i) => (
              <div key={s} className={`flex-1 text-center ${
                step === s ? "text-white" : 
                ["DETAILS", "PAYMENT", "CONFIRM", "SUCCESS"].indexOf(step) > i ? "text-green-400" : "opacity-40"
              }`}>
                {s}
              </div>
            ))}
          </div>

          {step === "DETAILS" && (
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold mb-2">ITEM DETAILS</div>
                <div className="border border-white/30 p-4">
                  <div className="font-bold">{drop.agentName} - {drop.title}</div>
                  <div className="text-sm opacity-80 mt-1">{drop.description}</div>
                  <div className="text-xs opacity-60 mt-2">{drop.type}</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-bold mb-2">CURRENT {isNFT ? "BID" : "PRICE"}</div>
                <div className="text-2xl font-mono">{currentPrice} {drop.currency}</div>
                {isNFT && (
                  <div className="text-xs opacity-60">Minimum bid: {(parseFloat(currentPrice) + 0.01).toFixed(2)} {drop.currency}</div>
                )}
              </div>

              {isNFT && (
                <div>
                  <div className="text-sm font-bold mb-2">YOUR BID</div>
                  <input 
                    type="number"
                    step="0.01"
                    min={parseFloat(currentPrice) + 0.01}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full p-3 border border-white bg-black text-white"
                    placeholder={`${(parseFloat(currentPrice) + 0.1).toFixed(2)} ${drop.currency}`}
                  />
                </div>
              )}

              <div>
                <div className="text-sm font-bold mb-2">COLLECTOR HANDLE</div>
                <input 
                  type="text"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value)}
                  className="w-full p-3 border border-white bg-black text-white"
                  placeholder="@your_handle"
                />
              </div>

              <div>
                <div className="text-sm font-bold mb-2">EMAIL (OPTIONAL)</div>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-white bg-black text-white"
                  placeholder="collector@eden.art"
                />
              </div>

              <button 
                onClick={handleNext}
                disabled={!userHandle || (isNFT && !bidAmount)}
                className="w-full p-3 border border-white hover:bg-white hover:text-black transition-all disabled:opacity-50"
              >
                CONTINUE
              </button>
            </div>
          )}

          {step === "PAYMENT" && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-sm opacity-60">MOCK PAYMENT SIMULATION</div>
                <div className="text-xs opacity-40 mt-1">
                  No real transactions will occur
                </div>
              </div>

              <div className="border border-white/30 p-4">
                <div className="flex justify-between mb-2">
                  <span>Item:</span>
                  <span>{drop.title}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Amount:</span>
                  <span className="font-mono">
                    {isNFT ? bidAmount : drop.price} {drop.currency}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Platform Fee (2.5%):</span>
                  <span className="font-mono">
                    {((parseFloat(isNFT ? bidAmount : drop.price) * 0.025)).toFixed(3)} {drop.currency}
                  </span>
                </div>
                <div className="border-t border-white/30 pt-2 mt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="font-mono">
                    {((parseFloat(isNFT ? bidAmount : drop.price) * 1.025)).toFixed(3)} {drop.currency}
                  </span>
                </div>
              </div>

              <div className="border border-white p-4">
                <div className="text-sm font-bold mb-2">PAYMENT METHOD</div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" defaultChecked />
                    <span>{drop.currency === "ETH" ? "MetaMask Wallet" : "Credit Card"}</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" />
                    <span>WalletConnect</span>
                  </label>
                </div>
              </div>

              <button 
                onClick={handleNext}
                className="w-full p-3 border border-white hover:bg-white hover:text-black transition-all"
              >
                REVIEW TRANSACTION
              </button>
            </div>
          )}

          {step === "CONFIRM" && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-lg font-bold">CONFIRM {isNFT ? "BID" : "PURCHASE"}</div>
                <div className="text-sm opacity-60 mt-1">
                  Please review your {isNFT ? "bid" : "purchase"} details
                </div>
              </div>

              <div className="border border-white p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="opacity-60">Agent:</span>
                  <span>{drop.agentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Item:</span>
                  <span>{drop.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Handle:</span>
                  <span>@{userHandle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Amount:</span>
                  <span className="font-mono">
                    {isNFT ? bidAmount : drop.price} {drop.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Total + Fees:</span>
                  <span className="font-mono">
                    {((parseFloat(isNFT ? bidAmount : drop.price) * 1.025)).toFixed(3)} {drop.currency}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setStep("PAYMENT")}
                  className="flex-1 p-3 border border-white/30 hover:border-white transition-all"
                >
                  BACK
                </button>
                <button 
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="flex-1 p-3 border border-white bg-white text-black hover:bg-black hover:text-white transition-all disabled:opacity-50"
                >
                  {isProcessing ? "PROCESSING..." : (isNFT ? "PLACE BID" : "CONFIRM PURCHASE")}
                </button>
              </div>
            </div>
          )}

          {step === "SUCCESS" && (
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">✓</div>
              <div className="text-xl font-bold text-green-400">
                {isNFT ? "BID PLACED" : "PURCHASE COMPLETE"}
              </div>
              <div className="text-sm opacity-80">
                {isNFT 
                  ? `Your bid of ${bidAmount} ${drop.currency} has been placed successfully.`
                  : `You have successfully purchased ${drop.title} for ${drop.price} ${drop.currency}.`
                }
              </div>
              <div className="border border-white/30 border-dashed p-4">
                <div className="text-xs opacity-60 mb-2">TRANSACTION ID</div>
                <div className="font-mono text-xs">
                  0x{Math.random().toString(16).substr(2, 8)}...{Math.random().toString(16).substr(2, 4)}
                </div>
              </div>
              <button 
                onClick={handlePurchase}
                className="w-full p-3 border border-white hover:bg-white hover:text-black transition-all"
              >
                CLOSE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}