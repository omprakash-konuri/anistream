# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# Anime.create([
#   { title: "Naruto", description: "A young ninja seeks recognition.", status: "completed", release_year: 2002},
#   { title: "One Piece", description: "Pirates search for the ultimate treasure.", status: "ongoing", release_year: 1999},
#   { title: "Attack on Titan", description: "Humanity fights giant humanoids.", status: "completed", release_year: 2013}
# ])

# Clear existing data
Anime.destroy_all

# Create anime
naruto = Anime.create!(
  title: "Naruto",
  description: "A young ninja seeks recognition from his peers and dreams of becoming the Hokage.",
  status: "completed",
  release_year: 2002
)

one_piece = Anime.create!(
  title: "One Piece",
  description: "Pirates search for the ultimate treasure to become the King of the Pirates.",
  status: "ongoing",
  release_year: 1999
)

aot = Anime.create!(
  title: "Attack on Titan",
  description: "Humanity fights for survival against giant humanoids called Titans.",
  status: "completed",
  release_year: 2013
)

# Create episodes for Naruto
Episode.create!([
  { anime: naruto, season_number: 1, episode_number: 1, title: "Enter: Naruto Uzumaki!", description: "Naruto is introduced as a troublemaker.", duration_seconds: 1440, video_url: "https://example.com/naruto-s1e1.mp4" },
  { anime: naruto, season_number: 1, episode_number: 2, title: "My Name is Konohamaru!", description: "Naruto meets the Hokage's grandson.", duration_seconds: 1440, video_url: "https://example.com/naruto-s1e2.mp4" },
  { anime: naruto, season_number: 1, episode_number: 3, title: "Sasuke and Sakura: Friends or Foes?", description: "Team 7 is formed.", duration_seconds: 1440, video_url: "https://example.com/naruto-s1e3.mp4" }
])

# Create episodes for One Piece
Episode.create!([
  { anime: one_piece, season_number: 1, episode_number: 1, title: "I'm Luffy! The Man Who Will Become King of the Pirates!", description: "Luffy sets out to sea.", duration_seconds: 1440, video_url: "https://example.com/onepiece-s1e1.mp4" },
  { anime: one_piece, season_number: 1, episode_number: 2, title: "The Great Swordsman Appears!", description: "Luffy meets Zoro in prison.", duration_seconds: 1440, video_url: "https://example.com/onepiece-s1e2.mp4" }
])

puts "Seeded #{Anime.count} anime and #{Episode.count} episodes"