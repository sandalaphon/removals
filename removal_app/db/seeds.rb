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
Branch.create({
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
Branch.create({
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
