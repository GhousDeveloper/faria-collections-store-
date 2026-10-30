import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success' || !toast.type;
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-start gap-3 bg-white text-gray-900 transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isSuccess 
                ? 'border-emerald-200 shadow-emerald-500/10' 
                : isError 
                ? 'border-rose-200 shadow-rose-500/10' 
                : 'border-fuchsia-200 shadow-fuchsia-500/10'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-rose-500" />
              ) : (
                <Info className="w-5 h-5 text-fuchsia-500" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                {toast.title}
              </h5>
              {toast.description && (
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-700 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
