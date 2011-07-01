# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110630033625) do

  create_table "box_score_entries", :force => true do |t|
    t.integer  "espn_id"
    t.string   "fname"
    t.string   "lname"
    t.string   "team"
    t.string   "pos"
    t.integer  "min"
    t.integer  "fgm"
    t.integer  "fga"
    t.integer  "tpm"
    t.integer  "tpa"
    t.integer  "ftm"
    t.integer  "fta"
    t.integer  "oreb"
    t.integer  "dreb"
    t.integer  "reb"
    t.integer  "ast"
    t.integer  "stl"
    t.integer  "blk"
    t.integer  "to"
    t.integer  "pf"
    t.string   "plusminus"
    t.integer  "pts"
    t.boolean  "verified"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
