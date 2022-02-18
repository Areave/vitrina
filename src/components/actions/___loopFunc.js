import axios from "axios";

export default async function loopFunc ({url, checkFunc}, delay = 1000, attempt = 0) {
    const looper = await setInterval( async function() { 
        attempt++;

        const response = await axios({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (attempt >= 5 || checkFunc(response))
        {
            clearInterval(looper);
            return response
        }
        
        clearInterval(looper)
        await loopFunc({url, checkFunc}, delay*2, attempt)
    }, delay);
}