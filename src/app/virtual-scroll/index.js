
const tableData = Array.from({length: 200}).map((item, index)=> ({
  id: `No.${index}`,
  name: `Saul Goodman`,
  gender: 'Male',
  age: 50,
  job: 'lawyer',
}));

(function( scope ) {
  const RENDER_NODE = 50;
  const RENDER_NODE_OPP = 10;
  const SCROLL = 1000;

  const ANIMATION_DURATION = 200;

  scope.InfiniteScrollerSource = function(){};
  scope.InfiniteScrollerSource.prototype = {
    fetch: function(count) {},
    createTombstone: function() {},
    render: function(item, div) {}
  };
})()

scope.InfiniteScroller = function(scroller, source) {
  this.anchorItem = {index: 0, offset: 0};
  this.firstAttachItem_ = 0;
  this.lastAttachItem_ = 0;
  this.scroller_ = scroller;
  
  this.scroller_.addEventListener('scroll', this.onScroll_.bind(this))
}
