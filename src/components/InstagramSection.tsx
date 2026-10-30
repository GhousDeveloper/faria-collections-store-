import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const InstagramSection: React.FC = () => {
  const { navigateTo } = useStore();
  const [activeModalPost, setActiveModalPost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 uppercase">
          FOLLOW US ON INSTAGRAM
        </h2>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:opacity-80 transition-opacity mt-1"
        >
          <Instagram className="w-4 h-4 text-fuchsia-600" />
          <span>@fariacollections</span>
        </a>
      </div>

      {/* Grid: 8-9 Photos + Tag Us Card */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
        {INSTAGRAM_POSTS.slice(0, 8).map((post) => (
          <div
            key={post.id}
            onClick={() => setActiveModalPost(post)}
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
          >
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover overlay with likes & caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-950/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 text-white">
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-white text-white" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                  {post.comments}
                </span>
              </div>
              <p className="text-[10px] text-white/90 line-clamp-1 mt-1 font-light">
                {post.caption}
              </p>
            </div>
          </div>
        ))}

        {/* 9th Item: TAG US TO GET FEATURED CARD (Matching Reference Image) */}
        <div
          onClick={() => navigateTo('catalog')}
          className="relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-fuchsia-700 via-rose-600 to-pink-600 text-white p-3 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl hover:scale-105 transition-all group col-span-2 sm:col-span-1"
        >
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform">
            <Instagram className="w-5 h-5 text-white" />
          </div>

          <h4 className="font-extrabold text-[11px] sm:text-xs uppercase tracking-wider leading-tight">
            TAG US TO GET FEATURED
          </h4>

          <span className="text-[10px] text-pink-200 font-semibold mt-1">
            #FariaCollections
          </span>

          <span className="mt-2 text-[9px] bg-white text-rose-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
            Join The Club
          </span>
        </div>
      </div>

      {/* Instagram Post Detail Modal */}
      {activeModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="relative aspect-square">
              <img
                src={activeModalPost.image}
                alt={activeModalPost.caption}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalPost(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fuchsia-600 to-rose-500 text-white font-bold text-xs flex items-center justify-center">
                    FC
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{activeModalPost.handle}</h4>
                    <p className="text-[11px] text-gray-400">FARIA Verified Community</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> {activeModalPost.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> {activeModalPost.comments}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{activeModalPost.caption}</p>

              <button
                onClick={() => {
                  setActiveModalPost(null);
                  navigateTo('catalog');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Shop This Look</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
