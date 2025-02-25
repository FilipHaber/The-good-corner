import "reflect-metadata";
import express from "express";
import cors from "cors";
import { Like } from "typeorm";
import { dataSourceGoodCorner } from "./config/db";
import { Ad } from "./entities/Ad";
import { validate } from "class-validator";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World test reload");
});

app.get("/ads", async (req, res) => {
  let ads: Ad[];
  if (req.query.category) {
    ads = await Ad.find({
      where: {
        category: { title: req.query.category as string },
      },
      relations: { category: true, tags: true },
    });
  } else {
    ads = await Ad.find({ relations: { category: true, tags: true } });
  }
  res.send(ads);
});

app.get("/ad/:id", async (req, res) => {
  try {
    const result = await Ad.findOneByOrFail({ id: parseInt(req.params.id) });
    res.send(result);
  } catch (err) {
    console.log("err", err);
    res.status(400).send(err);
  }
});

app.post("/ads", async (req, res) => {
  console.log("request body", req.body);
  const adToSave = new Ad();
  adToSave.createdAt = req.body.createdAt;
  adToSave.description = req.body.description;
  adToSave.location = req.body.location;
  adToSave.owner = req.body.owner;
  adToSave.picture = req.body.picture;
  adToSave.price = req.body.price;
  adToSave.title = req.body.title;
  adToSave.category = req.body.category ? req.body.category : 1;
  if (req.body.tags) {
    adToSave.tags = req.body.tags;
  }

  const errors = await validate(adToSave);
  if (errors.length > 0) {
    console.log(errors);
    res.status(400).send("Invalid input");
  } else {
    const result = await adToSave.save();
    res.send(result);
  }
});

app.delete("/ad/:id", async (req, res) => {
  const result = await Ad.delete(req.params.id);
  console.log(result);
  res.send("Ad has been deleted");
});

app.put("/ads/:id", async (req, res) => {
  try {
    let adToUpdate = await Ad.findOneByOrFail({ id: parseInt(req.params.id) });
    adToUpdate = Object.assign(adToUpdate, req.body);
    const result = await adToUpdate.save();
    console.log(result);
    res.send("Ad has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid request");
  }
});

app.get("/categories", async (req, res) => {
  let categories: Category[];
  if (req.query.title) {
    categories = await Category.find({
      where: {
        title: Like(`${req.query.title as string}%`),
      },
    });
  } else {
    categories = await Category.find();
  }
  res.send(categories);
});

app.get("/ads/category/:keyword", async (req, res) => {
  const { keyword } = req.params;
  try {
    const ads = await Ad.find({
      where: {
        category: { title: keyword },
      },
      relations: { category: true, tags: true },
    });
    res.send(ads);
  } catch (error) {
    console.error("Error while trying to get ads:", error);
    res.status(500).send("Server error");
  }
});

app.post("/categories", async (req, res) => {
  const categoryToSave = new Category();
  categoryToSave.title = req.body.title;
  await categoryToSave.save();
  res.send("Category has been saved");
});

app.put("/categories/:id", async (req, res) => {
  try {
    let categoryToUpdate = await Category.findOneByOrFail({
      id: parseInt(req.params.id),
    });
    categoryToUpdate = Object.assign(categoryToUpdate, req.body);
    const result = await categoryToUpdate.save();
    console.log(result);
    res.send("Category has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid request");
  }
});

app.delete("/categories/:id", async (req, res) => {
  const result = await Category.delete(req.params.id);
  console.log(result);
  res.send("Category has been deleted");
});

app.get("/tags", async (_req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

app.post("/tags", async (req, res) => {
  const tagToSave = new Tag();
  tagToSave.name = req.body.name;
  await tagToSave.save();
  res.send("Tag has been created");
});

app.put("/tags/:id", async (req, res) => {
  try {
    let tagToUpdate = await Tag.findOneByOrFail({
      id: parseInt(req.params.id),
    });
    tagToUpdate = Object.assign(tagToUpdate, req.body);
    const result = await tagToUpdate.save();
    console.log(result);
    res.send("Tag has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid request");
  }
});

app.delete("/tags/:id", async (req, res) => {
  const result = await Tag.delete(req.params.id);
  console.log(result);
  res.send("Tag has been deleted");
});

app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`);
});
