import { useState } from 'react';

const Reviews = ({ courtId, reviews, onAddReview }) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.comment.trim() === '') {
      alert('Please enter a comment');
      return;
    }
    
    const reviewToAdd = {
      id: `new-review-${Date.now()}`,
      user: `User${Math.floor(Math.random() * 1000)}`,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment
    };
    
    onAddReview(courtId, reviewToAdd);
    setNewReview({ rating: 5, comment: '' });
    setShowForm(false);
  };

  // Render stars for review ratings
  const renderStars = (rating) => {
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={`star-${i}`} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    
    return stars;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
        <h2 className="text-2xl font-semibold">Reviews <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md ml-2">{reviews.length}</span></h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${showForm ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white'}`}
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-8 shadow-md border border-gray-100">
          <h4 className="text-lg font-medium mb-4 border-b border-gray-200 pb-2">Your Review</h4>
          
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">Rating</label>
            <div className="flex bg-white p-3 rounded-md border border-gray-200">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="text-3xl focus:outline-none mx-2 first:ml-0 transition-all duration-200 hover:scale-110"
                  aria-label={`${star} stars`}
                >
                  <span className={star <= newReview.rating ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="review-comment" className="block mb-2 text-sm font-medium text-gray-700">Comment</label>
            <textarea
              id="review-comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:border-blue-300 focus:ring-blue-300"
              rows="4"
              placeholder="Share your experience with this tennis court..."
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="bg-blue-50 text-blue-700 rounded-full h-10 w-10 flex items-center justify-center font-semibold mr-3">
                    {review.user.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium block">{review.user}</span>
                    <div className="flex mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md">{review.date}</span>
              </div>
              <blockquote className="text-gray-700 border-l-4 border-gray-100 pl-4 mt-4 line-clamp-3 hover:line-clamp-none transition-all duration-300">
                {review.comment}
              </blockquote>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-100">
          <p className="text-gray-500 mb-4">No reviews yet.</p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Be the first to review this court
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
