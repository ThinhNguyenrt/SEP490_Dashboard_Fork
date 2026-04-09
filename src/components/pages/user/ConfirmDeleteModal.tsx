import { X, AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading = false,
}: ConfirmDeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={isLoading ? undefined : onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-6 top-6 p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-all cursor-pointer disabled:opacity-0"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Warning Icon */}
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
            <AlertTriangle size={32} />
          </div>

          <h3 className="text-xl font-black text-slate-800 mb-2">
            {title}
          </h3>
          
          <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">
            {description}
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3.5 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-2xl transition-all cursor-pointer disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-3.5 bg-red-500 hover:bg-red-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-red-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:bg-red-300"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Xác nhận xóa"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};