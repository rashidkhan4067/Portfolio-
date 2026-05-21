import { useState, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, PenTool, Trash2 } from 'lucide-react';
import { testimonials } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import SectionHeading from '../../../components/SectionHeading';

// Aesthetic abstract gradient backgrounds for the author avatars
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #1A73E8, #818CF8)', // M3 Blue to Indigo
  'linear-gradient(135deg, #059669, #34D399)', // Emerald Green
  'linear-gradient(135deg, #7C3AED, #A78BFA)', // Deep Violet
  'linear-gradient(135deg, #EA4335, #FCA5A5)', // Google Red to Light Red
];

function TestimonialCard({ testimonial, index, isAdmin, onDelete }) {
  return (
    <article className={styles.card}>
      {/* Decorative Large Background Quote Watermark */}
      <div className={styles.cardWatermark} aria-hidden="true">
        <Quote size={120} />
      </div>

      {/* Header: Icon & Stars */}
      <header className={styles.cardHeader}>
        <div className={styles.quoteIconContainer}>
          <Quote size={20} aria-hidden="true" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className={styles.stars} aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" className={styles.star} />
            ))}
          </div>
          
          {/* Admin Delete Action Button */}
          {isAdmin && testimonial.isCustom && (
            <button
              onClick={() => onDelete(testimonial.id)}
              className={styles.deleteReviewBtn}
              title="Delete this recommendation (Admin Only)"
              aria-label={`Delete recommendation from ${testimonial.name}`}
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <blockquote className={styles.content}>
        "{testimonial.content}"
      </blockquote>

      {/* Author Footer Block */}
      <footer className={styles.author}>
        <div
          className={styles.authorAvatar}
          style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
          aria-hidden="true"
        >
          {testimonial.name.charAt(0)}
        </div>
        <div className={styles.authorInfo}>
          <h4 className={styles.authorName}>{testimonial.name}</h4>
          <p className={styles.authorRole}>
            {testimonial.role} · <span className={styles.authorCompany}>{testimonial.company}</span>
          </p>
        </div>
      </footer>
    </article>
  );
}

