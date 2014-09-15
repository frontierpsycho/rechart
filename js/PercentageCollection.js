define(function() {
  return function(data) {
    var that = {
      total: 0,
      data: {}
    };

    for (var category in data) {
      if (data.hasOwnProperty(category)) {
        that.data[category] = {
          value: data[category],
          locked: false
        };

        that.total += data[category].value;
      }
    }

    that.recalcTotal = function() {
      for (var category in data) {
        if (data.hasOwnProperty(category)) {
          that.total += data[category].value;
        }
      };
    };

    that.recalcTotal();

    that.modify = function(category, amount) {
      if (this.data.hasOwnProperty(category)) {
        var otherCategories = [];
        for (var otherCategory in this.data) {
          if (otherCategory !== category && otherCategory.locked !== true) {
            otherCategories.push(otherCategory);
          }
        }

        // otherCategories are not locked, they can be decremented
        var delta = amount / otherCategories.length;

        for (otherCategory in this.data) {
          this.data[otherCategory].value -= delta;
          if (this.data[otherCategory].value < 0) {
            this.data[otherCategory].value = 0;
          }
        }

        // if the category we want to modify is locked, unlock it, there's not reason for it to be locked
        this.data.locked = false;
        this.data[category].value += amount

        // recalculate for rounding and floating point imprecisions
        this.recalcTotal();
      }
    };

    that.lock = function(category) {
      if (this.data.hasOwnProperty(category)) {
        this.data.locked = true;
      }
    };

    return that;
  };
});
