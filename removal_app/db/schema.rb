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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170608134811) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "branches", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.string   "postcode"
    t.integer  "telephone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "company_id"
    t.index ["company_id"], name: "index_branches_on_company_id", using: :btree
  end

  create_table "companies", force: :cascade do |t|
    t.string   "name"
    t.string   "head_office_postcode"
    t.string   "head_office_address"
    t.string   "admin_user1"
    t.string   "admin_user2"
    t.string   "admin_user1_email"
    t.string   "admin_user2_email"
    t.integer  "admin_user1_telephone"
    t.integer  "admin_user2_telephone"
    t.string   "billing_contact_name"
    t.integer  "billing_contact_telephone"
    t.string   "billing_contact_email"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "employees", force: :cascade do |t|
    t.string   "name"
    t.integer  "telephone"
    t.boolean  "driver"
    t.boolean  "porter"
    t.boolean  "ops_manager"
    t.boolean  "surveyor"
    t.boolean  "branch_manager"
    t.boolean  "admin"
    t.integer  "branch_id"
    t.boolean  "software_user"
    t.string   "email"
    t.string   "job_title"
    t.string   "driver_licence"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["branch_id"], name: "index_employees_on_branch_id", using: :btree
  end

  create_table "jobs", force: :cascade do |t|
    t.integer  "truck_id"
    t.integer  "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_jobs_on_trip_id", using: :btree
    t.index ["truck_id"], name: "index_jobs_on_truck_id", using: :btree
  end

  create_table "trips", force: :cascade do |t|
    t.datetime "date"
    t.integer  "branch_id"
    t.integer  "moveware_code"
    t.string   "client_name"
    t.string   "client_address"
    t.string   "client_postcode"
    t.string   "collection_postcode"
    t.string   "collection_address"
    t.string   "delivery_address"
    t.string   "delivery_postcode"
    t.boolean  "allocated"
    t.boolean  "hourly"
    t.datetime "arrival_time"
    t.integer  "men_requested"
    t.integer  "volume"
    t.text     "notes"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "kind"
    t.jsonb    "delivery_latlng",     default: "{}"
    t.jsonb    "collection_latlng",   default: "{}"
    t.index ["branch_id"], name: "index_trips_on_branch_id", using: :btree
  end

  create_table "trucks", force: :cascade do |t|
    t.string   "modeltype"
    t.integer  "maxvolume"
    t.integer  "branch_id"
    t.string   "registration_number"
    t.boolean  "sidedoors"
    t.boolean  "tail_lift"
    t.date     "service_due"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.index ["branch_id"], name: "index_trucks_on_branch_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.integer  "company_id"
    t.boolean  "admin",                  default: false
    t.index ["company_id"], name: "index_users_on_company_id", using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "branches", "companies"
  add_foreign_key "employees", "branches"
  add_foreign_key "jobs", "trips"
  add_foreign_key "jobs", "trucks"
  add_foreign_key "trips", "branches"
  add_foreign_key "trucks", "branches"
  add_foreign_key "users", "companies"
end
