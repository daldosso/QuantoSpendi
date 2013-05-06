Ext.define('QuantoSpendi.controller.Spese', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            speseContainer: 'speseContainer',
            addSpesa: 'speseContainer button[action=addSpesa]',
            confirm: 'speseContainer button[action=confirm]'
        },
        control: {
            speseContainer: {
                back: 'onSpeseBack'
            },
            speseList: {
                itemtap: 'onSpeseItemTap',
                itemswipe: 'onItemSwipe'
            },
            dettaglio: {
                itemswipe: 'onItemSwipe'
            },
            risultatiList: {
                itemtap: 'onRisultatiItemTap'
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
            
    onSpesaAdd: function() {
        if (!this.spesa) {
            this.spesa = Ext.widget('spesa');
        }
        this.getSpeseContainer().push(this.spesa);
    },
            
    onAccettazioneTap: function() {
        var codAccettazione = this.getCodAccettazione().getValue();
        if (codAccettazione === '') {
            Ext.Msg.alert('Errore', 'Specificare l\'accettazione');
            return false;
        }
        Ext.data.StoreManager.lookup('Analisi').load({
            params: {
                codAccettazione: codAccettazione
            }
        });
        Ext.data.StoreManager.lookup('Risultati').load({
            params: {
                refCodInt: codAccettazione
            }
        });
    },
    onAnalisiSelect: function(me, newValue) {
        Ext.data.StoreManager.lookup('Campioni').load({
            params: {
                codAccettazione: this.getCodAccettazione().getValue(),
                codAnalisi: newValue
            }
        });
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
        Ext.data.StoreManager.lookup('SpeseDettaglio').load({
            params: {
                mese: record.get('mese'),
                anno: record.get('anno'),
                categoria: record.get('idCategoria')
            }
        });
        this.getSpeseContainer().push(this.dettaglio);
    },
            
    addRisultato: function(container, record, suffix, index) {
        var name = 'RISESITO' + suffix + '_' + index;
        var value = record.get('RISESITO' + suffix);

        if (record.get('PDATIPO_REG_' + suffix) === 'T') {
            container.add({
                xtype: 'textfield',
                label: record.get('PDADESC_REG_' + suffix) || 'Esito',
                name: name,
                value: value,
                autoCapitalize: true,
                clearIcon: true
            });
        } else if (record.get('PDATIPO_REG_' + suffix) === 'N') {
            container.add({
                xtype: 'numberfield',
                name: name,
                value: value,
                label: record.get('PDADESC_REG_' + suffix) || 'Esito'
            });
        } else if (record.get('PDATIPO_REG_' + suffix) === 'P') {
            container.add({
                xtype: 'selectfield',
                label: record.get('PDADESC_REG_' + suffix) || 'Esito',
                name: name,
                value: value,
                store: 'PosNeg',
                displayField: 'value',
                valueField: 'key'
            });
        } else if (record.get('PDATIPO_REG_' + suffix) === 'F') {
            container.add({
                xtype: 'checkboxfield',
                label: record.get('PDADESC_REG_' + suffix) || 'Fatto',
                name: name,
                //value: value,
                value: 'F',
                checked: value === 'F',
                autoCapitalize: true,
                clearIcon: true
            });
        }
    },
    makeRisultati: function() {
        var records = Ext.data.StoreManager.lookup('Risultati').getData().items;
        var container = this.campione.down('fieldset');
        container.removeAll(true, true);

        var adeCod = this.getAnalisi().getValue();
        var camCod = this.campione.camCod;
        var risRifCam = this.campione.down('spinnerfield').getValue();

        for (var i = 0; i < records.length; i++) {

            if (adeCod !== records[i].get('ADECOD') ||
                    camCod !== records[i].get('CAMCOD') ||
                    risRifCam !== records[i].get('RISRIFCAM')) {

                continue;
            }

            var fieldset = Ext.create('Ext.form.FieldSet', {
                //padding: 10
            });

            this.campione.down('label[name="ANALISI"]').setHtml('Analisi: ' + records[i].get('ADEDEN'));
            this.campione.down('label[name="PDP"]').setHtml('PDP: ' + records[i].get('PDPCODINT') + ' - ' + records[i].get('PDPDEN'));

            fieldset.add([{
                    xtype: 'hiddenfield',
                    name: 'RISCOD_' + i,
                    value: records[i].get('RISCOD')
                }, {
                    xtype: 'hiddenfield',
                    name: 'RISRIFCAM_' + i,
                    value: risRifCam
                }, {
                    xtype: 'hiddenfield',
                    name: 'ESACOD_' + i,
                    value: records[i].get('ESACOD')
                }, {
                    xtype: 'hiddenfield',
                    name: 'PDACOD_' + i,
                    value: records[i].get('PDACOD')
                }, {
                    xtype: 'label',
                    html: 'Azione: ' + records[i].get('PDANUM_ORDINE') + ') ' + records[i].get('PDADESC'),
                    padding: 10
                }, {
                    xtype: 'selectfield',
                    name: 'LOMCOD_' + i,
                    label: 'Lotto',
                    store: 'Lotti',
                    displayField: 'PRONOME_PRODOTTO',
                    valueField: 'LOMCOD',
                    value: records[i].get('LOMCOD')
                }]);

            this.addRisultato(fieldset, records[i], '1', i);
            this.addRisultato(fieldset, records[i], '2', i);

            var operatore = records[i].get('UTECOD');
            if (!operatore || operatore === '') {
                operatore = IziFold.session.utecod;
            }

            fieldset.add([{
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    name: 'RISDATARIF_' + i,
                    label: 'Data',
                    picker: {
                        xtype: 'datepicker',
                        slotOrder: ["day", "month", "year"],
                        yearFrom: new Date().getFullYear() - 10,
                        yearTo: new Date().getFullYear() + 10,
                        value: new Date()
                    },
                    dateFormat: 'd/m/Y',
                    value: records[i].get('RISDATARIF')
                }, {
                    xtype: 'selectfield',
                    name: 'UTECOD_' + i,
                    label: 'Operatore',
                    store: 'Operatori',
                    displayField: 'UTENOME',
                    value: operatore,
                    valueField: 'UTECOD'
                }]);

            container.add([fieldset]);
        }
    },
            
    onCampioneSelect: function(spin, value, direction) {
        this.makeRisultati();
    },
            
    onItemSwipe: function(me, ix, target, record, event, options) {
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
                                        idSpesa: record.get('idSpesa')
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
    }

});
