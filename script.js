var placeId = "ChIJV4Bp3QtMV0ARzib9A8aC8MM"
var current_review = 4;

const reviews = [
   {name: "Andrew H.", rating: 5, date: "2 years ago", source: "Google"},
   {name: "Khamar S", rating: 5, date: "2 years ago", source: "Google"},
   {name: "Colleen D.", rating: 5, date: "1 year ago", source: "Google"},
   {name: "Jaff21 Y.", rating: 5, date: "2 years ago", source: "Google"},
   {name: "Glenn A.", rating: 4, date: "2 years ago", source: "Google"},
   {name: "Moises B.", rating: 5, date: "1 year ago", source: "Google"},
   {name: "Alisha G.", rating: 5, date: "3 years ago", source: "Google"},
   {name: "Fauzia M.", rating: 5, date: "2 years ago", source: "Google"},
   {name: "Steeny", rating: 5, date: "2 years ago", source: "Google"},
]

function init() {
   service = new google.maps.places
      .PlacesService(document.getElementById('main')
                     .appendChild(document.createElement('div')));
   
   var request = {
      placeId,
      fields: ['name', 'rating', 'user_ratings_total']
   };

   service.getDetails(request, callback);

   function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
         setupAverages(place.rating, place.user_ratings_total);
      }
    }

    generateReview();

}

function setupAverages(rating, num_reviews) {
   var average_num_reviews = document.getElementById('average-num-reviews');
   var average_stars = document.getElementById('average-stars');

   average_num_reviews.innerHTML = num_reviews + ' reviews'

   var stars = ``;
   var rating_copy = Math.round(rating);
   for (var i = 0; i < rating_copy; i++) {
      stars += `<i class="fas fa-star average-star"></i>`;
   }

   while (rating_copy < 5) {
      stars += `<i class="far fa-star average-star"></i>`;
      rating_copy++;
   }
   
   average_stars.innerHTML = stars;
}

function generateReview() {
      var reviews_div = document.getElementById('reviews');
      var div = document.createElement('div');
      div.setAttribute('class', 'single-review');
  
      var stars = ``;
      for (var i = 0; i < reviews[current_review].rating; i++) {
         stars += `<i class="fas fa-star"></i>`;
      }

      var rating = reviews[current_review].rating;
      while (rating < 5) {
         stars += `<i class="far fa-star"></i>`;
         rating++;
      }

      var div_html = `
         <div class="single-review">
            <div class="stars">
               ${stars}
            </div>
            <div class="review-info">
                  <div class="review-name">
                     - ${reviews[current_review].name}
                  </div>
                  <div class="review-date">
                     ${reviews[current_review].date}
                  </div>
            </div>
         </div>
     `;

     reviews_div.innerHTML = div_html;
}

function nextReview() {
   current_review++;
   if (current_review == reviews.length) {
      current_review = 0;
   }
   generateReview();
}

function previousReview() {
   current_review--;
   if (current_review < 0) {
      current_review = reviews.length - 1;
   }
   generateReview();
}

  init();