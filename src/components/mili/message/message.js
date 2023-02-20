import { createVNode, render } from "vue";

import MlMessageVue from "./MlMessage.vue";

const divVnode = createVNode('div', {
    class: 'xtx-message-container'
})

render(divVnode, document.body)

const div = divVnode.el
const MlMessage = ({ message, type }) => {
    const comVNode = createVNode(MlMessageVue, { message, type })
    render(comVNode, div)
    setTimeout(() => {
        render(null, div)
    }, 6000)
}
export default MlMessage