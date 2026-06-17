class CreateAnimes < ActiveRecord::Migration[8.1]
  def change
    create_table :animes do |t|
      t.string :title
      t.text :description
      t.string :status
      t.integer :release_year
      t.string :thumbnail_url
      t.string :banner_url

      t.timestamps
    end
  end
end
