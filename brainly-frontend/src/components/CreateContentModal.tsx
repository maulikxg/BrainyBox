import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Linkdin = "linkdIn",
}

interface Tag {
  id: string;
  text: string;
}

export function CreateContentModal({ open, onClose }: any) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (
      tagInput.trim() &&
      !tags.find((tag) => tag.text.toLowerCase() === tagInput.toLowerCase())
    ) {
      const newTag: Tag = {
        id: Date.now().toString(),
        text: tagInput.trim(),
      };
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  async function addcontent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        title,
        link,
        type,
        tags: tags.map((tag) => tag.text),
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    onClose();
  }

  const getTypeIcon = (contentType: ContentType) => {
    switch (contentType) {
      case ContentType.Youtube:
        return "🎥";
      case ContentType.Twitter:
        return "🐦";
      case ContentType.Linkdin:
        return "💼";
      default:
        return "📄";
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Add Content
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Share something interesting with your small brain 🧠
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
          >
            <CrossIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              ref={titleRef}
              placeholder="Enter a descriptive title..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>

          {/* Link Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              ref={linkRef}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>

          {/* Content Type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Content Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(ContentType).map((contentType) => (
                <button
                  key={contentType}
                  onClick={() => setType(contentType)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    type === contentType
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {getTypeIcon(contentType)}
                  </div>
                  <div className="text-sm font-medium capitalize">
                    {contentType === ContentType.Linkdin
                      ? "LinkedIn"
                      : contentType}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tags Input */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  placeholder="Add tags (press Enter)"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
                <button
                  onClick={addTag}
                  disabled={!tagInput.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Add
                </button>
              </div>

              {/* Tags Display */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {tag.text}
                      <button
                        onClick={() => removeTag(tag.id)}
                        className="ml-1 text-purple-500 hover:text-purple-700 transition-colors duration-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={addcontent}
            className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
          >
            Add Content
          </button>
        </div>
      </div>
    </div>
  );
}
