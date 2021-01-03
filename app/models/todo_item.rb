class TodoItem < ApplicationRecord
  default_scope { order(created_at: :desc) } # makes sure newest todoItem appears first
  belongs_to :user
  validates :title, presence: true
end
