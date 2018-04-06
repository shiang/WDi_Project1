class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.text :name
      t.text :address
      t.text :profile_image
      t.boolean :is_open
      t.text :phone
      t.text :description

      t.timestamps
    end
  end
end
