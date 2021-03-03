This document contains code for generating the UML diagrams on [yuml.me](https://yuml.me/).

For iteration 1

```
// Cool Class Diagram
// ------------------

// Chain elements like this
[User]++->[Controller]<-++1..[Restaurant]

//restaurant
[Restaurant|-location: string;-priceRange: string;-cuisine: string;]

// Add more detail
[User|-location: string;]

[Controller|+setUserLocation(string); +showRestaurant(): string; +dislikeRestaurant();+likeRestaurant()]
```
