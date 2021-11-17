const {
  Shop,
  Item,
  NormalItem,
  AgedBrie,
  Backstage,
  Sulfuras,
  Conjured,
} = require("../src/gilded_rose_improved.js");

const items = [
  // new Item("+5 Dexterity Vest", 10, 20),
  // new AgedBrie(8, 0),
  // new NormalItem("Elixir of the Mongoose", 10, 50),
  // new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  // new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  // new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  // new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Backstage(20, 20, "Backstage"),
  new AgedBrie(12, 10),
  new Conjured("conjuredItem", 15, 50),

  // This Conjured item does not work properly yet
  // new Item("Conjured Mana Cake", 3, 6),
];

const days = Number(process.argv[2]) || 2;
const gildedRose = new Shop(items);

// console.log("OMGHAI!");
for (let day = 0; day < days; day++) {
  console.log(`\n-------- day ${day} --------`);
  console.log("name, sellIn, quality");
  items.forEach((item) =>
    console.log(`${item.name}, ${item.sellIn}, ${item.quality}`)
  );
  gildedRose.updateQuality();
}
