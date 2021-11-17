var {
  Shop,
  Backstage,
  AgedBrie,
  Conjured,
  NormalItem,
  Sulfuras,
} = require("../src/gilded_rose_improved.js");

describe("Quality update for regular product", function () {
  it("should decrease by one", function () {
    const gildedRose = new Shop([new NormalItem("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(19);
  });
});

describe("Quality update for regular product beyond sellin < 0", function () {
  it("should decrease by two", function () {
    const gildedRose = new Shop([new NormalItem("+5 Dexterity Vest", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(18);
  });
});

describe("Quality update for Brie", function () {
  it("should increase by one", function () {
    const gildedRose = new Shop([new AgedBrie(20, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(21);
  });

  it("should increase by 2", function () {
    const gildedRose = new Shop([new AgedBrie(8, 47)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(49);
  });

  it("should increase by 3, beyond 5 days left or less", function () {
    const gildedRose = new Shop([new AgedBrie(2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });
});

describe("Quality update for Backstage passes", function () {
  it("should increase by one", function () {
    const gildedRose = new Shop([new Backstage(20, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(26);
  });

  it("should increase by 2, beyond 10 days left or less", function () {
    const gildedRose = new Shop([new Backstage(9, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(22);
  });

  it("should increase by 3, beyond 5 days left or less", function () {
    const gildedRose = new Shop([new Backstage(3, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(23);
  });

  it("should be 0 after concert", function () {
    const gildedRose = new Shop([new Backstage(0, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
});

describe("Quality update for Sulfuras", function () {
  it("should increase by 3, beyond 5 days left or less", function () {
    const gildedRose = new Shop([new Sulfuras("Sulfuras", 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });
});

describe("Quality never more than 50", function () {
  it("should stay at 50", function () {
    const gildedRose = new Shop([new Backstage(5, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });
});

describe("Quality never below 0", function () {
  it("should stay at 0", function () {
    const gildedRose = new Shop([
      new NormalItem("Elixir of the Mongoose", 5, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  describe("Conjured quality get worse twice as fast", function () {
    it("should lose 2 instead of 1 for a normal item", function () {
      const gildedRose = new Shop([new Conjured("Conjured stuff", 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8);
    });
  });

  describe("Conjured quality get worse twice as fast", function () {
    it("should lose 4 instead of 2 for a normal item", function () {
      const gildedRose = new Shop([new Conjured("Conjured stuff", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(6);
    });
  });
});
