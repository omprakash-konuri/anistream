class CreateWatchHistories < ActiveRecord::Migration[8.1]
  def change
    create_table :watch_histories do |t|
      t.references :profile, null: false, foreign_key: true
      t.references :episode, null: false, foreign_key: true
      t.integer :progress_seconds
      t.datetime :watched_at

      t.timestamps
    end
  end
end
