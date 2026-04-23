import React, { useState } from "react";
import { Link } from "react-router-dom";
import { reviews } from "../assets/review";
import { perfumes } from "../assets/perfumes";
import { Star, ThumbsUp } from "lucide-react";

const ReviewsPage = () => {
  const [sortBy, setSortBy] = useState("recent");
  const [filterRating, setFilterRating] = useState("all");

  const getPerfume = (id) => perfumes.find((p) => p.id === id);

  // SORT
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful - a.helpful;
      case "rating-high":
        return b.rating - a.rating;
      case "rating-low":
        return a.rating - b.rating;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  // FILTER
  const filteredReviews = sortedReviews.filter((r) => {
    if (filterRating === "all") return true;
    return r.rating === parseInt(filterRating);
  });

  // AVG
  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  // DISTRIBUTION
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    return { rating, count, percentage: (count / reviews.length) * 100 };
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold">Community Reviews</h1>
        <p className="text-gray-500">Real feedback from fragrance enthusiasts</p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Average */}
        <div className="border rounded-xl p-6 text-center">
          <div className="text-5xl font-bold">{averageRating}</div>
          <div className="flex justify-center text-yellow-500 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-500 mt-2">Average from {reviews.length} reviews</p>
        </div>

        {/* Distribution */}
        <div className="border rounded-xl p-6">
          <h3 className="mb-4 font-semibold">Rating Distribution</h3>
          {ratingDistribution.map((d) => (
            <div key={d.rating} className="flex items-center gap-3 mb-2">
              <span className="w-10 flex items-center gap-1">
                {d.rating}
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </span>
              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div className="h-full bg-amber-600" style={{ width: `${d.percentage}%` }} />
              </div>
              <span>{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-4 mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating-high">Highest Rating</option>
          <option value="rating-low">Lowest Rating</option>
        </select>

        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      {/* REVIEWS */}
      <div className="space-y-6">
        {filteredReviews.map((review) => {
          const perfume = getPerfume(review.perfumeId);
          if (!perfume) return null;

          return (
            <div key={review.id} className="border rounded-xl p-6">
              {/* PERFUME */}
              <Link
                to={`/product/${perfume.id}`}
                className="flex items-center gap-4 mb-4 border-b pb-4"
              >
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="text-sm text-gray-500">{perfume.brand}</p>
                  <p className="font-medium">{perfume.name}</p>
                </div>
              </Link>

              {/* USER */}
              <div className="flex justify-between mb-2">
                <div>
                  <p className="font-medium">{review.userName}</p>
                  {review.verified && (
                    <span className="text-xs text-green-600">Verified Purchase</span>
                  )}
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* CONTENT */}
              <h3 className="font-semibold">{review.title}</h3>
              <p className="text-gray-600 mb-3">{review.content}</p>

              {/* TAGS */}
              <div className="flex gap-2 mb-3">
                {review.scentProfile?.map((tag) => (
                  <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between text-sm text-gray-500 items-center">
                <span>{new Date(review.date).toLocaleDateString()}</span>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.helpful}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsPage;