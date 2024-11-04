import { getToken } from "firebase/messaging"
import { messaging } from "../../firebase"


export const initializeNotification = async (): Promise<string | null> => {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
        console.log('Notification permission granted.')
        return await getToken(messaging, {vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY})
    } else {
        alert("You are not able to get notifications!")
        return null
    } 
}