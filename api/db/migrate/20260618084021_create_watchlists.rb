class CreateWatchlists < ActiveRecord::Migration[8.1]
  def change
    create_table :watchlists do |t|
      t.references :profile, null: false, foreign_key: true
      t.references :anime, null: false, foreign_key: true

      t.timestamps
    end
    add_index :watchlists, [:profile_id, :anime_id], unique: true
  end
end
