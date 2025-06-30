export const moviesData = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "Drama",
    year: 1994,
    averageRating: 9.3,
    poster: "https://images.unsplash.com/photo-1489599731893-c5a4e6ddd5b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    reviews: [
      {
        id: 1,
        userId: 1,
        username: "movie_lover",
        rating: 9.5,
        comment: "An absolute masterpiece! The story of hope and friendship is beautifully told.",
        createdAt: "2023-01-15T10:30:00Z"
      },
      {
        id: 2,
        userId: 2,
        username: "cinema_fan",
        rating: 9.0,
        comment: "Tim Robbins and Morgan Freeman deliver outstanding performances. A timeless classic.",
        createdAt: "2023-02-20T14:15:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: "Crime",
    year: 1972,
    averageRating: 9.2,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    reviews: [
      {
        id: 3,
        userId: 3,
        username: "film_critic",
        rating: 9.5,
        comment: "Marlon Brando's performance is legendary. The perfect crime drama.",
        createdAt: "2023-03-10T16:45:00Z"
      }
    ]
  },
  {
    id: 3,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "Action",
    year: 2008,
    averageRating: 9.0,
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    reviews: [
      {
        id: 4,
        userId: 1,
        username: "movie_lover",
        rating: 9.0,
        comment: "Heath Ledger's Joker is one of the greatest performances in cinema history.",
        createdAt: "2023-04-05T11:20:00Z"
      },
      {
        id: 5,
        userId: 4,
        username: "comic_fan",
        rating: 9.0,
        comment: "Christopher Nolan redefined the superhero genre with this masterpiece.",
        createdAt: "2023-05-12T09:30:00Z"
      }
    ]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genre: "Crime",
    year: 1994,
    averageRating: 8.9,
    poster: "https://images.unsplash.com/photo-1489599731893-c5a4e6ddd5b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    reviews: [
      {
        id: 6,
        userId: 2,
        username: "cinema_fan",
        rating: 8.9,
        comment: "Quentin Tarantino's masterpiece. The dialogue is absolutely brilliant.",
        createdAt: "2023-06-18T13:45:00Z"
      }
    ]
  },
  {
    id: 5,
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    genre: "Drama",
    year: 1999,
    averageRating: 8.8,
    poster: "https://images.unsplash.com/photo-1534809027769-b00ddbafd981?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    reviews: [
      {
        id: 7,
        userId: 3,
        username: "film_critic",
        rating: 8.8,
        comment: "David Fincher's direction and the plot twist make this film unforgettable.",
        createdAt: "2023-07-22T15:10:00Z"
      }
    ]
  },
  {
    id: 6,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: "Sci-Fi",
    year: 2010,
    averageRating: 8.8,
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    reviews: [
      {
        id: 8,
        userId: 1,
        username: "movie_lover",
        rating: 8.8,
        comment: "Mind-bending concept executed perfectly. Christopher Nolan at his best.",
        createdAt: "2023-08-30T12:00:00Z"
      }
    ]
  },
  {
    id: 7,
    title: "The Matrix",
    description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    genre: "Sci-Fi",
    year: 1999,
    averageRating: 8.7,
    reviews: [
      {
        id: 9,
        userId: 4,
        username: "comic_fan",
        rating: 8.7,
        comment: "Revolutionary special effects and a groundbreaking concept.",
        createdAt: "2023-09-14T10:15:00Z"
      }
    ]
  },
  {
    id: 8,
    title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    genre: "Crime",
    year: 1990,
    averageRating: 8.7,
    reviews: [
      {
        id: 10,
        userId: 2,
        username: "cinema_fan",
        rating: 8.7,
        comment: "Martin Scorsese's gangster epic. Ray Liotta is phenomenal.",
        createdAt: "2023-10-08T17:30:00Z"
      }
    ]
  },
  {
    id: 9,
    title: "The Silence of the Lambs",
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    genre: "Thriller",
    year: 1991,
    averageRating: 8.6,
    reviews: [
      {
        id: 11,
        userId: 3,
        username: "film_critic",
        rating: 8.6,
        comment: "Anthony Hopkins as Hannibal Lecter is absolutely terrifying and brilliant.",
        createdAt: "2023-11-25T14:20:00Z"
      }
    ]
  },
  {
    id: 10,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Sci-Fi",
    year: 2014,
    averageRating: 8.6,
    reviews: [
      {
        id: 12,
        userId: 1,
        username: "movie_lover",
        rating: 8.6,
        comment: "Visually stunning and emotionally powerful. The science is fascinating.",
        createdAt: "2023-12-03T11:45:00Z"
      }
    ]
  },
  {
    id: 11,
    title: "The Departed",
    description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    genre: "Crime",
    year: 2006,
    averageRating: 8.5,
    reviews: [
      {
        id: 13,
        userId: 4,
        username: "comic_fan",
        rating: 8.5,
        comment: "Leonardo DiCaprio and Matt Damon deliver intense performances.",
        createdAt: "2024-01-10T16:00:00Z"
      }
    ]
  },
  {
    id: 12,
    title: "The Green Mile",
    description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    genre: "Drama",
    year: 1999,
    averageRating: 8.6,
    reviews: [
      {
        id: 14,
        userId: 2,
        username: "cinema_fan",
        rating: 8.6,
        comment: "Tom Hanks and Michael Clarke Duncan create magic together.",
        createdAt: "2024-02-15T09:15:00Z"
      }
    ]
  },
  {
    id: 13,
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    genre: "Drama",
    year: 1994,
    averageRating: 8.8,
    reviews: [
      {
        id: 15,
        userId: 1,
        username: "movie_lover",
        rating: 8.8,
        comment: "Tom Hanks gives one of the most memorable performances ever.",
        createdAt: "2024-03-20T13:30:00Z"
      }
    ]
  },
  {
    id: 14,
    title: "The Lion King",
    description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    genre: "Animation",
    year: 1994,
    averageRating: 8.5,
    reviews: [
      {
        id: 16,
        userId: 3,
        username: "film_critic",
        rating: 8.5,
        comment: "Disney's masterpiece. The animation and music are timeless.",
        createdAt: "2024-04-05T10:30:00Z"
      }
    ]
  },
  {
    id: 15,
    title: "Gladiator",
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    genre: "Action",
    year: 2000,
    averageRating: 8.5,
    reviews: [
      {
        id: 17,
        userId: 4,
        username: "comic_fan",
        rating: 8.5,
        comment: "Russell Crowe's performance and the epic battle scenes are incredible.",
        createdAt: "2024-05-12T15:45:00Z"
      }
    ]
  }
]; 