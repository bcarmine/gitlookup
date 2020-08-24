import './toast.css'

/**
 * Toast function will take a message and duration and produce
 * an ion toast component that is added to the current page.
 * 
 * Note that this function is used instead of an IonToast component 
 * directly in the view pages to allow the model to produce toasts.
 * 
 * @param message The message for the toast component
 * @param duration The duration the toast component will be displayed
 */
export function toast(message : string, duration=2000){
    const toast = document.createElement('ion-toast')
    toast.message = message
    toast.duration = duration

    document.body.appendChild(toast)
    return toast.present()
}