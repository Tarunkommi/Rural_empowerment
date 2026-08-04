import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

const featuredArticle = {
  id: 'f1',
  title: 'Government Launches Phase 2 of Digital Literacy Drive in Remote Villages',
  excerpt: 'A comprehensive rollout plan aiming to cover 10,000 new Gram Panchayats with specialized training modules focusing heavily on digital payments and cyber safety for senior citizens.',
  category: 'Policy Updates',
  date: 'Aug 01, 2026',
  author: 'Ministry of IT',
  image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200&h=600',
  tags: ['Literacy', 'Phase 2', 'Govt Scheme']
};

const articlesData = [
  { id: 1, title: 'How CSCs are Transforming Rural Banking Operations', excerpt: 'Village Level Entrepreneurs (VLEs) are bringing micro-ATMs to doorsteps, saving rural citizens a full day of travel.', category: 'Success Stories', date: 'Jul 28, 2026', author: 'Priya Sharma', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600&h=400', tags: ['CSC', 'Banking', 'Empowerment'] },
  { id: 2, title: 'Understanding PM-WANI: Public Wi-Fi Demystified', excerpt: 'Everything you need to know about setting up a Public Data Office (PDO) in your village and earning extra income.', category: 'Tech Trends', date: 'Jul 25, 2026', author: 'Rahul Verma', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600&h=400', tags: ['Wi-Fi', 'Infrastructure'] },
  { id: 3, title: '5 Essential Cyber Safety Tips for UPI Users', excerpt: 'As digital payments surge, staying safe from phishing and OTP frauds is more critical than ever. Read our top safety tips.', category: 'Guides', date: 'Jul 20, 2026', author: 'Cyber Cell India', image: 'https://images.unsplash.com/photo-1614064641913-6b832aa6c38b?auto=format&fit=crop&q=80&w=600&h=400', tags: ['Security', 'UPI', 'Finance'] },
  { id: 4, title: 'eGramSwaraj App Updates Bring Transparent Accounting', excerpt: 'The new dashboard feature allows citizens to track the exact progress of local developmental works in real-time.', category: 'E-Governance', date: 'Jul 15, 2026', author: 'Tech Desk', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400', tags: ['App Update', 'Transparency'] },
  { id: 5, title: 'Women Entrepreneurs Leading the E-Commerce Wave', excerpt: 'Handicraft artisans from rural Rajasthan are successfully leveraging digital tools to sell globally.', category: 'Success Stories', date: 'Jul 10, 2026', author: 'Anita Desai', image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&q=80&w=600&h=400', tags: ['Women', 'Business'] },
  { id: 6, title: 'DigiLocker Integration with Local Panchayats', excerpt: 'Obtaining birth, death, and caste certificates is now entirely digital, cutting down bureaucratic delays by 80%.', category: 'E-Governance', date: 'Jul 05, 2026', author: 'Ministry of IT', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600&h=400', tags: ['Certificates', 'DigiLocker'] },
];

const categories = ['All', 'Policy Updates', 'Success Stories', 'Tech Trends', 'Guides', 'E-Governance'];
const popularTags = ['Literacy', 'CSC', 'Banking', 'Wi-Fi', 'Security', 'UPI', 'Business', 'Women'];

const ITEMS_PER_PAGE = 4;

const BlogSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
      const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchTag = !activeTag || article.tags.includes(activeTag);
      return matchSearch && matchCategory && matchTag;
    });
  }, [searchTerm, activeCategory, activeTag]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, activeTag]);

  const isFiltering = searchTerm !== '' || activeCategory !== 'All' || activeTag !== null;

  return (
    <section className="py-16 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content Area (70%) */}
          <div className="w-full lg:w-2/3">
            
            {/* Featured Article (Only show if no filters are active and on page 1) */}
            {!isFiltering && currentPage === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="relative h-[350px] w-full overflow-hidden">
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium mb-4">
                    <span className="flex items-center gap-1"><Calendar size={16} className="text-secondary" /> {featuredArticle.date}</span>
                    <span className="flex items-center gap-1"><User size={16} className="text-secondary" /> {featuredArticle.author}</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-text mb-4 group-hover:text-primary transition-colors">{featuredArticle.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{featuredArticle.excerpt}</p>
                  <button className="inline-flex items-center gap-2 font-bold text-primary group-hover:text-secondary transition-colors">
                    Read Full Story <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* List Header */}
            <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
              <h3 className="text-2xl font-bold text-text">
                {isFiltering ? 'Search Results' : 'Latest News & Articles'}
              </h3>
              <span className="text-sm font-bold text-gray-500">{filteredArticles.length} articles</span>
            </div>

            {/* Articles Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <AnimatePresence mode="popLayout">
                {currentArticles.length > 0 ? (
                  currentArticles.map((article) => (
                    <motion.article 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={article.id} 
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-all group cursor-pointer"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-3">
                          <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
                        </div>
                        <h4 className="text-xl font-bold text-text mb-3 leading-tight group-hover:text-primary transition-colors">{article.title}</h4>
                        <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">{article.excerpt}</p>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                           <span className="text-xs font-bold text-gray-400">By {article.author}</span>
                           <ArrowRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="col-span-full py-20 text-center"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                      <Search size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-text mb-2">No articles found</h4>
                    <p className="text-gray-500">Try adjusting your search or filters.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
            
          </div>

          {/* Sidebar (30%) */}
          <div className="w-full lg:w-1/3 space-y-8">
            
            {/* Search Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-text mb-4">Search</h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-text mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-colors flex justify-between items-center ${activeCategory === cat ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                      {activeCategory === cat && <ChevronRight size={16} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tags Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <Tag size={18} className="text-secondary" /> Popular Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${activeTag === tag ? 'bg-secondary text-white border-secondary' : 'bg-bg text-gray-600 border-gray-200 hover:border-secondary hover:text-secondary'}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Subscribe Widget */}
            <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20 text-center">
              <h4 className="text-lg font-bold text-text mb-2">Subscribe to Newsletter</h4>
              <p className="text-sm text-gray-600 font-medium mb-4">Get the latest updates delivered directly to your inbox.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-lg text-sm outline-none border border-white focus:border-accent" />
                <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">Join</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSection;
