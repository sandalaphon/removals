# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
SurveyObject.destroy_all
Survey.destroy_all  
Employee.destroy_all
Company.destroy_all
Company.create({name: "Hello Joseph", head_office_postcode: "sfdadf"})
Trip.destroy_all
Branch.destroy_all      
    
Branch.create({
name: "Hampshire Branch", 
address: "
Hampshire Branch,
Unit 31,
Woolmer Industrial,
Estate Bordon,
Hampshire
GU35 9QE", 
postcode: "GU35 9QE", 
telephone: "+44 (0)1420 409 861",
branch_code: "ALT",
latlng: '{"lat": 51.110281, "lng": -0.867996}'
})
Branch.create({
name: "South London Branch", 
address: "
South London Branch,
Unit 7, Merton Industrial Estate,
Lee Road,
Merton,
London.
SW19 3WD", 
postcode: "SW19 3WD", 
telephone: "+44 (0)20 3124 1663",
branch_code: "LSW",
latlng: '{"lat": 51.411781, "lng": -0.190189}'

})
Branch.create({
name: "North London Branch", 
address: "
North London Branch,
106 Brent Terrace,
London
NW2 1BZ", 
postcode: "NW2 1BZ", 
telephone: "+44 (0)20 3124 1665",
branch_code: "LNW",
latlng: '{"lat": 51.569392, "lng": -0.223705}'


})
Branch.create({
name: "Sheffield Branch", 
address: "
Sheffield Branch,
1 Oughton Way,
Garter Street,
Sheffield,
South Yorkshire.
S4 7DY", 
postcode: "S4 7DY", 
telephone: "+44 (0)114 358 6166",
branch_code: "SHE",
latlng: '{"lat": 53.398767, "lng": -1.444617}'

})
Branch.create({
name: "Edinburgh Branch", 
address: "
Edinburgh Branch,
7 Granton Pier,
Lochinvar Drive,
Edinburgh
EH5 1HF", 
postcode: "EH5 1HF", 
telephone: "+44 (0)131 278 3057",
branch_code: "EDI",
latlng: '{"lat": 55.985475, "lng": -3.222326}'

})
Branch.create({
name: "Perth Branch", 
address: "
Perth Branch,
Unit 14B,
Riverview Business Park, Friarton Road
Perth
Perthshire
PH2 8DF", 
postcode: "PH2 8DF", 
telephone: "+44 (0)1738 893 082",
branch_code: "PER",
latlng: '{"lat": 56.378122, "lng": -3.427916}'

})
glasgow = Branch.create({
name: "Glasgow Branch", 
address: "
Glasgow Branch,
Unit 17, Cloberfield,
Cloberfield Industrial Estate
Milngavie
Glasgow
G62 7LN", 
postcode: "G62 7LN", 
telephone: "+44 (0)141 305 3102",
branch_code: "GLA",
latlng: '{"lat": 55.950538, "lng": -4.326597}'


})
inverness = Branch.create({
name: "Inverness Branch", 
address: "
Inverness Branch
16 Seafield Road,
Longman Industrial Estate,
Inverness.
IV1 1SG", 
postcode: "IV1 1SG", 
telephone: "+44 (0)1463 649 142",
branch_code: "AVI",
latlng: '{"lat": 57.487678, "lng": -4.214092}'

})


# glasgowBranch = Branch.find(:branch_code=>'GLA')

# puts glasgowBranch
# puts glasgowBranch[0]
# puts glasgowBranch[0].id

# scarlett = Employee.create({
#   name: 'Scarlett Johansen',
#   telephone: '0123456789',
#   branch_manager: true,
#   email: 'hot_lips@a.com'
#   # , branch_id: glasgowBranch[0].id
#   })

inverness.employees.create({
  name: 'Scarlett Johansen',
  telephone: '0123456789',
  branch_manager: true,
  email: 'hot_lips@a.com',
  moveware_employee_code: 'SCJ',
  surveyor: true
  # , branch_id: glasgowBranch[0].id
  })
glasgow.employees.create({
  name: 'Robert Duval',
  telephone: '0123456789',
  branch_manager: false,
  email: 'godfatherlaw@a.com',
  photoUrl: 'https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317__480.png',
  moveware_employee_code: 'RDU'
  # , branch_id: glasgowBranch[0].id
  })
