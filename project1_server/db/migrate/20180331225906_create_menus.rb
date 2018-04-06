class CreateMenus < ActiveRecord::Migration[5.1]
  def change
    create_table :menus do |t|
      t.text :name
      t.text :menu_image
      t.text :description
      t.boolean :is_avail
      t.float :price
      t.references :restaurant, foreign_key: true

      t.timestamps
    end
  end
end
