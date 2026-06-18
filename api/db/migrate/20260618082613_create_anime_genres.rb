class CreateAnimeGenres < ActiveRecord::Migration[8.1]
  def change
    create_table :anime_genres do |t|
      t.references :anime, null: false, foreign_key: true
      t.references :genre, null: false, foreign_key: true

      t.timestamps
    end
    
    add_index :anime_genres, [:anime_id, :genre_id], unique: true
  end
end
