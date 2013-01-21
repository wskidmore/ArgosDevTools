define('Mobile/ContattaDevTools/Views/PluginCreate', [
    'dojo/_base/declare',
    'dojo/string',
    'argos/Edit',
    'argos/ScrollContainer',
    'argos/ActionBar'
], function(
    declare,
    string,
    Edit,
    ScrollContainer,
    ActionBar
) {

    return declare('Mobile.ContattaDevTools.Views.PluginCreate', [Edit], {
        events: {
            'keyup': '_onKeyUp'
        },
        //Templates
        components: [
            {name: 'fix', content: '<a href="#" class="android-6059-fix">fix for android issue #6059</a>'},
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', props: {enableFormFix: true}, components: [
                {name: 'scroll', tag: 'div', components: [
                    {name: 'loading', content: Simplate.make('<div class="loading-indicator"><div>{%: $.loadingText %}</div></div>')},
                    {name: 'validation', tag: 'div', attrs: {'class': 'validation-summary'}, components: [
                        {name: 'validationTitle', content: Simplate.make('<h2>{%: $.validationSummaryText %}</h2>')},
                        {name: 'validationContent', tag: 'ul', attachPoint: 'validationContentNode'}
                    ]},
                    {name: 'content', tag: 'div', attrs: {'class': 'edit-content'}, attachPoint: 'contentNode'},
                    {name: 'action', attachPoint: 'toolbars.action', type: ActionBar, props: {managed: true}}
                ]}
            ]}
        ],

        //Localization
        titleText: 'New Plugin',
        namespaceText: 'Plugin and namespace name:',
        createText: 'Create Plugin',
        enterNameText: 'Please enter a name',

        //View Properties
        id: 'plugin_create',

        createToolLayout: function() {
            return this.tools || (this.tools = {
                top: false,
                action: [{
                    name: 'Create',
                    baseClass: 'button action-button',
                    label: this.createText,
                    action: 'createPlugin',
                    scope: this
                }]
            });
        },
        _onKeyUp: function(e) {
            if (e.keyCode === 13)
                this.createPlugin();
        },

        createPlugin: function() {
            var o = {
                pluginName: this.fields['Namespace'].getValue()
            };

            if (!o.pluginName)
            {
                alert(this.enterNameText);
                return;
            }

            // copy the shelled plugin folder
            var resultPath = window.parentSandboxBridge.resolvePath(App.rootFolder, '/products/argos-'+o.pluginName);
            alert(resultPath);
            return;

            window.parentSandboxBridge.copyFolder("app:/data/newPlugin", resultPath);

            // read config that has list of files to enum
            var pluginConfig = window.parentSandboxBridge.readFile("app:/data/new-plugin.json");
            pluginConfig = JSON.parse(pluginConfig);

            // enum files, run simplate on name and file content
            for (var i = 0; i < pluginConfig.files.length; i++)
            {
                var srcFilePath = resultPath+pluginConfig.files[i].source,
                    destFilePath = resultPath+pluginConfig.files[i].destination;

                // read file
                var data = new Simplate(window.parentSandboxBridge.readFile(srcFilePath));

                // apply simplate
                data = data.apply(o);

                // write to new
                window.parentSandboxBridge.writeFile(data, destFilePath);

                // delete old
                window.parentSandboxBridge.deleteFile(srcFilePath);
            }
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                cls: 'edit-inner',
                title: false,
                children: [{
                    name: 'Namespace',
                    property: 'Namespace',
                    label: this.namespaceText,
                    type: 'text'
                }]
            }]);
        }
    });
});