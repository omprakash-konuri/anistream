class WatchHistory < ApplicationRecord
  belongs_to :profile
  belongs_to :episode

  validates :progress_seconds, numericality: { greater_than_or_equal_to: 0 }
end
