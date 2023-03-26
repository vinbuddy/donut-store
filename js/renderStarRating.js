function renderStarRating(ratingValue = 5) {
    let stars = [
        `<i class='rating-solid-star bx bxs-star'></i>`,
        `<i class='rating-solid-star bx bxs-star'></i>`,
        `<i class='rating-solid-star bx bxs-star'></i>`,
        `<i class='rating-solid-star bx bxs-star'></i>`,
        `<i class='rating-solid-star bx bxs-star'></i>`,

        `<i class='rating-empty-star bx bxs-star'></i>`,
        `<i class='rating-empty-star bx bxs-star'></i>`,
        `<i class='rating-empty-star bx bxs-star'></i>`,
        `<i class='rating-empty-star bx bxs-star'></i>`,
        `<i class='rating-empty-star bx bxs-star'></i>`,
        
    ]

        // Rating score from 5 -> 10 
        let rating = Math.round(ratingValue / 2)

    
    let result  = stars.slice(5 - rating, 10 - rating)
    return result.join(' ')
}

export default renderStarRating;