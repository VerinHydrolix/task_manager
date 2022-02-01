export default({
    data(){
        return {
            popupTitle: "Default Title",
            popupText: "Default text",
            popupButtonAbortText: "Abort",
            popupButtonConfirmText: "Confirm",
            callback: null,
            showPopup: false
        }
    },
    methods: {
        openPopup(title, text, abortText, confirmText, callback){
            this.popupTitle = title
            this.popupText = text
            this.popupButtonAbortText = abortText
            this.popupButtonConfirmText = confirmText
            this.showPopup = true
            this.callbackFunction = callback
        },
        closePopup(){
            console.log("closing popup")
            this.popupTitle = "Default Title",
            this.popupText = "Default text",
            this.popupButtonAbortText = "Abort",
            this.popupButtonConfirmText = "Confirm",
            this.showPopup = false
        },
        abort(){
            this.closePopup()
        },
        confirm(){
            this.closePopup()
            try {
                this.callbackFunction()
            } catch (error) {
                console.error("Callback from popup is not a function or the function crashed");
            }
        }
    }
})