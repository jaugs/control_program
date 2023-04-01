#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Animal = require("./models/animal");
  const AnimalInstance = require("./models/animalinstance");
  
  const animals = [];
  const animalinstances = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    //await createGenres();
    //await createAuthors();
    await createAnimals();
    await createAnimalInstances();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
//   async function genreCreate(name) {
//     const genre = new Genre({ name: name });
//     await genre.save();
//     genres.push(genre);
//     console.log(`Added genre: ${name}`);
//   }
  
//   async function authorCreate(first_name, family_name, d_birth, d_death) {
//     authordetail = { first_name: first_name, family_name: family_name };
//     if (d_birth != false) authordetail.date_of_birth = d_birth;
//     if (d_death != false) authordetail.date_of_death = d_death;
  
//     const author = new Author(authordetail);
  
//     await author.save();
//     authors.push(author);
//     console.log(`Added author: ${first_name} ${family_name}`);
//   }
  
  async function animalCreate(name, scientificname, current_version, description, diet, synth_date) {
    animaldetail = {
      name: name,
      scientificname: scientificname,
      current_version: current_version,
      description: description,
      diet: diet,
      synth_date: synth_date,
    };
  
    const animal = new Animal(animaldetail);
    await animal.save();
    animals.push(animal);
    console.log(`Added animal`);
  }
  
  async function animalInstanceCreate(animal, imprint, version, current_height, current_weight, birth_date, death_date) {
    animalinstancedetail = {
        animal: animal,
      imprint: imprint,
      version: version,
      current_height: current_height,
      current_weight: current_weight,
      birth_date: birth_date,
    };
    if (death_date != false) animalinstancedetail.death_date = death_date;
  
    const animalinstance = new AnimalInstance(animalinstancedetail);
    await animalinstance.save();
    animalinstances.push(animalinstance);
    console.log(`Added animalinstance: ${imprint}`);
  }
  
//   async function createGenres() {
//     console.log("Adding genres");
//     await Promise.all([
//       genreCreate("Fantasy"),
//       genreCreate("Science Fiction"),
//       genreCreate("French Poetry"),
//     ]);
//   }
  
//   async function createAuthors() {
//     console.log("Adding authors");
//     await Promise.all([
//       authorCreate("Patrick", "Rothfuss", "1973-06-06", false),
//       authorCreate("Ben", "Bova", "1932-11-8", false),
//       authorCreate("Isaac", "Asimov", "1920-01-02", "1992-04-06"),
//       authorCreate("Bob", "Billings", false, false),
//       authorCreate("Jim", "Jones", "1971-12-16", false),
//     ]);
//   }
  


  async function createAnimals() {
    console.log("Adding Animals");
    await Promise.all([
        animalCreate(
        "Triceratops",
        "T. horridus",
        "v2.1",
        "Large four-legged species from late Cretaceous, known for bony frill and three horns on the skull.",
        "Herbivore",
        "1991-01-02",
      ),
      animalCreate(
        "Stegosaurus",
        "Stegosaurus stenops",
        "v1.6",
        "Armored with thick plates on its back, this animal also is know for the large, deadly spikes on its tail.",
        "Herbivore",
        "1990-05-29",
      ),
      animalCreate(
        "Brachiosaurus",
        "Brachiosaurus altithorax",
        "v2.3",
        "Massive four-legged sauropod.",
        "Herbivore",
        "1990-02-12",
      ),
      animalCreate(
        "Tyrannosaurus",
        "Tyrannosaurus rex",
        "v3.3",
        "Apex predator from late Cretaceous, short fore-limbs, powerful legs and jaws.",
        "Carnivore",
        "1991-08-23",
      ),
      animalCreate(
        "Velociraptor",
        "V. mongoliensis",
        "v4.6",
        "Bipedal predator, razor sharp claws on hind legs. Show pack behavior and high intelligence",
        "Carnivore",
        "1990-01-02",
      ),
      animalCreate(
        "Dilophosaurus",
        "Dilophosaurus wetherilli",
        "v1.6",
        "Medium sized predator known for hooting calls. Has pop-up frill and capable of spitting venom at its prey.",
        "Carnivore",
        "1991-04-20",
      ),
      animalCreate(
        "Procompsognathus",
        "Procompsognathus triassicus",
        "v4.6",
        "Small, lightly built scavenger. Travel in groups, secrete mild venom in bite.",
        "Omnivore",
        "1990-03-26",
      ),
    ]);
  }
  
  async function createAnimalInstances() {
    console.log("Adding authors");
    await Promise.all([
        animalInstanceCreate(
        animals[0],
        "TR05",
        "v2.0",
        "2.9",
        "8.2",
        "1990-12-05",
      ),
      animalInstanceCreate(
        animals[0],
        "TR06",
        "v2.0",
        "2.9",
        "8.6",
        "1990-12-06",
      ),
      animalInstanceCreate(
        animals[0],
        "TR11",
        "v2.1",
        "1.5",
        "5.4",
        "1990-12-29",
      ),
      animalInstanceCreate(
        animals[1],
        "ST08",
        "v1.3",
        "4.5",
        "2.4",
        "1990-01-13",
      ),
      animalInstanceCreate(
        animals[1],
        "ST16",
        "v1.6",
        "4.1",
        "2.2",
        "1990-08-21",
      ),
      animalInstanceCreate(
        animals[2],
        "BR09",
        "v1.9",
        "21.5",
        "20.2",
        "1989-11-07",
      ),
      animalInstanceCreate(
        animals[3],
        "TR03",
        "v2.1",
        "4.2",
        "11.1",
        "1991-02-07",
      ),
      animalInstanceCreate(
        animals[4],
        "VR13",
        "v4.5",
        "2.4",
        "180",
        "1991-02-07",
      ),
      animalInstanceCreate(
        animals[4],
        "VR21",
        "v4.2",
        "2.3",
        "171",
        "1990-12-27",
      ),
      animalInstanceCreate(
        animals[4],
        "VR10",
        "v4.3",
        "2.0",
        "160",
        "1990-12-30",
      ),
      animalInstanceCreate(
        animals[5],
        "DL02",
        "v1.4",
        "2.2",
        "0.5",
        "1991-06-09",
      ),
      animalInstanceCreate(
        animals[6],
        "PC21",
        "v3.4",
        "0.8",
        "30",
        "1990-06-16",
      ),
      animalInstanceCreate(
        animals[6],
        "PC25",
        "v3.8",
        "0.7",
        "28",
        "1990-11-09",
      ),
      animalInstanceCreate(
        animals[6],
        "PC28",
        "v3.8",
        "0.6",
        "27",
        "1990-11-09",
      ),
      animalInstanceCreate(
        animals[6],
        "PC15",
        "v3.0",
        "0.7",
        "29",
        "1990-04-30",
      ),
    ]);
  }