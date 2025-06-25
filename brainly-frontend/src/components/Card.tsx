import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { useEffect } from "react";

interface Tag {
  _id: string;
  title: string;
}

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "linkdin";
  tags?: Tag[];
}

export function Card({ title, link, type, tags = [] }: CardProps) {
  useEffect(() => {
    // Reload Twitter widgets when component updates
    if (type === "twitter" && (window as any).twttr) {
      (window as any).twttr.widgets.load();
    }
  }, [type, link]);

  const getTypeIcon = () => {
    switch (type) {
      case "youtube":
        return "🎥";
      case "twitter":
        return "🐦";
      case "linkdin":
        return "💼";
      default:
        return "📄";
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "youtube":
        return "from-red-500 via-red-600 to-red-700";
      case "twitter":
        return "from-blue-400 via-blue-500 to-blue-600";
      case "linkdin":
        return "from-blue-600 via-blue-700 to-blue-800";
      default:
        return "from-gray-500 via-gray-600 to-gray-700";
    }
  };

  const getGlowColor = () => {
    switch (type) {
      case "youtube":
        return "shadow-red-500/20";
      case "twitter":
        return "shadow-blue-500/20";
      case "linkdin":
        return "shadow-blue-600/20";
      default:
        return "shadow-gray-500/20";
    }
  };

  return (
    <div className="group perspective-1000">
      <div
        className={`relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl ${getGlowColor()} border border-white/50 p-7 max-w-96 min-h-72 min-w-96 transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-3 hover:rotate-x-2`}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl pointer-events-none"></div>

        {/* Enhanced gradient header with animated shine */}
        <div
          className={`relative h-3 w-full bg-gradient-to-r ${getTypeColor()} rounded-t-2xl -mx-7 -mt-7 mb-6 overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-start space-x-4 flex-1">
              <div className="text-3xl drop-shadow-sm">{getTypeIcon()}</div>
              <div className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight tracking-tight">
                {title}
              </div>
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
                title="Open link"
              >
                <ShareIcon />
              </a>
              <button
                className="p-3 rounded-full bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-600 hover:text-red-800 transition-all duration-300 shadow-md hover:shadow-lg"
                title="Delete"
              >
                <TrashIcon />
              </button>
            </div>
          </div>

          {/* Enhanced Tags */}
          {tags && tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={tag._id}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 text-purple-800 border border-purple-200/50 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 cursor-pointer hover:scale-105 shadow-sm hover:shadow-md transform hover:-translate-y-0.5`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></span>
                    {tag.title}
                  </span>
                ))}
                {tags.length > 4 && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300/50 shadow-sm">
                    <span className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mr-2"></span>
                    +{tags.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Content Preview */}
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50/50 to-gray-100/50 border border-gray-200/50 shadow-inner">
            {type === "youtube" && (
              <div className="relative aspect-video">
                <iframe
                  className="w-full h-full rounded-2xl"
                  src={link.replace("watch", "embed").replace("?v=", "/")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none"></div>
              </div>
            )}

            {type === "twitter" && (
              <div className="p-1">
                <blockquote
                  className="twitter-tweet"
                  data-theme="light"
                  data-width="100%"
                >
                  <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
              </div>
            )}

            {type === "linkdin" && (
              <div className="p-6 min-h-32 flex items-center justify-center bg-gradient-to-br from-blue-50/80 to-indigo-50/80">
                <div className="text-center space-y-3">
                  <div className="text-4xl filter drop-shadow-sm">💼</div>
                  <p className="text-base font-medium text-gray-700">
                    LinkedIn Post
                  </p>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    View on LinkedIn →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Footer */}
          <div className="mt-6 pt-4 border-t border-gradient-to-r border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTypeColor()}`}
                ></div>
                <span className="text-sm font-semibold text-gray-700 capitalize tracking-wide">
                  {type}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded-full font-medium">
                  Click to open
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
