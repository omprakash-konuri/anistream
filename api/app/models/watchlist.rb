class Watchlist < ApplicationRecord
  belongs_to :profile
  belongs_to :anime

  validates :profile_id, uniqueness: { scope: :anime_id }
end
