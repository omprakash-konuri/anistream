class User < ApplicationRecord
  # It automatically hashes password into password_digest, adds authenticate method for login, and validates password presence.
  has_secure_password
  has_many :profiles, dependent: :destroy

  #format validates email format using Ruby's built-in email regex.
  validates :email, presence: true, uniqueness: { case_insensitive: true }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true
  validates :role, inclusion: { in: %w[user admin] }
end