GoodShows.Views.UserReviewIndexItem = Backbone.View.extend({
  template: JST['user/review_index_item'],
  render: function () {
    var content = this.template({
      show: this.model.show(),
      review: this.model
    });
  
    this.$el.html(content);

    this.$(".show-rating-stars").rating({
      showCaption: false,
      readonly: true,
      showClear: false,
      ratingClass: ' readonly'
    });

    this.addCommentsIndex();
    this.addShelvesButton();
  
    return this;
  },
  initialize: function (options) {
    if (options) {
      this.shelves = options.shelves;
    }

    this.listenTo(this.model.show(), 'change', this.render);
  },

  className: 'col-lg-12 review-item',

  addCommentsIndex: function () {
    if(!this.commentsView) {
      this.commentsView = new GoodShows.Views.CommentsIndex({
        collection: this.model.comments(),
        review: this.model
      });

    }
    this.$('.review-body').after(this.commentsView.render().$el);
  },

  addShelvesButton: function () {
    if(!this.shelvesButton) {
      this.shelvesButton = new GoodShows.Views.ShowShelfButton({
        collection: this.shelves,
        show: this.model.show()
      });

    }
    this.$('.add-to-shelf').html(this.shelvesButton.render().$el);
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.commentsView && this.commentsView.remove();
  }
});