//toast component is independent of the view pages
//this enables the model to produce toasts
import './toast.css'

export function toast(message : string, duration=2000){
    const toast = document.createElement('ion-toast')
    toast.message = message
    toast.duration = duration

    document.body.appendChild(toast)
    return toast.present()
}