export default function TestimonialsSection() {
  const [testimonialList, setTestimonialList] = useState(() => {
    const saved = localStorage.getItem('user_testimonials');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const parsedWithCustom = parsed.map(p => ({ ...p, isCustom: true }));
        return [...testimonials, ...parsedWithCustom];
      } catch (e) {
        return testimonials;
      }
    }
    return testimonials;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', role: '', company: '', content: '', rating: 5 });
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const scrollContainerRef = useRef(null);

  // Simple, secure admin checking (URL param: ?admin=true or localStorage flag)
  const isAdmin = typeof window !== 'undefined' && (
    window.location.search.includes('admin=true') || 
    localStorage.getItem('admin_moderator') === 'true'
  );

  // Handle active slide index on native scroll swipes or arrow clicks
  const handleScrollEvent = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.clientWidth;
      if (cardWidth > 0) {
        const index = Math.round(scrollPosition / cardWidth);
        setActiveIndex(Math.max(0, Math.min(index, testimonialList.length - 1)));
      }
    }
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth + 16;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingChange = (ratingVal) => {
    setNewReview(prev => ({ ...prev, rating: ratingVal }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newReview.name.trim()) errors.name = 'Full Name is required';
    if (!newReview.role.trim()) errors.role = 'Role/Title is required';
    if (!newReview.company.trim()) errors.company = 'Company is required';
    if (!newReview.content.trim()) errors.content = 'Review content is required';
    else if (newReview.content.trim().length < 15) errors.content = 'Review must be at least 15 characters';
    return errors;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const reviewObj = {
      id: Date.now(), // Unique ID using timestamp
      ...newReview,
      rating: Number(newReview.rating),
      isCustom: true // Explicit custom flag
    };

    const updatedList = [...testimonialList, reviewObj];
    setTestimonialList(updatedList);

    // Save custom reviews separately to localStorage
    const saved = localStorage.getItem('user_testimonials');
    const existingCustom = saved ? JSON.parse(saved) : [];
    localStorage.setItem('user_testimonials', JSON.stringify([...existingCustom, reviewObj]));

    // Reset Form
    setNewReview({ name: '', role: '', company: '', content: '', rating: 5 });
    setFormErrors({});
    setSubmitSuccess(true);

    // Hide success message after 2.5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowReviewForm(false);
    }, 2500);

    // Automatically slide scroller to display the new review card
    setTimeout(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = (container.clientWidth + 16) * (updatedList.length - 1);
        container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        setActiveIndex(updatedList.length - 1);
      }
    }, 300);
  };

  const handleDeleteReview = (reviewId) => {
    const updatedList = testimonialList.filter(t => t.id !== reviewId);
    setTestimonialList(updatedList);

    // Update custom items saved in local storage
    const saved = localStorage.getItem('user_testimonials');
    if (saved) {
      const parsed = JSON.parse(saved);
      const updatedCustom = parsed.filter(t => t.id !== reviewId);
      localStorage.setItem('user_testimonials', JSON.stringify(updatedCustom));
    }

    // Adjust horizontal slide position
    if (activeIndex >= updatedList.length) {
      setActiveIndex(Math.max(0, updatedList.length - 1));
    }
  };

  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        
        {/* Center-aligned Section Header */}
        <SectionHeading
          eyebrow="Social Proof"
          title="What People Say"
          subtitle="Feedback from engineering leaders, product managers, and founders I've had the privilege of working with."
          centered={true}
        />

        {/* Dynamic Admin Moderator Banner */}
        {isAdmin && (
          <div style={{
            background: 'rgba(234, 67, 53, 0.08)',
            border: '1px solid rgba(234, 67, 53, 0.2)',
            color: '#EA4335',
            padding: '0.75rem 1.25rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            🛡️ Admin Moderation Mode Active — Custom user-submitted reviews can now be deleted directly from this panel.
          </div>
        )}

        {/* Modern Slider Component Grid with horizontal swipe and scroll Ref */}
        <div 
          className={styles.grid} 
          ref={scrollContainerRef}
          onScroll={handleScrollEvent}
        >
          {testimonialList.map((t, i) => (
            <TestimonialCard 
              key={t.id} 
              testimonial={t} 
              index={i} 
              isAdmin={isAdmin}
              onDelete={handleDeleteReview}
            />
          ))}
        </div>

        {/* ── ULTIMATE M3 CAROUSEL PAGINATION & CONTROLS ── */}
        <div className={styles.carouselPagination} role="group" aria-label="Testimonial slider navigation">
          
          {/* Previous Button */}
          <button 
            onClick={() => handleScroll('left')} 
            className={styles.paginationArrow}
            disabled={activeIndex === 0}
            aria-label="Scroll left to previous testimonial"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          
          {/* Interactive Slide Dots */}
          <div className={styles.paginationDots} aria-label="Slides active status">
            {testimonialList.map((_, index) => (
              <button 
                key={index} 
                className={`${styles.paginationDot} ${activeIndex === index ? styles.activeDot : ''}`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const scrollAmount = (scrollContainerRef.current.clientWidth + 16) * index;
                    scrollContainerRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={() => handleScroll('right')} 
            className={styles.paginationArrow}
            disabled={activeIndex === testimonialList.length - 1}
            aria-label="Scroll right to next testimonial"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        {/* ── STATEFUL WRITE REVIEW SECTION ── */}
        <div className={styles.reviewSection}>
          {!showReviewForm ? (
            <button 
              className={styles.reviewToggleBtn}
              onClick={() => setShowReviewForm(true)}
              aria-expanded="false"
            >
              <PenTool size={15} />
              <span>Write a Review</span>
            </button>
          ) : (
            <div className={styles.reviewFormCard}>
              <h3>Leave a Professional Recommendation</h3>
              <p>Share your experience working with me. Your feedback will be instantly integrated into the showcase carousel.</p>
              
              {submitSuccess && (
                <div className={styles.successNotice} role="status">
                  Thank you! Your recommendation has been compiled and added to the slider successfully.
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className={styles.formGrid} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label htmlFor="rev-name" className={styles.formLabel}>Full Name</label>
                    <input 
                      id="rev-name"
                      name="name"
                      type="text"
                      placeholder="e.g., Jane Doe"
                      value={newReview.name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                    {formErrors.name && <span className={styles.validationError}>{formErrors.name}</span>}
                  </div>
                  
                  <div className={styles.formField}>
                    <label htmlFor="rev-role" className={styles.formLabel}>Role / Title</label>
                    <input 
                      id="rev-role"
                      name="role"
                      type="text"
                      placeholder="e.g., Engineering Lead"
                      value={newReview.role}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                    {formErrors.role && <span className={styles.validationError}>{formErrors.role}</span>}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label htmlFor="rev-company" className={styles.formLabel}>Company / Institution</label>
                    <input 
                      id="rev-company"
                      name="company"
                      type="text"
                      placeholder="e.g., Google"
                      value={newReview.company}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                    {formErrors.company && <span className={styles.validationError}>{formErrors.company}</span>}
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.formLabel}>Rating Score</label>
                    <div className={styles.ratingSelector} aria-label="Select star rating count">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => handleRatingChange(starVal)}
                          className={`${styles.selectorStar} ${starVal <= newReview.rating ? styles.selectorStarActive : ''}`}
                          aria-label={`Rate ${starVal} out of 5 stars`}
                        >
                          <Star size={18} fill={starVal <= newReview.rating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.formField}>
                  <label htmlFor="rev-content" className={styles.formLabel}>Recommendation Content</label>
                  <textarea 
                    id="rev-content"
                    name="content"
                    rows={4}
                    placeholder="Describe how Rashid contributed to your project, systems architectures, or team success..."
                    value={newReview.content}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                  />
                  {formErrors.content && <span className={styles.validationError}>{formErrors.content}</span>}
                </div>

                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowReviewForm(false);
                      setNewReview({ name: '', role: '', company: '', content: '', rating: 5 });
                      setFormErrors({});
                    }}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={submitSuccess}
                  >
                    Submit Recommendation
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
