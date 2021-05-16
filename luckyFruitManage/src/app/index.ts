
import formatter from './formatter';
import * as typeDef from './typeDef';
import * as helps from './helps';
import * as config from './config';
import * as system from './system';
import AppImageUpload from './component/AppImageUpload.vue';
import AppImageListUpload from './component/AppImageListUpload.vue';
import AppVideoUpload from './component/AppVideoUpload.vue';
import AppNetImg from './component/AppNetImg.vue';
import AppLocalImg from './component/AppLocalImg.vue';
import AppQuillEditor from './component/AppQuillEditor.vue';
// export default {
//     formatter,
// }
class App {
    install(Vue: any, options: any) {
        Vue.prototype.$app = {
            formatter,
            typeDef,
            config,
            helps,
            system,
        };
        Vue.component('app-image-upload', AppImageUpload);
        Vue.component('app-image-list-upload', AppImageListUpload);
        Vue.component('app-video-upload', AppVideoUpload);
        Vue.component('app-net-img', AppNetImg);
        Vue.component('app-local-img', AppLocalImg);
        Vue.component('app-quill-editor', AppQuillEditor);
    }
}

export default new App();
