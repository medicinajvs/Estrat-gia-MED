import React from 'react';
import { Download, X } from 'lucide-react';

const PdfViewerComponent = ({ onClose }) => (
    <div className="w-full h-full flex flex-col bg-white text-gray-900 animate-in fade-in slide-in-from-bottom-4">
        <div className="h-14 bg-gray-100 border-b flex items-center justify-between px-6 shrink-0"><span className="font-bold text-sm text-gray-700">Pdf de slide - MODY.pdf</span><div className="flex items-center gap-2"><button className="p-2 hover:bg-gray-200 rounded text-gray-600"><Download size={18}/></button><button onClick={onClose} className="p-2 hover:bg-red-100 text-red-600 rounded font-bold text-xs flex items-center gap-1"><X size={16}/> Fechar</button></div></div><div className="flex-1 overflow-y-auto bg-gray-50 p-8 flex justify-center"><div className="w-full max-w-3xl bg-white shadow-xl min-h-[800px] p-12 border"><h1 className="text-4xl font-bold text-blue-900 mb-6">Diabetes MODY</h1><div className="h-1 w-20 bg-orange-500 mb-8"></div><p className="text-xl text-gray-700 leading-relaxed mb-6">Maturity-Onset Diabetes of the Young (MODY)</p><div className="grid grid-cols-2 gap-8 mt-12"><div className="h-40 bg-blue-50 rounded"></div><div className="space-y-4"><div className="h-4 bg-gray-200 rounded w-full"></div><div className="h-4 bg-gray-200 rounded w-5/6"></div><div className="h-4 bg-gray-200 rounded w-4/6"></div></div></div></div></div>
    </div>
);
export default PdfViewerComponent;