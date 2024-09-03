export const SelectTravelerList=[
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveler',
        icon:'✈️',
        people: '1 person'

    },

    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveler in tudum',
        icon:'🍻',
        people: '2 people'

    },

    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun lovers',
        icon:'🏠',
        people: '3 to 5 people'

    },

    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seeks',
        icon:'⛵️',
        people: '5 to 10 people'

    },
]

export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon: '💵'
    },

    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon: '💰'
    },

    {
        id:3,
        title:'Luxary',
        desc:'Dont worry about cost',
        icon: '💸'
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location :{Location}, for {NumberOfDays} Days for {TravelrType} with a {Budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Raiting, Time travel each of the location for {NumberOfDays} days with each day plan with best time to visit in JSON format. '