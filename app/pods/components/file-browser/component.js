// app/pods/components/file-browser/component.js
import FileBrowser from 'ember-osf/components/file-browser/component';
import layout from './template';
import Ember from 'ember';

export default FileBrowser.extend({
    layout,
    fileManager: Ember.inject.service(),
    toast: Ember.inject.service(),
    classNames: ['file', 'browser'],
    attributeBindings:['elementId:id'],
    elementId: 'file-browser',
    selectedFolder: null,
    init: function() {
        this._super(...arguments);
        this.loadFileBrowser();
    },
    loadFileBrowser: function () {
        let fileProviders = this.get('files');
        // console.log(this.get('files'));
        let params = {provider: "osfstorage"};
        let provider = fileProviders.findBy('provider', params.provider);

        this.set('selectedFolder', provider);
    },
    actions: {
        uploadFiles(files) {
            var self = this;
            let fm = this.get('fileManager');
            // console.log('File Manager', fm);

            let folder = this.get('selectedFolder');
            // console.log('Folder', folder);

            while(files && files.length) {
                let file = files.pop();
                // console.log(fm, folder, file.name, file);
                fm.uploadFile(folder, file.name, file).then(() => {
                    self.get('toast').success('File uploaded successfully');
                    self.sendAction('refreshModel');
                });
            }
        },
        // openItem(item) {
        //     // console.log(item);
        //     this.sendAction('openItem', item);
        // },
        selectItem(item) {
            // console.log(item.get('kind'));
            // console.log(item);
            if(item.get('kind') === "file") {
                console.log('Downloading...');
                this.send('downloadFile', item);
            } else {
                console.log('Selecting...');
                this.sendAction('selectItem', item);
            }
        },
        downloadFile(item) {
            let file = item;
            let url = file.get('links').download;

            window.open(url);
            console.log('Done!');
        },
    }
});
