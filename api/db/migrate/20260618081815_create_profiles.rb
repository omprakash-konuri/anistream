class CreateProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :avatar_url
      t.boolean :age_restricted
      t.string :language

      t.timestamps
    end
  end
end
