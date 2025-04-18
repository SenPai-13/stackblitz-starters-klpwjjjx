const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const app = express();
const port = 3000;
app.use(cors());
let db;

(async () => {
  db = await open({
    filename: './BD4_Assignment1/database.sqlite',
    driver: sqlite3.Database,
  });
})();

// BD4_Assignment1 Exercise 1: Get All Restaurants
async function fetchRestaurants() {
  let query = 'SELECT * FROM restaurants';
  let response = await db.all(query, []);
  return { restaurants: response };
}
app.get('/restuarants', async (req, res) => {
  try {
    let result = await fetchRestaurants();
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// BD4_Assignment1 Exercise 2: Get Restaurant by ID
async function fetchRestaurantsById(id) {
  let query = 'SELECT * FROM restaurants WHERE id =?';
  let response = await db.all(query, id);
  return { restaurants: response };
}
app.get('/restaurants/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchRestaurantsById(id);
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// BD4_Assignment1 Exercise 3: Get Restaurants by Cuisine
async function fetchRestaurantsByCuisine(cuisine) {
  let query = 'SELECT * FROM restaurants WHERE cuisine =?';
  let response = await db.all(query, cuisine);
  return { restaurants: response };
}
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    let cuisine = req.params.cuisine;
    let result = await fetchRestaurantsByCuisine(cuisine);
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// BD4_Assignment1 Exercise 4: Get Restaurants by Filter
async function fetchRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    'SELECT * FROM restaurants WHERE isVeg =? AND hasOutdoorSeating =? AND isLuxury =?';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}
app.get('/restaurants/filter', async (req, res) => {
  try {
    let isVeg = req.query.isVeg;
    let hasOutdoorSeating = req.query.hasOutdoorSeating;
    let isLuxury = req.query.isLuxury;
    let result = await fetchRestaurantsByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// BD4_Assignment1 Exercise 5: Get Restaurants Sorted by Rating
async function fetchRestaurantsByRatingDesc() {
  let query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { restaurants: response };
}
app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchRestaurantsByRatingDesc();
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// BD4_Assignment1 Exercise 6: Get All Dishes
async function fetchDishes() {
  let query = 'SELECT * FROM dishes';
  let response = await db.all(query, []);
  return { dishes: response };
}
app.get('/dishes', async (req, res) => {
  try {
    let result = await fetchDishes();
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// BD4_Assignment1 Exercise 7: Get Dish by ID
async function fetchDishesById(id) {
  let query = 'SELECT * FROM dishes WHERE id =?';
  let response = await db.all(query, id);
  return { dishes: response };
}
app.get('/dishes/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchDishesById(id);
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// BD4_Assignment1 Exercise 8: Get Dishes by Filter
async function fetchDishesByFilter(isVeg) {
  let query = 'SELECT * FROM dishes WHERE isVeg =?';
  let response = await db.all(query, isVeg);
  return { dishes: response };
}
app.get('/dishes/filter', async (req, res) => {
  try {
    let isVeg = req.query.isVeg;
    let result = await fetchDishesByFilter(isVeg);
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// BD4_Assignment1 Exercise 9: Get Dishes Sorted by Price
async function fetchDishesByPriceAsc() {
  let query = 'SELECT * FROM dishes ORDER BY price ASC';
  let response = await db.all(query, []);
  return { dishes: response };
}
app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let result = await fetchDishesByPriceAsc();
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
