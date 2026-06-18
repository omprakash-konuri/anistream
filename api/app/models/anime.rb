class Anime < ApplicationRecord
  has_many :anime_genres
  has_many :genres, through: :anime_genres
  has_many :episodes, dependent: :destroy
end
