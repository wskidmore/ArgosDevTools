define('Mobile/ContattaDevTools/ApplicationLayout', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/_base/event',
    'dojo/topic',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dojo/dom-construct',
    'dojo/has',
    'dojo/query',
    'dojo/NodeList-traverse',
    'argos/DialogPane',
    'argos/Layout',
    'argos/Pane',
    'argos/utility',
    './TitleBar'
], function(
    declare,
    array,
    lang,
    win,
    event,
    topic,
    domClass,
    domStyle,
    domGeom,
    domConstruct,
    has,
    query,
    nodeListTraverse,
    DialogPane,
    Layout,
    Pane,
    utility,
    TitleBar
    ) {

    return declare('Mobile.ContattaDevTools.ApplicationLayout', [Layout], {
        tiers: 1,
        maximized: 0,

        _onLayoutClickHandle: null,

        components: [
            {name: 'list', root: true, type: Pane, attachPoint: 'panes.list', props:{'class':'layout-center', tier: 0}, components: [
                {name: 'top', type: TitleBar, attachEvent: 'onPositionChange:_onToolbarPositionChange', props: {managed: true, visible: false}},
                {name: 'container', tag: 'div', attrs: {'class': 'view-container'}, attachPoint: 'viewContainerNode'}
            ]},
            {name: 'dialog', type: DialogPane, attachPoint: 'panes.dialog', props:{'class':'layout-right', tier: false}}
        ],

        onStartup: function() {
            this.inherited(arguments);

        },
        _contains: function(rootNode, testNode) {
            return rootNode.contains
                ? rootNode != testNode && rootNode.contains(testNode)
                : !!(rootNode.compareDocumentPosition(testNode) & 16);
        }
    });
});