define('Mobile/ContattaDevTools/ApplicationScene', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/Scene',
    './ApplicationLayout'
], function(
    declare,
    lang,
    Scene,
    ApplicationLayout
    ) {
    return declare('Mobile.ContattaDevTools.ApplicationScene', [Scene], {
        components: [
            {type: ApplicationLayout, attachPoint: 'layout'}
        ]
    });
});