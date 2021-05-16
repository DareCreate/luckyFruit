import { expect } from 'chai';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/pages/home/Home.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const delay = () => {
    return new Promise((resolve: any) => {
        setTimeout(() => {
            resolve('4555');
        }, 1000);
    });
};


describe('Home.vue', () => {
    const store = new Vuex.Store({
        modules: {
            userInfo: {
                state: {
                    userName: 'knight',
                },
            },
        },
    });
    const wrapper = shallowMount(Home, { store, localVue });
    it('renders userInfo username success', () => {
        expect(wrapper.find('.username').text()).to.include('knight');
    });
    it('renders data a success', async () => {
        const str = await delay();
        wrapper.setData({
            a: str,
        });
        expect(wrapper.find('.dataName').text()).to.equal('4555');
    });
});
