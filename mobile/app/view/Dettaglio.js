Ext.define('QuantoSpendi.view.Dettaglio', {
    extend: 'Ext.List',
    xtype: 'dettaglio',
    config: {
        title: 'Dettaglio spese',
        store: 'SpeseDettaglio',
        itemTpl: [
            '<div id="idSpesa{idSpesa}"></div>' + 
            'Data: {dataSpesaFormatted}<br/>' + 
            'Importo: {importo} €<br/>' + 
            'Categoria: {categoria}<br/>' +
            'Note: {note}<br/>'
        ],
        items: []
    }
});
