class CreateEpisodes < ActiveRecord::Migration[8.1]
  def change
    create_table :episodes do |t|
      t.references :anime, null: false, foreign_key: true
      t.integer :season_number
      t.integer :episode_number
      t.string :title
      t.text :description
      t.integer :duration_seconds
      t.string :video_url
      t.string :thumbnail_url

      t.timestamps
    end
  end
end