glasgow.employees.create({
  name: 'Ava Gardner',
  telephone: '0123456789',
  branch_manager: false,
  email: 'very_hot_lips@a.com',
  photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1QOvG6ADrE6RVgInLnlJRXLH4dCyfjlsXB1AqOwQihxXaJcZ39g',
  moveware_employee_code: 'AVG'
  # , branch_id: glasgowBranch[0].id
  })
glasgow.employees.create({
  name: 'Robert DeNiro',
  telephone: '0123456789',
  branch_manager: true,
  email: 'taxi@a.com',
  moveware_employee_code: 'RDN',
  surveyor: true

  # , branch_id: glasgowBranch[0].id
  })
inverness.employees.create({
  name: 'Al Pacino',
  telephone: '0123456789',
  branch_manager: true,
  email: 'scarface@a.com',
  moveware_employee_code: 'ALP'
  # , branch_id: glasgowBranch[0].id
  })
inverness.employees.create({
  name: 'Gene Hackman',
  telephone: '0123456789',
  branch_manager: true,
  email: 'sadly_retired@a.com',
  photoUrl: 'https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317__480.png',
  moveware_employee_code: 'GEH',
  surveyor: true
  # , branch_id: glasgowBranch[0].id
  })

# create_table "surveys", force: :cascade do |t|
#   t.integer  "employee_id"
#   t.integer  "branch_id"
#   t.date     "appointment_date"
#   t.time     "appointment_time"
#   t.integer  "moveware_code"
#   t.string   "collection_address"
#   t.string   "delivery_address"
#   t.string   "client_name"
#   t.decimal  "duration"
#   t.string   "branch_code"
#   t.datetime "created_at",             null: false
#   t.datetime "updated_at",             null: false
#   t.string   "moveware_employee_code"
#   t.index ["branch_id"], name: "index_surveys_on_branch_id", using: :btree
#   t.index ["employee_id"], name: "index_surveys_on_employee_id", using: :btree

  # inverness.surveys.create({
  #   appointment_time: '09:00',
  #   appointment_date: '2017-10-09',
  #   moveware_code: '123456',
  #   collection_address: '81/2 East Claremont Street, Edinburgh, EH7 4HU',
  #   collection_postcode: 'EH7 4HU',
  #   client_name: 'Walt Disney',
  #   duration: '1.0',
  #   moveware_employee_code: 'GEH',
  #   branch_code: 'AVI'

  #   })

  # inverness.surveys.create({
  #   appointment_time: '10:00',
  #   appointment_date: '2017-10-08',
  #   moveware_code: '234567',
  #   collection_address: 'iv1 1aa',
  #   collection_postcode: 'iv1 1aa',
  #   client_name: 'Steven Spielberg',
  #   duration: '1.0',
  #   moveware_employee_code: 'GEH',
  #   branch_code: 'AVI'

  #   })

  # inverness.surveys.create({
  #   appointment_time: '17:00',
  #   appointment_date: '2017-10-08',
  #   moveware_code: '345678',
  #   collection_address: '10 Strand Street, Moffat',
  #   collection_postcode: 'IV6 7SL',
  #   client_name: 'Isaac Asimov',
  #   duration: '1.0',
  #   moveware_employee_code: 'GEH',
  #   branch_code: 'AVI'

  #   })

  # inverness.surveys.create({
  #   appointment_time: '11:00',
  #   appointment_date: '2017-10-08',
  #   moveware_code: '456789',
  #   collection_address: 'IV2 5XL',
  #   collection_postcode: 'IV2 5XL',
  #   client_name: 'Spartacus',
  #   duration: '1.0',
  #   moveware_employee_code: 'GEH',
  #   branch_code: 'AVI'

  #   })

  # inverness.surveys.create({
  #   appointment_time: '14:00',
  #   appointment_date: '2017-10-08',
  #   moveware_code: '987654',
  #   collection_address: 'IV3 8LA',
  #   collection_postcode: 'IV3 8LA',
  #   client_name: 'Julius Caesar',
  #   duration: '1.0',
  #   moveware_employee_code: 'GEH',
  #   branch_code: 'AVI'

  #   })



