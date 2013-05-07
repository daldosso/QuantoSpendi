Ext.define('QuantoSpendi.view.SpeseList', {
    extend: 'Ext.List',
    xtype: 'speseList',
    config: {
        title: 'Spese',
        store: 'Spese',
        itemTpl: [
            '<span style="float: left; width: 150px">{mese} {anno}:</span> <b>{importo} €</b>'
        ],
        items: [{
                xtype: 'toolbar',
                docked: 'top',
                items: [{
                        xtype: 'spacer'
                    }, {
                        xtype: 'button',
                        text: '<span style="font-size: 16px">+</span>',
                        action: 'addSpesa',
                        ui: 'normal',
                        height: 32,
                        width: 32
                    }]
            }]
    }

});
