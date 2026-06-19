import { useState, useRef, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, PenTool, Trash2 } from 'lucide-react';
import { testimonials } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import SectionHeading from '../../../components/SectionHeading';


function TestimonialCard({ testimonial, isAdmin, onDelete }) {
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
      } catch {
        return testimonials;
      }
    }
    return testimonials;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', role: '', company: '', content: '', rating: 0 });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const scrollContainerRef = useRef(null);

  // Simple, secure admin checking (URL param: ?admin=true or localStorage flag)
  const isAdmin = typeof window !== 'undefined' && (
    window.location.search.includes('admin=true') || 
    localStorage.getItem('admin_moderator') === 'true'
  );

  // Set active slide index using Intersection Observer
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = Array.from(container.children);
          const index = cards.indexOf(entry.target);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: container,
      threshold: 0.6,
    });

    const cards = Array.from(container.children);
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, [testimonialList]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.children;
      const targetIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;
      
      if (targetIndex >= 0 && targetIndex < cards.length) {
        const targetCard = cards[targetIndex];
        const firstCard = cards[0];
        if (targetCard && firstCard) {
          const scrollAmount = targetCard.offsetLeft - firstCard.offsetLeft;
          container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
          });
          setActiveIndex(targetIndex);
        }
      }
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
    if (formErrors.rating) {
      setFormErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newReview.name.trim()) errors.name = 'Full Name is required';
    if (newReview.rating <= 0) errors.rating = 'Please select a Rating Score';
    if (!newReview.content.trim()) errors.content = 'Recommendation Content is required';
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

    setIsSubmitting(true);

    // Simulate API request latency of 800ms
    setTimeout(() => {
      const reviewObj = {
        id: Date.now(),
        ...newReview,
        rating: Number(newReview.rating),
        isCustom: true
      };

      const updatedList = [...testimonialList, reviewObj];
      setTestimonialList(updatedList);

      // Save custom reviews separately to localStorage
      const saved = localStorage.getItem('user_testimonials');
      const existingCustom = saved ? JSON.parse(saved) : [];
      localStorage.setItem('user_testimonials', JSON.stringify([...existingCustom, reviewObj]));

      // Reset Form
      setNewReview({ name: '', role: '', company: '', content: '', rating: 0 });
      setFormErrors({});
      setIsSubmitting(false);
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
          const cards = container.children;
          const lastIndex = updatedList.length - 1;
          if (cards[lastIndex] && cards[0]) {
            const scrollAmount = cards[lastIndex].offsetLeft - cards[0].offsetLeft;
            container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            setActiveIndex(lastIndex);
          }
        }
      }, 300);
    }, 800);
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
          aria-live="polite"
          aria-atomic="false"
          aria-label="Testimonials carousel"
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
                    const container = scrollContainerRef.current;
                    const cards = container.children;
                    if (cards[index] && cards[0]) {
                      const scrollAmount = cards[index].offsetLeft - cards[0].offsetLeft;
                      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                    }
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
                    <label htmlFor="rev-name" className={styles.formLabel}>
                      Full Name <span className={styles.requiredIndicator}>*</span>
                    </label>
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
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.formLabel}>
                      Rating Score <span className={styles.requiredIndicator}>*</span>
                    </label>
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
                    {formErrors.rating && <span className={styles.validationError}>{formErrors.rating}</span>}
                  </div>
                </div>

                <div className={styles.formField}>
                  <label htmlFor="rev-content" className={styles.formLabel}>
                    Recommendation Content <span className={styles.requiredIndicator}>*</span>
                  </label>
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
                      setNewReview({ name: '', role: '', company: '', content: '', rating: 0 });
                      setFormErrors({});
                    }}
                    className={styles.cancelBtn}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting || submitSuccess}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Recommendation'}
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
