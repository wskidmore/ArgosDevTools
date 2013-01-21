define('Mobile/ContattaDevTools/Views/RootCreate', [
    'dojo/_base/declare',
    'dojo/dom-class',
    'dojo/string',
    'dojo/topic',
    'argos/Edit',
    'argos/ScrollContainer',
    'argos/ActionBar'
], function(
    declare,
    domClass,
    string,
    topic,
    Edit,
    ScrollContainer,
    ActionBar
) {
    return declare('Mobile.ContattaDevTools.Views.RootCreate', [Edit], {
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
        titleText: 'Setup Dev Enc',
        setupText: 'Continue',
        selectRootText: 'Select Root Folder',

        //View Properties
        id: 'root_create',

        createToolLayout: function() {
            return this.tools || (this.tools = {
                top: [],
                action: [
                    {
                        name: 'SelectRoot',
                        baseClass: 'button action-button on-full',
                        label: this.selectRootText,
                        action: 'browseForDir',
                        scope: this
                    },
                    {
                        name: 'Setup',
                        baseClass: 'button action-button action-button-green on-right',
                        label: this.setupText,
                        action: 'setupDevEnv',
                        scope: this,
                        update: this.hasRoot
                    }
                ]
            });
        },
        _onKeyUp: function(e) {
            if (e.keyCode === 13)
                this.setupDevEnv();
        },
        hasRoot: function(context) {
            if (!context) return;

            var hasRoot = !!App.rootFolder;

            this.set('enabled', hasRoot);
            domClass.toggle(this.domNode, 'is-hidden', !hasRoot);
        },

        browseForDir: function() {
            window.parentSandboxBridge.browseForFolder(this.onBrowseSuccess.bindDelegate(this));
        },
        onBrowseSuccess: function(rootPath) {
            // note: rootPath does not contain ending /
            App.rootFolder = rootPath;

            this.fields['rootFolder'].inputNode.value = rootPath;
            topic.publish('/app/toolbar/update', ['success']);
        },

        setupDevEnv: function() {
            var resultPath = window.parentSandboxBridge.resolvePath(App.rootFolder, '/products/argos-'+o.pluginName);
            alert(resultPath);
        },


        createLayout: function() {
            return this.layout || (this.layout = [{
                cls: 'edit-inner',
                title: false,
                children: [{
                    name: 'rootFolder',
                    property: 'rootFolder',
                    type: 'text',
                    disabled: true
                }]
            }]);
        }
    });
});