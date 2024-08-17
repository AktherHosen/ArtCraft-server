# ArtCraft

Discover a world of artistic expression with unique handcrafted items, personalized designs, and inspiring artworks. From timeless portraits to vibrant paintings, find the perfect piece that resonates with your style and imagination.

## Features

- Users are permitted to add, edit, and delete their own craft items.
- Users have the capability to add subcategories to organize their craft items more effectively.
- A dedicated page is provided to display items under a specific category.
- Users can access a page that lists all their own added craft items.

## API Reference

#### Get all craft item

```https://artcraft-server.vercel.app/
  GET /allcraft
```

#### Post Craft Item

```https://artcraft-server.vercel.app/
  POST /allcraft
```

#### Get single craft item

```http
  GET /allcraft/${id}
```

#### Get user added craft

```http
  GET /myArtCraft/${email}
```

#### PUT craft item

```http
  PUT /updateCraft/${id}
```

#### Delete craft item

```http
  DELETE /deleteCraft/${id}
```

#### POST ub category

```http
  POST /categories
```

#### Get sub category

```http
  GET /categories
```

#### Get all same sub category items

```http
  GET /sameCategory/${subCategory}
```

## Demo

https://artcraft-server.vercel.app/

## Tech Stack

**Server:** Node, Express, MongoDB, Vercel

## Authors

- [@AktherHosen](http://github.com/AktherHosen/)
