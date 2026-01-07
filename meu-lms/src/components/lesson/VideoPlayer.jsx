import React, { useState, useEffect } from 'react';
import { Play, Loader2 } from 'lucide-react';

const VideoPlayer = ({ videoLink }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Reseta o player quando muda o link do vídeo (troca de aula)
    useEffect(() => {
        setIsPlaying(false);
    }, [videoLink]);

    const handlePlay = () => {
        if (!videoLink) {
            alert("Link do vídeo não disponível.");
            return;
        }
        setIsPlaying(true);
        setIsLoading(true);
    };

    // Função para converter link do Drive (view) para Embed (preview)
    const getEmbedUrl = (url) => {
        if (!url) return "";
        // Troca '/view' por '/preview' para permitir o embed
        return url.replace('/view', '/preview').split('?')[0];
    };

    return (
      <div className="w-full h-full flex flex-col relative group bg-black overflow-hidden rounded-2xl">
        
        {isPlaying ? (
            <div className="w-full h-full relative">
                {/* Loader enquanto o iframe carrega */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-0">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                )}
                
                {/* Player Real (Iframe) */}
                <iframe 
                    src={getEmbedUrl(videoLink)} 
                    className="w-full h-full absolute inset-0 z-10" 
                    allow="autoplay; fullscreen" 
                    allowFullScreen
                    onLoad={() => setIsLoading(false)}
                    title="Video Player"
                ></iframe>
            </div>
        ) : (
            // Capa do Vídeo (Thumbnail)
            <div className="w-full h-full flex flex-col items-center justify-center relative cursor-pointer" onClick={handlePlay}>
                {/* Imagem de Fundo (Genérica ou poster) */}
                <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000" 
                    className="w-full h-full object-cover opacity-60 transition-opacity hover:opacity-80" 
                    alt="Capa do vídeo"
                />
                
                {/* Gradiente Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-purple-900/40 pointer-events-none"></div>
                
                {/* Botão Play Grande */}
                <button className="absolute w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 border border-white/30 shadow-2xl group-hover:bg-white/30">
                    <Play fill="white" className="text-white w-8 h-8 ml-1" />
                </button>
            </div>
        )}
      </div>
    );
}

export default VideoPlayer;