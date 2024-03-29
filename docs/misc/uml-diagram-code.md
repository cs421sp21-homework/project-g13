This document contains code for generating the UML diagrams on [yuml.me](https://yuml.me/).

For iteration 1:

```
[User]++->[Controller]<-++1..[Restaurant]

//restaurant
[Restaurant|-location: string;-priceRange: string;-cuisine: string;]

// Add more detail
[User|-location: string;]

[Controller|+setUserLocation(string); +showRestaurant(): string; +dislikeRestaurant();+likeRestaurant()]
```

For iteration 2:
```
[Card (frontend)|+render()|+propTypes]

[ListRestaurant (frontend)|+render(); +nextRestaurant()|+propTypes; +state: JS Object]

[App (frontend)|+render(); +submit(); +myChangeHandler(event)|+state: JSObject]

[Api (frontend)|+getRestaurants(location: string); +getUserInfo(userId: int); +getGroupInfo(groupId: group); +login(); +addGroupMember(userId: int)]

[CreateGroup (frontend)| +render(); +submit()]

[User (frontend)| +render()]

[Group (frontend)| +render(); +addMember()]

[My Groups (frontend)|+render()]

[StartSwipingEvent (frontend)|+render()]

[Server|static: -getHerokuAssignedPort(); static: searchYelpV3(BusinessSearchParameters search): BusinessSearchResponse; static: +main()]

[Restaurant|-name: string; -location: string; -priceRange: string; -categories: string array; -operatingHours: string; -rating: int; -image: string]

[(interface) YelpApi|+searchBusiness(): BusinessSearchResponse|-API_HOST: string; -BUSINESSES_SEARCH_ENDPOINT: string; -AUTHORIZATION: string; -BEARER: string]

[YelpService|+searchBusiness(BusinessSearchParameters parameters): BusinessSearchResponse| +getHttpEntity(): HttpEntity: string; -getBusinessesSearchEndpointUriWithParameters(BusinessSearchParameters parameters): string; -getBusinessesSearchEndpointUri(): string; -getBaseUri(): string: -getBearerToken(): string|-token: string; -restTemplate: RestTemplate]

[BusinessSearchParameters|+getParameters(): string|-term: string; -location: string; -latitude: Double; -longitude: Double]

[BusinessSearch| -id: string; -alias: string; -name: string; -image_url: string; -is_closed: Boolean; -url: string; -review_count: Integer; -categories: List Category; rating: Double; -coordinates: Coordinates; -transactions: List Transactions;-price: string;-location: Location; -phone: string; -display_phone: string; -distance: Double]

[Category| -alias: string; -title: string]

[Center| -latitude: Double; -longitude: Double]

[Coordinates| -latitude: Do uble; -longitude: Double]

[Location|-address1: string; -address2: string; -address3: string; city: string; -zip_code: string; -country: string; -state: string; display_address: List String]

[Region| -center: Center]

[Transactions (enum)|+static transactions(value: string): Transactions |value: string]

[BusinessSearchResponse|-total: int; -business: List BusinessSearch; -region: Region]

[User|-location: string; -id: int; -username: string]

[Group|-id: int; -name: string; -members: List User]

[(interface) UserDao|+create(user: User); +read(id: int): User; +update(user: User): User; +delete(user: User)]

[(interface) GroupDao|+create(group: Group); +read(id: int): Group; +update(group: Group): Group; +delete(group: Group): Group; +addMember(group: Group, user: User): int; +removeMember(group: Group, user: User): int]

[Response|-id: int; -eventId: int; -restaurantId: string; -userId: int; -user: User; -like: bool]

[SwipingEvent|-id: int; -type: (group or individual); -userOrGroupId: int; -user: User; -group: Group; -responses: List Response; hostId: int; -host: User; -location: string; -restaurantIdsSelected: List string; -date: string; -matchRestaurantId: int; -matchFound: bool]

[(interface) ResponseDao|+create(response: Response); +read(id: int): Response; +update(response: Response): Response; +delete(response: Response): Response]

[(interface) SwipingEventDao|+create(swipingEvent: SwipingEvent); +read(id: int): SwipingEvent; +update(swipingEvent: SwipingEvent): SwipingEvent; +delete(swipingEvent: SwipingEvent): SwipingEvent]

[SwipingEventController|+createNewGroupEvent(host: id, group: id, location: string); +getNextRestaurantForUser(user: id); +receiveResponse(response: Response)|-swipingEventdao: SwipingEventDao; responseDao: ResponseDao]


//relationships

[SwipingEventController]->[Response]
[SwipingEventController]->[(interface) SwipingEventDao]
[SwipingEventController]->[(interface) ResponseDao]

[(interface) ResponseDao]->[Response]

[(interface) SwipingEventDao]->[SwipingEvent]

[SwipingEvent]->[Response]->[User]

[SwipingEvent]->[User]

[SwipingEvent]->[Group]

[Group]->[User]

[(interface) UserDao]->[User]

[(interface) GroupDao]->[Group]

[(interface) GroupDao]->[User]

[BusinessSearchResponse]->[Region]->[Center]

[BusinessSearch]->[Category]

[BusinessSearch]->[Transactions (enum)]

[BusinessSearch]->[Coordinates]

[YelpService]->[BusinessSearchParameters]

[YelpService]->[BusinessSearchResponse]

[(interface) YelpApi]->[BusinessSearchResponse]

[Server]->[BusinessSearchResponse]
```
For iteration 3:
```
[Group|-restaurantVotes: List RestaurantVote;]

[PermFilters|-vegan: boolean; -glutenFree: boolean; -seafoodAllergy: boolean]

[(interface) GroupDao|+likeRestaurant(group: Group, restaurant: Restaurant); +dislikeRestaurant(group: Group, restaurant: Restaurant); +recommendRestaurants(group: Group, limit: int): List Restaurant]

[RestaurantVote|-restaurant: Restaurant; -yesVotes: int; -noVotes: int]

[User|-permFilters: PermFilters;]

//relationships
[Group]->[User]
[Group]->[RestaurantVote]
[(interface) GroupDao]->[Group]
[User]->[PermFilters]






