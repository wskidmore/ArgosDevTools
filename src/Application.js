define('Mobile/ContattaDevTools/Application', [
    'dojo/_base/declare',
    'dojo/string',
    'argos/Application',
    'argos/CustomizationSet',
    './ApplicationScene'
], function(
    declare,
    string,
    Application,
    CustomizationSet,
    ApplicationScene
) {

    return declare('Mobile.ContattaDevTools.Application', [Application], {
        components: [
            {type: ApplicationScene, attachPoint: 'scene'},
            {type: CustomizationSet, attachPoint: 'customizations'}
        ],
        rootFolder: null,
        /* todo: move to startup */
        startup: function() {
            this.inherited(arguments);
        },
        initConnects: function() {
            this.inherited(arguments);
        },
        _viewTransitionTo: function(view) {
            this.inherited(arguments);
        },
        run: function() {
            this.inherited(arguments);

            this.navigateToInitialView();
        },
        hasAccessTo: function(security) {
            return true; /* todo: remove */
        },
        reload: function() {
            window.location.reload();
        },
        navigateToInitialView: function() {
            this.scene.showView('home');
        }
    });
});