import { createLocalVue, mount as _mount, shallow as _shallow } from '@vue/test-utils'
import VueRouter from 'vue-router'

export function Wrapper(component) {
  let mocks = {}
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  return { mount, shallow, withProps, withListeners, withSlots, withRoute,
    withStubs, withStore, withCleanStore, withNotifier, withRouter, config }

  function withProps(props) {
    this.props = props
    return this
  }

  function withListeners(listeners) {
    this.listeners = listeners
    return this
  }

  function withCleanStore() {
    // resetStateAndDisableDispatch(store)
    // this.withStore(store)
    return this
  }

  function mount() {
    const wrapper = _mount(component, this.config())
    return wrapper
  }

  function shallow() {
    return _shallow(component, this.config())
  }

  function withStore(store) {
    // this.store = store
    return this
  }

  function withRoute(route) {
    mocks['$route'] = route
    return this
  }

  function withSlots(slots) {
    this.slots = slots
    return this
  }

  function withStubs(stubs) {
    this.stubs = stubs
    return this
  }

  function withRouter(router) {
    this.router = router
    return this
  }

  function withNotifier(notifySpy) {
    mocks['$notify'] = notifySpy
    // wrapper.vm.$notify = notifySpy
    return this
  }

  function config() {

    //We use sync: false to avoid this error:
    //https://github.com/vuejs/vue-test-utils/issues/673
    return { sync: true,
      propsData: this.props,
      listeners: this.listeners,
      slots: this.slots,
      router: this.router,
      store: this.store,
      stubs: this.stubs,
      mocks: mocks,
      localVue
    }
  }
}

