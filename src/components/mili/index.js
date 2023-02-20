import MlMessage from "./message/message";

export default {
    install(app) {
        app.config.globalProperties.$message = MlMessage
    }
}