define('configuration/development', ['Mobile/ContattaDevTools/ApplicationModule'], function(ApplicationModule) {

    return {
        modules: [
            new ApplicationModule()
        ],
        connections: {
            'crm': {
                isDefault: true,
                offline: true,
                url: 'http://localhost/',
                json: true
            }
        },
        enableUpdateNotification: true
    };

});