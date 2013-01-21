define('Mobile/ContattaDevTools/Views/Home', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-attr',
    'dojo/store/Memory',
    'argos/utility',
    'argos/List',
    'argos!application',
    'argos!scene'
], function(
    declare,
    array,
    lang,
    domAttr,
    Memory,
    utility,
    List,
    app,
    scene
    ) {
    return declare('Mobile.ContattaDevTools.Views.Home', [List], {
        //Templates
        rowTemplate: new Simplate([
            '<li class="{%: $.cls %}" data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<div class="media"><div class="bd">',
                '<p class="img pull-img"><img src="{%= $.icon %}" width="48px"></p>',
                '<p class="pull-right-indent block-header">{%: $.title %}</p>',
                '<p class="pull-right-indent block-description">{%= $$.getDescription($) %}</p>',
            '</div></div>'
        ]),
        runTemplate: new Simplate([
        ]),
        helpTemplate: new Simplate([
            '<li><a href="{%= $.url %}">{%: $.title %}</a></li>'
        ]),

        //Localization
        titleText: 'Home',
        newPluginTitleText: 'New Plugin',
        newPluginText: 'Create a new plugin with correct folders, name-spacing, configs and associated index file.',
        runTitleText: 'Run...',
        setupTitleText: 'Setup Environment',
        setupText: 'Establish a root directory, create the initial folders and download the SDK with base application.',
        helpTitleText: 'Help',

        //View Properties
        id: 'home',
        expose: false,
        hideSearch: true,

        navigateToView: function(evt, node) {
            var view = node && domAttr.get(node, 'data-view');
            if (view) scene().showView(view);
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                top: []
            });
        },
        getDescription: function(o) {
            return utility.expand(this, o.description);
        },
        /**
         * Read existing Apps and return html string representation using runTemplate
         */
        createRunDescription: function() {
            //var data = window.parentSandboxBridge.readFile("app:/data/help.json");
            // data = JSON.parse(data);

            var data = [];

            var content = [];
            //todo loop run configs append rowTemplate to content

            return content.join('');
        },
        createHelpLinks: function() {
            //var data = window.parentSandboxBridge.readFile("app:/data/help.json");
            // data = JSON.parse(data);
            var data = [{title:'API', url:'#'}, {title:'Guides', url:'#'}, {title:'Github SDK', url:'#'}, {title:'Github Argos-Contatta', url:'#'}, {title:'Test', url: '#'}];

            var content = ['<ul class="pull-right-indent block-help-links">'];
            for (var i = 0; i < data.length; i++)
                content.push(this.helpTemplate.apply(data[i], this));

            content.push('</ul>');

            return content.join('');
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                    {
                        'name': 'new_plugin',
                        'action': 'navigateToView',
                        'view': 'plugin_create',
                        'cls': 'bg-blue',
                        'icon': 'content/images/icons/imWhite/im-folder-new@2x.png',
                        'title': this.newPluginTitleText,
                        'description': this.newPluginText
                    },
                    {
                        'name': 'setup',
                        'action': 'navigateToView',
                        'view': 'root_create',
                        'cls': 'bg-green',
                        'icon': 'content/images/icons/imWhite/im-cog@2x.png',
                        'title': this.setupTitleText,
                        'description': this.setupText
                    },
                    {
                        'name': 'help',
                        'action': 'newPlugin',
                        'cls': 'bg-purple',
                        'icon': 'content/images/icons/imWhite/im-info-circle@2x.png',
                        'title': this.helpTitleText,
                        'description': this.createHelpLinks
                    },
                    {
                        'name': 'run',
                        'icon': 'content/images/icons/imWhite/im-play@2x.png',
                        'title': this.runTitleText,
                        'description': this.createRunDescription
                    }
                ]
            );
        },
        createStore: function() {
            return new Memory({
                idProperty: 'name',
                data: this.createLayout()
            });
        },
        refreshRequiredFor: function(options) {
            /* todo: fix processing for refresh */
            /*
             var preferences = app().preferences,
             visible = preferences && preferences.home && preferences.home.visible,
             shown = this.feed && this.feed['$resources'];

             if (!visible || !shown || (visible.length != shown.length))
             return true;

             for (var i = 0; i < visible.length; i++)
             if (visible[i] != shown[i]['$key']) return true;
             */

            return this.inherited(arguments);
        }
    });
});