Ext.define('QuantoSpendi.view.SpeseList', {
    extend: 'Ext.List',
    xtype: 'speseList',
    config: {
        title: 'Spese',
        store: 'Spese',
        itemTpl: [
            '<tpl if="importoRaw &gt; 1000">' +
                '<div style="display: inline">{mese} {anno}:</div><div style="font-weight: bold; color: red; text-align: right; display: inline; float: right">{importo} €</div>' +
            '<tpl else>' +
                '<div style="display: inline">{mese} {anno}:</div><div style="font-weight: bold; text-align: right; display: inline; float: right">{importo} €</div>' +
            '</tpl>'
        ],
        items: [{
                xtype: 'toolbar',
                docked: 'top',
                items: [{
                        xtype: 'label'
                    }, {
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
    },
    initialize: function() {
        this.callParent();
        var spesaMedia = this.down('label');
        Ext.Ajax.request({
            url: 'srv/spesa-media.php',
            method: 'POST',
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                spesaMedia.setHtml('Spesa media mensile: ' + resp.spesaMedia + ' &euro;');                
            }
        });
    }

});
