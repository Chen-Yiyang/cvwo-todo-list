# partial for other jbuilder files for API

# app/views/api/v1/todo_items/_todo_item.json.jbuilder
json.extract! todo_item, :id, :title, :user_id, :complete, :tags, :created_at, :updated_at