Ext.define('QuantoSpendi.controller.Spese', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            speseContainer: 'speseContainer',
            searchContainer: 'searchContainer',
            addSpesa: 'speseContainer button[action=addSpesa]',
            confirm: 'button[action=confirm]'
        },
        control: {
            speseContainer: {
                back: 'onSpeseBack'
            },
            searchContainer: {
                back: 'onSpeseBack'
            },
            speseList: {
                itemtap: 'onSpeseItemTap',
                itemswipe: 'onItemSwipe'
            },
            dettaglio: {
                itemswipe: 'onItemSwipe',
                itemdoubletap: 'onDettaglioDoubleTap'
            },
            searchList: {
                itemdoubletap: 'onSearchDoubleTap'
            },
            totaliCategorie: {
                itemtap: 'onTotaliCategorieItemTap'
            },
            risultatiContainer: {
                back: 'onAccettazioneTap'
            },
            accettazione: {
                tap: 'onAccettazioneTap'
            },
            analisi: {
                change: 'onAnalisiSelect'
            },
            numCampione: {
                spin: 'onCampioneSelect'
            },
            confirm: {
                tap: function() {
                    var form = this.getConfirm().up('formpanel');
                    form.submit({
                        success: function() {
                            Ext.Msg.alert('Corretto', 'Operazione eseguita correttamente');
                        },
                        failure: function(f, r) {
                            Ext.Msg.alert('Errore', r.message);
                        }
                    });
                }
            },
            cancel: {
                tap: function() {
                    var form = this.getConfirm().up('formpanel');
                    form.reset();
                }
            },
            addSpesa: {
                tap: 'onSpesaAdd'
            }
        }
    },
            
    editSpesa: function(idSpesa) {
        if (!this.spesa) {
            this.spesa = Ext.widget('spesa');
        }
        if (Ext.isNumeric(idSpesa)) {
            var speseDettaglio = Ext.data.StoreManager.lookup('SpeseDettaglio');
            var me = this;
            speseDettaglio.load({
                params: {
                    idSpesa: idSpesa
                },
                callback: function() {
                    me.spesa.reset();
                    me.spesa.setRecord(speseDettaglio.getById(idSpesa));
                }
            })
        } else {
            this.spesa.down('[name=idSpesa]').setValue('');
        }
    },
            
    onSpesaAdd: function(idSpesa) {
        this.editSpesa(idSpesa);
        this.getSpeseContainer().push(this.spesa);
    },
            
    onRisultatiItemTap: function(list, index, target, record) {
        if (!this.campione) {
            this.campione = Ext.widget('risultatiCampione');
        }
        this.campione.camCod = record.getId();
        this.campione.setTitle('Campione: ' + this.campione.camCod);
        this.campione.down('label[name="CAMUNITACAMP"]').setHtml('&nbsp;&nbsp;&nbsp;di ' + record.get('CAMUNITACAMP'));
        this.getRisultatiContainer().push(this.campione);
        this.makeRisultati();
    },
            
    onSpeseItemTap: function(list, index, target, record) {
        if (!this.totaliCategorie) {
            this.totaliCategorie = Ext.widget('totaliCategorie');
        }
        
        this.selectedMonth = record.get('numMese');
        this.selectedYear = record.get('anno');
        
        Ext.data.StoreManager.lookup('TotaliCategorie').load({
            params: {
                mese: record.get('numMese'),
                anno: record.get('anno')
            }
        });
        this.getSpeseContainer().push(this.totaliCategorie);
    },
            
    onTotaliCategorieItemTap: function(list, index, target, record) {
        if (!this.dettaglio) {
            this.dettaglio = Ext.widget('dettaglio');
        }
        
        this.selectedCategoria = record.get('idCategoria');
        
        Ext.data.StoreManager.lookup('SpeseDettaglio').load({
            params: {
                mese: this.selectedMonth,
                anno: this.selectedYear,
                categoria: this.selectedCategoria
            }
        });
        this.getSpeseContainer().push(this.dettaglio);
    },
            
    onItemSwipe: function(me, ix, target, record, event, options) {
        var dettaglio = this;

        if (event.direction == "left") {
            var del = Ext.create("Ext.Button", {
                ui: "decline",
                text: "Delete",
                style: "position:absolute;right:0.125in;",
                handler: function() {
                    Ext.Msg.confirm("Elimina", "Vuoi eliminare il record selezionato?", function(buttonId) {

                        if (buttonId === 'no') {
                            return false;
                        }

                        Ext.Ajax.request({
                            url: 'srv/spesa-delete.php',
                            method: 'POST',
                            params: {id: record.get('idSpesa')},
                            success: function(response, options) {
                                /*var resp = Ext.decode(response.responseText);
                                if (!resp.success) {
                                    Ext.Msg.alert('Attenzione', resp.message);
                                }*/
                                var store = record.stores[0];
                                store.load({
                                    params: {
                                        mese: dettaglio.selectedMonth,
                                        anno: dettaglio.selectedYear,
                                        categoria: dettaglio.selectedCategoria
                                    }
                                });
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Attenzione', action.result.message);
                            }
                        });
                    });
                }
            });
            var removeDeleteButton = function() {
                Ext.Anim.run(del, 'fade', {
                    after: function() {
                        del.destroy();
                    },
                    out: true
                });
            };
            del.renderTo(Ext.DomQuery.selectNode("#idSpesa" + record.get('idSpesa'), target.dom));
            me.on({
                single: true,
                buffer: 250,
                itemtouchstart: removeDeleteButton
            });
            me.element.on({
                single: true,
                buffer: 250,
                touchstart: removeDeleteButton
            });
        }
    },
    
    onSpeseBack: function() {
        Ext.data.StoreManager.lookup('Spese').load();
        Ext.data.StoreManager.lookup('Categorie').load();
        Ext.data.StoreManager.lookup('TotaliCategorie').load({
            params: {
                mese: this.selectedMonth,
                anno: this.selectedYear
            }
        });
        Ext.data.StoreManager.lookup('SpeseDettaglio').load({
            params: {
                mese: this.selectedMonth,
                anno: this.selectedYear,
                categoria: this.selectedCategoria
            }
        });        
    },
            
    onDettaglioDoubleTap: function(me, index, target, record, e, eOpts) {
        this.onSpesaAdd(record.get('idSpesa'));
    },
    
    onSearchDoubleTap: function(me, index, target, record, e, eOpts) {
        var idSpesa = record.get('idSpesa');
        this.editSpesa(idSpesa);
        this.getSearchContainer().push(this.spesa);
    }
    

});
