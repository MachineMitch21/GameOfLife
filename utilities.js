
(function(factory) {

    window.Utilities = factory(window, {});

})(function(root, Utilities) {

    let previousUtilites = Utilities;

    Utilities.noConflict = function() {
        root.Utilities = previousUtilites;
        return this;
    }

    Utilities.centerCanvas = function(canvas) {
        let x = (windowWidth - width) * .5;
        let y = (windowHeight - height) * .5;
        canvas.position(x, y);
    }

    return Utilities;
});