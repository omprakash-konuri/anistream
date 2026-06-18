class Episode < ApplicationRecord
  belongs_to :anime
  has_many :watch_histories, dependent: :destroy

  validates :title, presence: true
  validates :season_number, presence: true, numericality: { greater_than: 0 }
  validates :episode_number, presence: true, numericality: { greater_than: 0 }
  validates :video_url, presence: true
end