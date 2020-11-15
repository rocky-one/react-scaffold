import axios from 'axios'
import { from } from 'rxjs';

function request(url: string, method: string, params?: any) {
    return from(
        axios[method](
            url,
            method === 'get'
                ? {
                    params
                }
                : params)
    );
}

export default request;