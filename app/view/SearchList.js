Ext.define('QuantoSpendi.view.SearchList', {
    extend: 'Ext.List',
    xtype: 'searchList',
    config: {
        title: 'Ricerca',
        store: 'SpeseDettaglio',
        itemTpl: [
            '<div id="idSpesa{idSpesa}"></div>' +
                    'Data: {dataSpesa}<br/>' +
                    'Importo: {importo} €<br/>' +
                    'Categoria: {categoria}<br/>' +
                    'Note: {note}<br/>'
        ],
        items: [{
                xtype: 'toolbar',
                docked: 'top',
                items: [{
                        xtype: 'searchfield',
                        label: 'Cerca',
                        name: 'query',
                        listeners: {
                            keyup: function(me) {
                                var match = me.getValue().toUpperCase();
                                
                                Ext.data.StoreManager.lookup('SpeseDettaglio').load({
                                    params: {
                                        match: match
                                    }
                                });
                                
//                                var lotti = Ext.data.StoreManager.lookup('Lotti');
//                                lotti.clearFilter();
//                                lotti.filterBy(function(record, id) {
//                                    var match = me.getValue().toUpperCase();
//                                    var codiceLotto = record.get('LOMCODINT').toUpperCase();
//                                    var nomeProdotto = record.get('PRONOME_PRODOTTO').toUpperCase();
//                                    return (codiceLotto.indexOf(match) !== -1)
//                                            || (nomeProdotto.indexOf(match) !== -1);
//                                });
                            }
                        }
                    }]
            }]
    }

});
