# Movie Review Frontend

A beautiful and elegant movie review application built with React, featuring a modern UI design and smooth user experience.

## Features

### 🎬 Top Movies Page
- Displays the top 10 highest-rated movies
- Elegant card layout with hover effects
- Rank badges for each movie
- Beautiful gradient background

### 🔍 Search Movies Page
- Real-time search functionality
- Search by title, description, or genre
- Dynamic filtering of movie collection
- Results counter
- Elegant search bar with clear button

### ➕ Add Review Page
- Modern form design with validation
- Real-time rating preview
- Success/error notifications
- Beautiful gradient background

### 🎨 Elegant UI Design
- Modern gradient backgrounds
- Smooth hover animations
- Responsive design for all devices
- Bootstrap Icons integration
- Custom CSS animations
- Professional color scheme

## Technology Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **React Bootstrap** - UI components
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library
- **Date-fns** - Date formatting
- **Vite** - Build tool

## Local Movie Data

The application uses a local movie dataset with 15 popular movies including:
- The Shawshank Redemption
- The Godfather
- The Dark Knight
- Pulp Fiction
- And many more...

Each movie includes:
- Title and description
- Rating (1-10 scale)
- Genre and year
- Creation date

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Pages

### Home Page (`/`)
- Shows top 10 movies sorted by rating
- Each movie has a rank badge
- Beautiful hero section

### Search Page (`/search`)
- Search through all movies
- Real-time filtering
- Results counter
- Empty state handling

### Add Review Page (`/add`)
- Form to add new movie reviews
- Input validation
- Success/error feedback

## Design Features

- **Gradient Backgrounds**: Each page has a unique gradient background
- **Card Hover Effects**: Smooth animations on movie cards
- **Responsive Layout**: Works perfectly on mobile, tablet, and desktop
- **Modern Typography**: Clean and readable fonts
- **Color-coded Ratings**: Different colors for different rating ranges
- **Smooth Transitions**: All interactions have smooth animations

## Customization

The application is highly customizable:
- Movie data can be modified in `src/data/movies.js`
- Colors and gradients can be adjusted in `src/App.css`
- Component styling can be customized in individual component files

## Future Enhancements

- Backend integration for persistent data
- User authentication
- Movie image support
- Advanced filtering options
- User reviews and comments
- Movie recommendations
