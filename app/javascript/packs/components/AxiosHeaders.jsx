// app/javascript/packs/components/AxiosHeaders.jsx
import axios from 'axios'

/*
for csrf token
- first search the meta trying to find
- if doesn't have then stop the function,
- otherwise use the content key in csrf
 */

const setAxiosHeaders = () => {
    const csrfToken = document.querySelector('[name=csrf-token]')
    if (!csrfToken) {
        return
    }
    const csrfTokenContent = csrfToken.content
    csrfTokenContent &&
    (axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfTokenContent)
}

export default setAxiosHeaders