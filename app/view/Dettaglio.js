Ext.define('QuantoSpendi.view.Dettaglio', {
    extend: 'Ext.List',
    xtype: 'dettaglio',
    config: {
        title: 'Dettaglio spese',
        store: 'SpeseDettaglio',
        itemTpl: [
            '<div id="idSpesa{idSpesa}"></div>' + 
            'Data: {dataSpesa}<br/>' + 
            'Importo: {importo} €<br/>' + 
            'Categoria: {categoria}<br/>' +
            'Note: {note}<br/>'
        ],
        items: []
    }
});
