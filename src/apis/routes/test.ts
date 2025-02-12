import { httpInstance } from '../config/httpInstance';

const test = () => httpInstance.put<TResponse<any>>('test_url');

export default { test };
