import regeneratorRuntime from "../libs/regenerator-runtime.js";
import Dialog from '../dist/dialog/dialog';
import Notify from '../dist/notify/notify';
/**
 * <!-- 消息提示wxml -->
<import src="/templates/notify/notify.wxml" />
<template is="notify" />
 */
const notify = {
    // 轻提示*(吐丝）
    spin(title){
        wx.showToast({
            title:title,
            icon:'none'
        })
    },
    // 提示弹框
    tips(title,info){
        Dialog.alert({
            title: title,
            message: info
          }).then(() => {
            // on close
          });
    },
    // 成功通知
    success(title){
        Notify({ type: 'success', message: title });
    },
    // 确认弹框
    dialog(title,info){
        return new Promise(function (resolve, reject) {
            Dialog.confirm({
                title: title,
                message: info
              }).then(() => {
                // on confirm
                resolve(true)
              }).catch(() => {
                // on cancel
                resolve(false)
              });
        })
  
    }

}
module.exports=notify