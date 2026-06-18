class Profile < ApplicationRecord
  belongs_to :user
  has_many :watchlists, dependent: :destroy
  has_many :watch_histories, dependent: :destroy

  validates :name, presence: true
  validates :language, inclusion: { in: %w[en ja es fr] }, allow_nil: true
end
