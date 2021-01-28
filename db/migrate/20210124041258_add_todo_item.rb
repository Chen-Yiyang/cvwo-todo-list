class AddTodoItem < ActiveRecord::Migration[6.1]
  def change
    add_column  :todo_items, :tags, :string
  end
end
