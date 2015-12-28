/**
 * Created by Administrator on 2015/12/24.
 */
(function() {
    "use strict";

    var importDoc = document._currentScript.ownerDocument;
    //var tmplHtml = document.querySelector('link[rel="import"]').import;
    //var tmpl = tmplHtml.querySelector('template').content;
    var eleStar;

    var starProto = Object.create( HTMLElement.prototype );

    starProto.createdCallback = function() {
        var root = this.createShadowRoot();
        var template = importDoc.querySelector('#score-star');
        var clone = document.importNode(template.content, true);
        root.appendChild(clone);

        eleStar = root.querySelector('#star');

        var self = this;
        Object.defineProperty(self, "state", {
            get : function(){ return parseInt(self.getAttribute("state")); },
            set : function(newValue){ self.setAttribute("state",newValue) },
            enumerable : true,
            configurable : true});
    };

    starProto.attributeChangedCallback = function( attrName, oldVal, newVal ) {
        switch (attrName) {
            case 'state' :
                //eleStar.setAttribute('class', 'score-size-control state' + newVal);
                eleStar.className = 'score-size-control state' + newVal;
                break;
        }
    };

    var star = document.registerElement( "score-star", {
        prototype: starProto
    });
}());