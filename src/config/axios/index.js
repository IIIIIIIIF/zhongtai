/*axios请求工具包*/
import {axios} from './request'

//get
export function getAction(url,parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}
//post
export function postAction(url,parameter,config) {
  return axios({
    url: url,
    method: 'post',
    params: parameter,
    data: parameter,
  })
}
export async function getActionAsync(url,parameter){
  return await axios({
    url: url,
    method: 'get',
    params: parameter
  })
}
//post
export async function postActionAsync(url,parameter,config) {
  // return await axios({
  //   url: url,
  //   method: 'post',
  //   data: parameter
  // })
  return await axios.post(url,parameter,config)
}
