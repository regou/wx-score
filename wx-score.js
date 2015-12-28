(function() {
    "use strict";

    var proto = Object.create( HTMLElement.prototype );

    //proto.changeHtml = function(max,cur){
    //    var oneStar = '<div class="score-star-num${num} score-size-control ${state}">\n    <div class="score-oneStar"></div>\n</div>';
    //    var html = "";
    //    var dyeData = this.getDyeData();
    //    console.log(dyeData)
    //    for(var i=1;i<=max;i++){
    //        html += (oneStar.replace('${num}',i).replace('${state}',(dyeData[i-1] || "")));
    //    }
    //
    //    this.innerHTML = html;
    //};

    proto.changeHtml = function(max,cur){
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        for(var i=1; i <= max; i++){
            var oneStar = document.createElement('score-star');
            if (i <= cur) {
                oneStar.setAttribute('state', 3);
            } else if (i > Math.ceil(cur)) {
                oneStar.setAttribute('state', 1);
            } else {
                oneStar.setAttribute('state', 2);
            }
            this.appendChild(oneStar);
        }
    };

    proto.createdCallback = function() {
        this.readAttributes();

        this.changeHtml(this.max,this.cur);

    };
    proto.readAttributes = function() {
        var self = this;

        Object.defineProperty(self, "max", {
            get : function(){ return parseInt(self.getAttribute("max")); },
            set : function(newValue){ self.setAttribute("max",newValue) },
            enumerable : true,
            configurable : true});
        Object.defineProperty(self, "cur", {
            get : function(){ return (self.getAttribute("cur"))*1; },
            set : function(newValue){ self.setAttribute("cur",newValue) },
            enumerable : true,
            configurable : true});

    };

    proto.updateScore = function(){
        this.readAttributes();
        this.changeHtml(this.max,this.cur);
    };
    proto.attributeChangedCallback = function( attrName, oldVal, newVal ) {
        this.updateScore();
    };

    document.registerElement( "wx-score", {
        prototype: proto
    });
}());