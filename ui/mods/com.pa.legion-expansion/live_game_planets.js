var legionLiveGamePlanetsLoaded;

function legionLiveGamePlanets() {
  if (legionLiveGamePlanetsLoaded) {
    return;
  }
  legionLiveGamePlanetsLoaded = true;

  try {
    const themeSetting =
      api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
    if (themeSetting === "ON") {
      loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_planets.css");
    }

    handlers.legionui = function (payload) {
      require([
        "coui://ui/mods/com.pa.legion-expansion/common_functions.js",
      ], function (common) {
        common.bodyPanelClass(payload);

        const src = "coui://ui/main/shared/img/controls/";
        const path = "coui://ui/mods/com.pa.legion-expansion/img/controls/";
        const colour = common.uiColour(payload);
        const png1 = "pin_open.png";
        const png2 = "pin_closed.png";

        common.toggleImage(src, path, colour, png1, png2);

        model.toggleImage = ko.computed(function () {
          return common.togglePanel(
            model.showCelestialViewModels(),
            path,
            colour,
            png1,
            png2
          );
        });
      });
    };
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
legionLiveGamePlanets();
