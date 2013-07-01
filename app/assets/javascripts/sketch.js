/* Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

var __slice = Array.prototype.slice;
(function($) {
  var Sketch;
  var col_actions;
  
  $.fn.sketch = function() {
    var args, key, sketch;
    
    // Pop off the col_actions list
    if (arguments[0] == 'col_obj') {
      col_actions = arguments[1];
      key = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
      if (this.length > 1) {
          $.error('Sketch.js can only be called on one element at a time.');
      }
    }
    else {
    // Parse function call. Don't really have any arguements at the moment
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.length > 1) {
        $.error('Sketch.js can only be called on one element at a time.');
      }
    }
    
    // Check to see if there is already a Sketch object attached to the DOM Element
    sketch = this.data('sketch');
    
    // Modify existing sketch object by the parameters below if said object exists
    if (typeof key === 'string' && sketch) {
      if (sketch[key]) {
        // Modify sketch based on new object, not sure why this is needed. Didn't know you can drop a function in this thing
        if (typeof sketch[key] === 'function') {
          return sketch[key].apply(sketch, args);
        } 
        // Based case just return existing sketch object
        else if (args.length === 0) {
          return sketch[key];
        } 
        // Resets the options...
        else if (args.length === 1) {
          return sketch[key] = args[0];
        }
      }
      //  Default unrecognized command
      else {
        return $.error('Sketch.js did not recognize the given command.');
      }
    } 
    // Again return existing sketch
    else if (sketch) {
      return sketch;
    } 
    // Finally create a new sketch. Currently none of the above is used...
    else {
      this.data('sketch', new Sketch(this.get(0), key, col_actions));
      return this;
    }
  };
  
  // Sketch class
  function create_sketch() {
    // Sketch constructor
    function Sketch(el, opts, col_actions) {
      this.el = el;
      this.canvas = $(el);
      
      // Function call to generate drawing ability
      this.context = el.getContext('2d');
      this.options = $.extend({
        toolLinks: true,
        defaultTool: 'marker',
        defaultColor: '#000000',
        defaultSize: 5
      }, opts);
      this.painting = false;
      this.color = this.options.defaultColor;
      this.size = this.options.defaultSize;
      this.tool = this.options.defaultTool;
      this.actions = (col_actions === undefined) ? [] : col_actions.asArray();
      this.col_actions = col_actions || [];
      this.action = [];
      
      // bind new event here.
      this.canvas.bind('click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', this.onEvent);
      
      // Creating functions for additional tools. i.e. changing color, downloading whiteboard image etc...
      if (this.options.toolLinks) {
        $('body').delegate("a[href=\"#" + (this.canvas.attr('id')) + "\"]", 'click', function(e) {
          var $canvas, $this, key, sketch, _i, _len, _ref;
          $this = $(this);
          $canvas = $($this.attr('href'));
          sketch = $canvas.data('sketch');
          _ref = ['color', 'size', 'tool'];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            if ($this.attr("data-" + key)) {
              sketch.set(key, $(this).attr("data-" + key));
            }
          }
          if ($(this).attr('data-download')) {
            sketch.download($(this).attr('data-download'));
          }
          return false;
        });
      }
    }
    
    // This function is used to save the whiteboard contents. User clicks button to "download".
    Sketch.prototype.download = function(format) {
      var mime;
      format || (format = "png");
      if (format === "jpg") {
        format = "jpeg";
      }
      mime = "image/" + format;
      return window.open(this.el.toDataURL(mime));
    };
    
    // Change the paramets of the brush. Currently not used
    Sketch.prototype.set = function(key, value) {
      this[key] = value;
      return this.canvas.trigger("sketch.change" + key, value);
    };
    
    // Start and Stop Paint functions. Have not determined exactly how they are being used
    Sketch.prototype.startPainting = function() {
      this.painting = true;
      return this.action = {
        tool: this.tool,
        color: this.color,
        size: parseFloat(this.size),
        events: []
      };
    };
    Sketch.prototype.stopPainting = function() {
      if (this.action) {
        this.actions.push(this.action);
        this.col_actions.push(this.action);
      }
      this.painting = false;
      this.action = null;
      return this.redraw();
    };
    
    Sketch.prototype.onEvent = function(e) {
      if (e.originalEvent && e.originalEvent.targetTouches) {
        e.pageX = e.originalEvent.targetTouches[0].pageX;
        e.pageY = e.originalEvent.targetTouches[0].pageY;
      }
      $.sketch.tools[$(this).data('sketch').tool].onEvent.call($(this).data('sketch'), e);
      e.preventDefault();
      return false;
    };
    
    Sketch.prototype.redraw = function() {
      var sketch;
      this.el.width = this.canvas.width();
      this.context = this.el.getContext('2d');
      sketch = this;
      $.each(this.actions, function() {
        if (this.tool) {
          return $.sketch.tools[this.tool].draw.call(sketch, this);
        }
      });
      if (this.painting && this.action) {
        return $.sketch.tools[this.action.tool].draw.call(sketch, this.action);
      }
    };
    
    // Draw line designated by 'action'. Required as cannot call 'draw' directly 
    // Sketch.prototype.collaborative_draw = function(action) {
    //	sketch = this;
    //    return $.sketch.tools[action.tool].draw.call(sketch, action);
    // };
    return Sketch;
  };
  Sketch = create_sketch();
  
  $.sketch = {
    tools: {}
  };
  
  $.sketch.tools.marker = {
  	
  	// Handle UI
  onEvent: function(e) {
      switch (e.type) {
        case 'mousedown':
        case 'touchstart':
          this.startPainting();
          break;
        case 'mouseup':
        case 'mouseout':
        case 'mouseleave':
        case 'touchend':
        case 'touchcancel':
          this.stopPainting();
      }
      
      // Pushes list of locations
      if (this.painting) {
        this.action.events.push({
        	
          // Adding a numeric to x, y will offset the drawing each time	
          x: e.pageX - this.canvas.offset().left,
          y: e.pageY - this.canvas.offset().top,
          event: e.type
        });
        return this.redraw();
      }
    },
  draw: function(action) {
      var event, previous, _i, _len, _ref;
      this.context.lineJoin = "round";
      this.context.lineCap = "round";
      this.context.beginPath();
      this.context.moveTo(action.events[0].x, action.events[0].y);
      _ref = action.events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this.context.lineTo(event.x, event.y);
        // previous = event;
      }
      this.context.strokeStyle = action.color;
      this.context.lineWidth = action.size;
      return this.context.stroke();
    }
  };
  return $.sketch.tools.eraser = {
    onEvent: function(e) {
      return $.sketch.tools.marker.onEvent.call(this, e);
    },
    draw: function(action) {
    	
      // Commenting out the below code as we're not using composites right now. 
      // In the long run will likely need to switch to composite usage.
      	
      /* var oldcomposite;
      oldcomposite = this.context.globalCompositeOperation;
      this.context.globalCompositeOperation = "source-over"; */
      action.color = "#FFFFFF";
      action.size = 50;
      return $.sketch.tools.marker.draw.call(this, action);
      /* return this.context.globalCompositeOperation = oldcomposite; */
    }
  };
})(jQuery);