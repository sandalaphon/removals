# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Company.destroy_all
Company.create({name: "Hello Joseph", head_office_postcode: "sfdadf"})
Trip.destroy_all
Trip.create({moveware_code: 1234567})
Branch.destroy_all
Branch.create({name: "Edinburgh", address: "23 here", postcode: "EH39LB", telephone: "453245234"})