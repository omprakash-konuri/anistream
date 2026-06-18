# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_06_18_084500) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "anime_genres", force: :cascade do |t|
    t.bigint "anime_id", null: false
    t.datetime "created_at", null: false
    t.bigint "genre_id", null: false
    t.datetime "updated_at", null: false
    t.index ["anime_id", "genre_id"], name: "index_anime_genres_on_anime_id_and_genre_id", unique: true
    t.index ["anime_id"], name: "index_anime_genres_on_anime_id"
    t.index ["genre_id"], name: "index_anime_genres_on_genre_id"
  end

  create_table "animes", force: :cascade do |t|
    t.string "banner_url"
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "release_year"
    t.string "status"
    t.string "thumbnail_url"
    t.string "title"
    t.datetime "updated_at", null: false
  end

  create_table "episodes", force: :cascade do |t|
    t.bigint "anime_id", null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "duration_seconds"
    t.integer "episode_number"
    t.integer "season_number"
    t.string "thumbnail_url"
    t.string "title"
    t.datetime "updated_at", null: false
    t.string "video_url"
    t.index ["anime_id"], name: "index_episodes_on_anime_id"
  end

  create_table "genres", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.string "name_ja"
    t.string "slug"
    t.datetime "updated_at", null: false
  end

  create_table "profiles", force: :cascade do |t|
    t.boolean "age_restricted"
    t.string "avatar_url"
    t.datetime "created_at", null: false
    t.string "language"
    t.string "name"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "avatar_url"
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "role", default: "user", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "watch_histories", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "episode_id", null: false
    t.bigint "profile_id", null: false
    t.integer "progress_seconds"
    t.datetime "updated_at", null: false
    t.datetime "watched_at"
    t.index ["episode_id"], name: "index_watch_histories_on_episode_id"
    t.index ["profile_id"], name: "index_watch_histories_on_profile_id"
  end

  create_table "watchlists", force: :cascade do |t|
    t.bigint "anime_id", null: false
    t.datetime "created_at", null: false
    t.bigint "profile_id", null: false
    t.datetime "updated_at", null: false
    t.index ["anime_id"], name: "index_watchlists_on_anime_id"
    t.index ["profile_id", "anime_id"], name: "index_watchlists_on_profile_id_and_anime_id", unique: true
    t.index ["profile_id"], name: "index_watchlists_on_profile_id"
  end

  add_foreign_key "anime_genres", "animes"
  add_foreign_key "anime_genres", "genres"
  add_foreign_key "episodes", "animes"
  add_foreign_key "profiles", "users"
  add_foreign_key "watch_histories", "episodes"
  add_foreign_key "watch_histories", "profiles"
  add_foreign_key "watchlists", "animes"
  add_foreign_key "watchlists", "profiles"
end
