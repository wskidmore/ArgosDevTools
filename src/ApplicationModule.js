define('Mobile/ContattaDevTools/ApplicationModule', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/ApplicationModule',
    './ApplicationViews',
    'argos/Fields/FieldRegistry'
], function(
    declare,
    lang,
    ApplicationModule,
    ApplicationViews,
    FieldRegistry
    ) {

    return declare('Mobile.ContattaDevTools.ApplicationModule', [ApplicationModule], {
        loadViews: function(scene) {
            this.inherited(arguments);

            scene.registerViews(ApplicationViews);
            this.registerFields();
        },
        registerFields: function() {
            /*
            var fieldMap = {
                'address': AddressField,
                'name': NameField,
                'note': NoteField,
                'picklist': PicklistField,
                'recurrences': RecurrencesField
            };

            FieldRegistry.register(fieldMap);
            */
        },
        loadCustomizations: function() {
        }
    });
});