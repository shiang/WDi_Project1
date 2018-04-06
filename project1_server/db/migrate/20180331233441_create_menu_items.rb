class CreateMenuItems < ActiveRecord::Migration[5.1]
  def change
    create_table :menu_items do |t|
      t.text :name
      t.text :item_image
      t.text :description
      t.boolean :is_avail
      t.float :price
      t.references :menu, foreign_key: true

      t.timestamps
    end
  end
end
