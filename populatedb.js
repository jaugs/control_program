#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  

  //import Item from "./models/item";
  const Item = require("./models/item");
  //const Resort = require("./models/resort");
  
  const Room = require("./models/resort")
  const items = [];
  const animals = [];
  const animalinstances = [];
  const rooms = []
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
  
    //await createAnimals();
    //await createAnimalInstances();
    //await createRooms();
    await createItems2();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function itemCreate(name, category, sub_category, quantity, price, description, isAvailable, supplier, tags, lotSize, lastOrdered) {
    itemdetail = {
      name: name,
      category: category,
      sub_category: sub_category,
      quantity: quantity,
      price: price,
      description: description,
      isAvailable: isAvailable,
      supplier: supplier,
      tags: tags,
      lotSize: lotSize,
      lastOrdered: lastOrdered,
    };

    const item = new Item(itemdetail);
    await item.save();
    console.log(`added ${item.name}`)
  }

  async function roomCreate(roomNumber, guestName, checkInDate, checkOutDate, status, createdAt, lastCleanedDate) {
    roomDetail = {
      roomNumber: roomNumber,
      guestName: guestName,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      status: status,
      createdAt: createdAt,
      lastCleanedDate: lastCleanedDate,
    };

    const room = new Room(roomDetail);
    await room.save();
    console.log(`added ${room.roomNumber}`)
  }



  async function createRooms() {
    console.log('adding items....')
    await Promise.all([
      roomCreate(
      101, 
      'Vacant', 
      "",
      '',
      'vacant',
      '',
      "1990-08-23"),
      ])}


  // async function animalCreate(name, scientificname, current_version, description, diet, synth_date) {
  //   animaldetail = {
  //     name: name,
  //     scientificname: scientificname,
  //     current_version: current_version,
  //     description: description,
  //     diet: diet,
  //     synth_date: synth_date,
  //   };
  
  //   const animal = new Animal(animaldetail);
  //   await animal.save();
  //   animals.push(animal);
  //   console.log(`Added animal`);
  // }
  
  // async function animalInstanceCreate(animal, imprint, version, current_height, current_weight, birth_date, death_date) {
  //   animalinstancedetail = {
  //       animal: animal,
  //     imprint: imprint,
  //     version: version,
  //     current_height: current_height,
  //     current_weight: current_weight,
  //     birth_date: birth_date,
  //   };
  //   if (death_date != false) animalinstancedetail.death_date = death_date;
  
  //   const animalinstance = new AnimalInstance(animalinstancedetail);
  //   await animalinstance.save();
  //   animalinstances.push(animalinstance);
  //   console.log(`Added animalinstance: ${imprint}`);
  // }

  async function createItems2() {
    console.log('adding items....')
    await Promise.all([
      itemCreate("Chlorine Tablets",
      "Pool Maintenance",
      "Water Treatment",
      100,
      49.99,
      "Slow-dissolving chlorine tablets for sanitizing and maintaining optimal water quality in hotel pools.",
      true,
      "ABC Pool Supplies",
      ["chlorine tablets", "water treatment", "pool maintenance"],
      200,
      "1990-08-15"),
      
      itemCreate("pH Test Kit",
      "Pool Maintenance",
      "Water Testing",
      10,
      19.99,
      "Complete pH test kit for accurately measuring and adjusting the pH levels of the hotel pool water.",
      true,
      "XYZ Pool Supplies",
      ["pH test kit", "water testing", "pool maintenance"],
      20,
      "1989-11-02"),
      itemCreate("Pool Vacuum",
      "Pool Maintenance",
      "Cleaning Equipment",
      5,
      199.99,
      "High-performance pool vacuum for efficient cleaning and maintenance of the hotel pool.",
      true,
      "PQR Pool Equipment",
      ["pool vacuum", "cleaning equipment", "pool maintenance"],
      10,
      "1991-05-10"),
      itemCreate("Pool Skimmer Net",
      "Pool Maintenance",
      "Cleaning Tools",
      20,
      9.99,
      "Durable pool skimmer net for removing debris and leaves from the surface of the hotel pool.",
      true,
      "DEF Pool Supplies",
      ["pool skimmer net", "cleaning tools", "pool maintenance"],
      40,
      "1990-10-25"),
      itemCreate("Pool Filter Cartridge",
      "Pool Maintenance",
      "Filtration System",
      10,
      29.99,
      "Replacement pool filter cartridge to ensure efficient filtration and clean water circulation in the hotel pool.",
      true,
      "GHI Pool Equipment",
      ["pool filter cartridge", "filtration system", "pool maintenance"],
      20,
      "1989-12-18"),
      ])}
  

  
 async function createItems() {
  console.log('adding items....')
  await Promise.all([
    
  
    itemCreate(
      "Animal Feed - Bulk",
      "Feed",
      "Grain",
      22,
      69.99,
      "50 lb sack of milled feed",
      "Lopez Milling Co.",
      ['food', 'grain', 'feed', 'plant-matter'],
      10,
      "1991-05-11"
    ),

  ])
 }

