import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from '../components/Toast';
import { store } from '../services/store';

export const ArticleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, isBengali } = useLanguage();
  const { showToast } = useToast();

  const article = store.getArticleById(id || '');
  const allArticles = store.getArticles().filter(a => a.published && a.id !== id);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#153D32]">Article Not Found</h2>
        <p className="text-sm text-[#252A27]/70">The article you requested could not be located.</p>
        <Link
          to="/nutrition"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.back}</span>
        </Link>
      </div>
    );
  }

  const title = isBengali ? (article.titleBn || article.title) : article.title;
  const summary = isBengali ? (article.summaryBn || article.summary) : article.summary;
  const content = isBengali ? (article.contentBn || article.content) : article.content;
  const readTime = isBengali ? (article.readTimeBn || article.readTime) : article.readTime;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isBengali ? 'আর্টিকেলের লিংক কপি করা হয়েছে!' : 'Article link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Back button link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          to="/nutrition"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#153D32] hover:text-[#0E2922] group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{isBengali ? 'সকল আর্টিকেলে ফিরে যান' : 'Back to Nutrition & Lifestyle'}</span>
        </Link>
      </div>

      {/* Article Header & Cover */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#252A27]/60">
            <span className="px-3 py-1 rounded-full bg-[#153D32]/10 text-[#153D32] font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#153D32] leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-[#252A27]/75 font-serif italic border-l-4 border-[#C6A66A] pl-4 py-1">
            {summary}
          </p>

          {/* Author bar */}
          <div className="flex items-center justify-between border-y border-[#A8BDA5]/30 py-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#153D32] text-[#DFCA9B] flex items-center justify-center font-bold text-sm">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#153D32]">{article.author}</p>
                <p className="text-[11px] text-[#252A27]/60">{article.authorRole}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#A8BDA5]/40 text-xs font-medium text-[#153D32] hover:bg-[#F8F6F0] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isBengali ? 'শেয়ার' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-16/9 rounded-3xl overflow-hidden shadow-lg bg-black/10 border border-[#A8BDA5]/30">
          <img src={article.imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Body Content */}
        <div className="prose prose-stone max-w-none text-[#252A27] text-base leading-relaxed space-y-6 pt-4 font-sans whitespace-pre-line">
          {content}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#A8BDA5]/20">
          <span className="text-xs text-[#252A27]/60 font-semibold">{isBengali ? 'ট্যাগ:' : 'Tags:'}</span>
          {article.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-[11px] bg-white border border-[#A8BDA5]/40 text-[#153D32]">
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Recommended Articles */}
      {allArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-[#A8BDA5]/20 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#153D32]">
            {isBengali ? 'সম্পর্কিত অন্যান্য আর্টিকেল' : 'Explore More Wellness Guides'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArticles.slice(0, 3).map((art) => {
              const aTitle = isBengali ? (art.titleBn || art.title) : art.title;
              return (
                <Link
                  key={art.id}
                  to={`/nutrition/${art.id}`}
                  className="bg-white p-5 rounded-2xl border border-[#A8BDA5]/30 shadow-2xs hover:shadow-md transition-shadow group flex items-start gap-4"
                >
                  <img
                    src={art.imageUrl}
                    alt={aTitle}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#153D32]">
                      {art.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#153D32] group-hover:text-[#C6A66A] transition-colors line-clamp-2">
                      {aTitle}
                    </h4>
                    <span className="text-[11px] text-[#252A27]/60 block">{art.readTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
