# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Anime.create([
  { title: "Naruto", description: "A young ninja seeks recognition.", status: "completed", release_year: 2002},
  { title: "One Piece", description: "Pirates search for the ultimate treasure.", status: "ongoing", release_year: 1999},
  { title: "Attack on Titan", description: "Humanity fights giant humanoids.", status: "completed", release_year: 2013}
])